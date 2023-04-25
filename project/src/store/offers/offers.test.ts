import { datatype } from 'faker';

import { Status, cityNames, sortList } from '../../constants';

import { loadOffersAction } from '../api-actions';
import { setCity, changeOffersSort } from '../../store/offers/offersSlice';

import { makeFakeOffer } from '../../mocks/mocks';

import { OffersSliceState } from '../../store/offers/offersSlice';
import { offersData } from './offersSlice';


const offers = Array.from({ length: datatype.number(10) }, () =>
  makeFakeOffer()
);


describe('Reducer: OffersSliceState', () => {
  let initialState: OffersSliceState;

  beforeEach(() => {
    initialState = {
      offers: [],
      activeCity: cityNames[0],
      isOffersLoading: Status.Idle,
      sortOption: {
        label: 'Popular',
        value: 'default'
      },
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  describe('loadOffersAction test', () => {
    it('should update isOffersLoading to "Loading" when pending', () => {
      expect(
        offersData.reducer(initialState, {
          type: loadOffersAction.pending.type,
        })
      ).toEqual({
        ...initialState,
        isOffersLoading: Status.Loading,
      });
    });

    it('should update isOffersLoading by load offers', () => {
      expect(
        offersData.reducer(initialState, {
          type: loadOffersAction.fulfilled.type,
          payload: offers,
        })
      ).toEqual({
        ...initialState,
        offers,
        isOffersLoading: Status.Success,
      });
    });

    it('should update isOffersLoading failed if server is unavailable', () => {
      expect(
        offersData.reducer(initialState, {
          type: loadOffersAction.rejected.type,
        })
      ).toEqual({
        ...initialState,
        isOffersLoading: Status.Error,
      });
    });

    it('should set new activeCity', () => {
      expect(offersData.reducer(initialState, setCity(cityNames[0]))).toEqual({
        ...initialState,
        activeCity: cityNames[0],
      });
    });

    it('should set new sorting', () => {
      expect(offersData.reducer(initialState, changeOffersSort(sortList.PRICE_HIGH))).toEqual({
        ...initialState,
        sortOption: sortList.PRICE_HIGH,
      });
    });
  });
});
