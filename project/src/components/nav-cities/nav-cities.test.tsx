import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';

import { cityNames } from '../../constants';

import HistoryRouter from '../history-router/history-router';
import NavCities from './nav-cities';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: NavCities', () => {

  it('should render correctly', () => {
    const store = mockStore({
      'OFFERS': {
        activeCity: cityNames[0],
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NavCities cities={cityNames} />
        </HistoryRouter>
      </Provider>
    );

    const citiesLength = Object.values(cityNames).length;
    expect(screen.getAllByRole('link').length).toBe(citiesLength);
  });
});
