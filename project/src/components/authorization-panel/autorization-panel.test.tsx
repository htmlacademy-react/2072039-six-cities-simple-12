import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import { AppRoute, AuthStatus } from '../../constants';
import { makeFakeUserData } from '../../mocks/mocks';

import HistoryRouter from '../history-router/history-router';
import AuthorizationPanel from './authorization-panel';


const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: AuthorizationPanel', () => {

  it('should render correctly when user not auth', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthStatus.NoAuth
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AuthorizationPanel />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render correctly when user authed', () => {
    const fakeUserData = makeFakeUserData();

    const store = mockStore({
      USER: {
        authorizationStatus: AuthStatus.Auth,
        login: fakeUserData.email,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AuthorizationPanel />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText(fakeUserData.email)).toBeInTheDocument();
  });

  it('should render correctly when location.pathname is /login', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthStatus.NoAuth,
      },
    });

    history.push(AppRoute.Login);
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <AuthorizationPanel />
        </Router>
      </Provider>
    );

    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
  });
});
