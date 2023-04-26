import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HistoryRouter from '../history-router/history-router';

import Logo from './logos';


const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="*" element={<Logo />} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByRole('link')));
  });
});
