import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, Status } from '../../constants';

import {
  loadRoomCommentsAction,
  loadNearOffersAction,
  postCommentAction,
} from '../apiActions';

import { Comments } from '../../types/comments';
import { Offers } from '../../types/offers';


export type InitialStateRoomInfo = {
  comments: Comments | null;
  nearbyOffers: Offers | null;
  isCommentsLoading: Status;
  isNearbyOffersLoading: Status;
  isCommentPosting: Status;
};

const initialState: InitialStateRoomInfo = {
  comments: [],
  nearbyOffers: [],
  isCommentsLoading: Status.Idle,
  isNearbyOffersLoading: Status.Idle,
  isCommentPosting: Status.Idle,
};

export const roomInfoData = createSlice({
  name: NameSpace.RoomInfo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadRoomCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = Status.Success;
      })
      .addCase(loadRoomCommentsAction.pending, (state) => {
        state.isCommentsLoading = Status.Loading;
      })
      .addCase(loadRoomCommentsAction.rejected, (state) => {
        state.isCommentsLoading = Status.Error;
      })
      .addCase(loadNearOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersLoading = Status.Success;
      })
      .addCase(loadNearOffersAction.pending, (state) => {
        state.isNearbyOffersLoading = Status.Loading;
      })
      .addCase(loadNearOffersAction.rejected, (state) => {
        state.isNearbyOffersLoading = Status.Error;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentPosting = Status.Loading;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.isCommentPosting = Status.Success;
        state.comments = action.payload;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isCommentPosting = Status.Error;
      });
  }
});
