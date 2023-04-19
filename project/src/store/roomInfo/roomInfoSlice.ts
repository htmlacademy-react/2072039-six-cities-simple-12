import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, Status } from '../../constants';

import {
  loadRoomCommentsAction,
  loadNearOffersAction,
  postCommentAction,
} from '../apiActions';

import { Comments } from '../../types/comments';
import { Offers } from '../../types/offers';


type InitialState = {
  comments: Comments | null;
  nearbyOffers: Offers | null;
  isCommentPosting: Status;
};

const initialState: InitialState = {
  comments: [],
  nearbyOffers: [],
  isCommentPosting: Status.Idle,
};

export const roomInfo = createSlice({
  name: NameSpace.RoomInfo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadRoomCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(loadNearOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentPosting = Status.Loading;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.isCommentPosting = Status.Success;
        state.comments = action.payload;
      })
      .addCase(postCommentAction.rejected, (state, action) => {
        state.isCommentPosting = Status.Error;
      });
  }
});
