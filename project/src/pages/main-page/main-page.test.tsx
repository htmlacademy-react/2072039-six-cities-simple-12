import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import {
  AuthStatus,
  cityNames,
  Status,
  NameSpace,
  sortList,
} from '../../constants';
import { makeFakeOffers } from '../../mocks/mocks';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';

import HistoryRouter from '../../components/history-router/history-router';
import MainPage from './main-page';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffers = makeFakeOffers();

const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthStatus.NoAuth,
    login: '',
    avatar: '',
    getStatus: Status.Success,
  },
  [NameSpace.Offers]: {
    offers: [],
    isOffersLoading: Status.Success,
    activeCity: cityNames[0],
    sortOption: sortList.DEFAULT,
  },
};

const history = createMemoryHistory();

describe('Page: MainPage', () => {
  it('should render correctly if data received and offers are empty', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render correctly if data received', () => {
    const store = mockStore({
      ...fakeStore,
      [NameSpace.Offers]: {
        ...fakeStore[NameSpace.Offers],
        offers: fakeOffers,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });
});
