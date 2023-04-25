import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AuthStatus, Status } from '../../constants';
import { makeFakeUserData } from '../../mocks/mocks';
import { userDataState } from '../../store/user/userSlice';

import HistoryRouter from '../history-router/history-router';
import LoginForm from './login-form';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeUserData = makeFakeUserData();

const mockUserState: userDataState = {
  authorizationStatus: AuthStatus.Auth,
  login: fakeUserData.email,
  avatar: fakeUserData.avatarUrl,
  getStatus: Status.Success,
};

const fakeStore = mockStore({
  USER: mockUserState,
});

describe('Component: LoginForm', () => {
  it('should update login inputs', async () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <LoginForm />
        </HistoryRouter>
      </Provider>
    );

    await act(
      async () =>
        await userEvent.type(
          screen.getByPlaceholderText(/email/i),
          'test@test.com'
        )
    );
    await act(
      async () =>
        await userEvent.type(screen.getByPlaceholderText(/password/i), '1q')
    );

    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1q')).toBeInTheDocument();
  });
});
