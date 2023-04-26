import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Location from './location';
import { cityNames } from '../../constants';
import HistoryRouter from '../history-router/history-router';


const currentCity = cityNames[1];
const history = createMemoryHistory();

describe('Component: Location', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Location
          location={currentCity}
          isActive
          onClick={jest.fn()}
        />
      </HistoryRouter>
    );

    const paragraphElement = screen.getByText(currentCity);

    expect(paragraphElement).toBeInTheDocument();
  });
});
