import { NameSpace } from '../../constants';

import { RootState } from '../../types/state';
import { Offers } from '../../types/offers';
import { SortingOption } from '../../types/sorting';


export const getOffers = (state: RootState): Offers => state[NameSpace.Offers].offers;
export const getIsOffersLoading = (state: RootState) => state[NameSpace.Offers].isOffersLoading;
export const getActiveCity = (state: RootState): string => state[NameSpace.Offers].activeCity;
export const getSelect = (state: RootState): SortingOption => state[NameSpace.Offers].sortOption;
