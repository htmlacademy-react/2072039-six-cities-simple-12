import { NameSpace, Status } from '../../constants';

import { RootState } from '../../types/state';


export const getOffer = (state: RootState) => state[NameSpace.Offer].offer;
export const getIsOfferLoading = (state: RootState): Status => state[NameSpace.Offer].isOfferLoading;
