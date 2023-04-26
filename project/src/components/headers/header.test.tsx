import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AuthStatus, Status, NameSpace } from '../../constants';

import HistoryRouter from '../history-router/history-router';
import Header from './headers';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthStatus.NoAuth,
    login: null,
    getStatus: Status.Success,
  },
};

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Header />
        </HistoryRouter>
      </Provider>
    );

    const testElement = screen.getByTestId('header');

    expect(testElement).toBeInTheDocument();
  });
});
