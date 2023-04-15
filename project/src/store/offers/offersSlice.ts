import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, defaultCity, Status } from '../../constants';

import { loadOffersAction } from '../apiActions';

import { Offers } from '../../types/offers';
import { SortingOption } from '../../types/sorting';


type OffersSliceState = {
  offers: Offers;
  activeCity: string;
  isOffersLoading: Status;
  sortOption: SortingOption;
}

const initialState: OffersSliceState = {
  offers: [],
  activeCity: defaultCity,
  isOffersLoading: Status.Idle,
  sortOption: {
    label: 'Popular',
    value: 'default'
  },
};


export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    },
    changeOffersSort: (state, action: PayloadAction<SortingOption>) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffersAction.pending, (state) => {
        state.isOffersLoading = Status.Loading;
      })
      .addCase(loadOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = Status.Success;
      })
      .addCase(loadOffersAction.rejected, (state) => {
        state.isOffersLoading = Status.Error;
      });
  }
});

export const { setCity, changeOffersSort } = offers.actions;
