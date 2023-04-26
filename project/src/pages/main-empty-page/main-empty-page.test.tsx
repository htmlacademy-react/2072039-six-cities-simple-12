import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import {
  cityNames,
  Status,
  NameSpace,
  sortList,
} from '../../constants';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';

import HistoryRouter from '../../components/history-router/history-router';
import MainEmptyPage from './main-empty-page';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = {
  [NameSpace.Offers]: {
    offers: [],
    isOffersLoading: Status.Success,
    activeCity: cityNames[0],
    sortOption: sortList.DEFAULT,
  },
};

const history = createMemoryHistory();
describe('Component: MainEmptyPage', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainEmptyPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
