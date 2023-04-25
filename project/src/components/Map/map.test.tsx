import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Map from './map';

import { makeFakeOffers } from '../../mocks/mocks';


const mockStore = configureMockStore();

describe('Component: Map', () => {
  it('should render correctly', () => {
    const fakeOffers = makeFakeOffers();
    const store = mockStore({
      DATA: { offer: null }
    });

    render(
      <Provider store={store}>
        <Map
          city={fakeOffers[0].city}
          offers={fakeOffers}
          className={'cities'}
        />
      </Provider>
    );
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
