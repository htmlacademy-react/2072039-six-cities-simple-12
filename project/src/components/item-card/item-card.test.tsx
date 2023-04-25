import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { fireEvent, render, screen } from '@testing-library/react';

import { makeFakeOffer } from '../../mocks/mocks';

import HistoryRouter from '../history-router/history-router';
import ItemCard from './item-card';


const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

describe('Component: ItemCard', () => {
  it('should render correctly', () => {
    const handleSetActiveCard = jest.fn();

    render(
      <HistoryRouter history={history}>
        <ItemCard
          offer={fakeOffer}
          onMouseOverHandler={handleSetActiveCard}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

  it('should redirect to card after click', () => {
    const handleSetActiveCard = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <ItemCard
          offer={fakeOffer}
          onMouseOverHandler={handleSetActiveCard}
        />
      </Router>
    );

    fireEvent.click(screen.getAllByRole('link')[0]);
    expect(history.location.pathname).toBe(`/offer/${fakeOffer.id}`);
  });
});
