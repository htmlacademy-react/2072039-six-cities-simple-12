import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { datatype } from 'faker';
import { HelmetProvider } from 'react-helmet-async';

import { Action } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import {
  AuthStatus,
  AppRoute,
  Status,
  NameSpace,
  cityNames,
  sortList,
} from '../../constants';

import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeOffer, makeFakeUserData } from '../../mocks/mocks';
import HistoryRouter from '../history-router/history-router';

import App from './app';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = makeFakeOffer();
const fakeOffers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);
const fakeUserData = makeFakeUserData();

const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthStatus.Auth,
    login: fakeUserData.email,
    avatar: fakeUserData.avatarUrl,
    getStatus: Status.Success,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    isOffersLoading: Status.Success,
    city: cityNames[0],
    sortOption: sortList.DEFAULT,
  },
  [NameSpace.Offer]: {
    offer: fakeOffer,
    isOfferLoading: Status.Success,
  },
  [NameSpace.RoomInfo]: {
    comments: [],
    commentsStatus: Status.Success,
    isCommentsLoading: Status.Idle,
    nearbyOffers: fakeOffers,
    isNearbyOffersLoading: Status.Success,
    isCommentPosting: Status.Success,
  },
};

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={mockStore(fakeStore)}>
    <HelmetProvider>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </HelmetProvider>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Home" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(
      <Provider
        store={mockStore({
          ...fakeStore,
          [NameSpace.User]: {
            ...fakeStore[NameSpace.User],
            authorizationStatus: AuthStatus.NoAuth,
          },
        })}
      >
        <HelmetProvider>
          <HistoryRouter history={history}>
            <App />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByRole('button').textContent).toBe('Sign in');
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it('should render "Room" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Room);

    render(fakeApp);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Click to return to home')).toBeInTheDocument();
  });
});
