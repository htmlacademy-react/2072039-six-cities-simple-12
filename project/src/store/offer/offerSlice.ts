import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, Status } from '../../constants';

import { loadOfferAction } from '../apiActions';

import { Offer } from '../../types/offers';


type InitialOfferState = {
  offer: Offer | null;
  isOfferLoading: Status;
};

const initialState: InitialOfferState = {
  offer: null,
  isOfferLoading: Status.Idle,
};

export const offer = createSlice({
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
