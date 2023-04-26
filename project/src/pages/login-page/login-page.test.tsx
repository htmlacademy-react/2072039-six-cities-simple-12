import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';

import { fireEvent, render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';

import { AppRoute, AuthStatus } from '../../constants';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';

import HistoryRouter from '../../components/history-router/history-router';
import LoginPage from './login-page';


const history = createMemoryHistory();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: LoginPage', () => {

  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthStatus.NoAuth,
        login: '',
      },
    });

    history.push(AppRoute.Login);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Sign in').length).toBe(2);

    const emailElement = screen.getByPlaceholderText('Email');
    const passwordElement = screen.getByPlaceholderText('Password');

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();

    fireEvent.change(emailElement, {target: {value: 'test@test.com'}});
    fireEvent.change(passwordElement, {target: {value: '1q'}});

    expect(screen.getByDisplayValue(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1q/i)).toBeInTheDocument();
  });
});
