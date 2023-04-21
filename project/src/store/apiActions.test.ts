import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { datatype } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  loadOffersAction,
  loadOfferAction,
  loadNearOffersAction,
  loadRoomCommentsAction,
  postCommentAction,
} from './apiActions';
import { redirectToRoute } from './action';

import { State } from '../types/state';

import { AuthData } from '../types/authData';

import { APIRoute } from '../constants';

import {
  makeFakeOffer,
  makeFakeReviewPayload,
  makeFakeReviews,
  makeFakeUserData,
} from '../mocks/mocks';

import { AUTH_TOKEN_KEY_NAME } from '../constants';


const offers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);
const offer = makeFakeOffer();
const id = 1;
const reviews = makeFakeReviews();
const commentData = makeFakeReviewPayload();
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

  it('should load offer info when server return 200', async () => {
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

  it('should load comments when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Comments}${id}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadRoomCommentsAction(Number(id)));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadRoomCommentsAction.pending.type,
      loadRoomCommentsAction.fulfilled.type,
    ]);
  });

  it('should post comment when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onPost(`${APIRoute.Comments}${commentData.id}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postCommentAction(commentData));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch Logout when /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
