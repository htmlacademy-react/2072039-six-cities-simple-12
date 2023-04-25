import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { datatype } from 'faker';

import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';

import {
  checkAuthAction,
  loginAction,
  loadOffersAction,
  loadOfferAction,
  loadNearOffersAction,
} from './api-actions';

import { State } from '../types/state';

import { AuthData } from '../types/auth-data';

import { redirectToRoute } from './action';

import { APIRoute, AUTH_TOKEN_KEY_NAME } from '../constants';

import { makeFakeOffer, makeFakeUserData } from '../mocks/mocks';


const offers = Array.from({ length: datatype.number(10) }, () => makeFakeOffer());
const offer = makeFakeOffer();
const id = 1;
const user = makeFakeUserData();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should load offers when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Offers).reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadOffersAction.pending.type,
      loadOffersAction.fulfilled.type,
    ]);
  });

  it('should load offer when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${id}`).reply(200, offer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOfferAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadOfferAction.pending.type,
      loadOfferAction.fulfilled.type,
    ]);
  });

  it('should load nearby offers when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${id}/nearby`).reply(200, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadNearOffersAction(id));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadNearOffersAction.pending.type,
      loadNearOffersAction.fulfilled.type,
    ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, user);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.com', password: '1q' };

    mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(
      AUTH_TOKEN_KEY_NAME,
      'secret'
    );
  });
});
