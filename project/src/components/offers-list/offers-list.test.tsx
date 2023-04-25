import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { AuthStatus, Status, NameSpace } from '../../constants';
import { makeFakeOffers } from '../../mocks/mocks';

import HistoryRouter from '../history-router/history-router';
import OffersList from './offers-list';


const fakeOffers = makeFakeOffers();

const mockStore = configureMockStore();
const fakeStore = {
  [NameSpace.User]: {
    authorizationStatus: AuthStatus.NoAuth,
    login: null,
    getStatus: Status.Success,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    isOffersLoading: Status.Success,
  },
};

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersList
            offers={fakeOffers}
            onListItemHover={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offersList')).toBeInTheDocument();
  });
});
