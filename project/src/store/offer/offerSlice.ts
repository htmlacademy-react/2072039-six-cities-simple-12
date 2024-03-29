import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, Status } from '../../constants';

import { loadOfferAction } from '../api-actions';

import { Offer } from '../../types/offers';


export type InitialOfferState = {
  offer: Offer | null;
  isOfferLoading: Status;
};

const initialState: InitialOfferState = {
  offer: null,
  isOfferLoading: Status.Idle,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadOfferAction.pending, (state) => {
        state.isOfferLoading = Status.Loading;
      })
      .addCase(loadOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = Status.Success;
      })
      .addCase(loadOfferAction.rejected, (state) => {
        state.isOfferLoading = Status.Error;
      });
  }
});
