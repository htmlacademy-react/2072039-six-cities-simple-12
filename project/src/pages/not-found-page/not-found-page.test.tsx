import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';


const history = createMemoryHistory();
describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>
    );

    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Return to home page');
  });
});
