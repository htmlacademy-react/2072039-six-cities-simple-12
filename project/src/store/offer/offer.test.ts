import { Status } from '../../constants';

import { loadOfferAction } from '../apiActions';

import { makeFakeOffer } from '../../mocks/mocks';

import { InitialOfferState } from '../../store/offer/offerSlice';
import { offerData } from './offerSlice';


const offer = makeFakeOffer();

describe('Reducer: OfferSliceState', () => {
  let initialState: InitialOfferState;

  beforeEach(() => {
    initialState = {
      offer: null,
      isOfferLoading: Status.Idle,
    };
  });

  describe('loadOfferAction test', () => {
    it('should update isOfferLoading to "Loading" when pending', () => {
      expect(
        offerData.reducer(initialState, {
          type: loadOfferAction.pending.type,
        })
      ).toEqual({ ...initialState, isOfferLoading: Status.Loading });
    });

    it('should update isOfferLoading by load offer', () => {
      expect(
        offerData.reducer(initialState, {
          type: loadOfferAction.fulfilled.type,
          payload: offer,
        })
      ).toEqual({ ...initialState, offer, isOfferLoading: Status.Success });
    });

    it('should update isOfferLoading failed if server is unavailable', () => {
      expect(
        offerData.reducer(initialState, {
          type: loadOfferAction.rejected.type,
        })
      ).toEqual({ ...initialState, isOfferLoading: Status.Error });
    });
  });
});
