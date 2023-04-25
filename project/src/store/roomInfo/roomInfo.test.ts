import { Status } from '../../constants';

import {
  loadRoomCommentsAction,
  loadNearOffersAction,
  postCommentAction,
} from '../api-actions';

import {
  makeFakeReviews,
  makeFakeOffers,
} from '../../mocks/mocks';

import { InitialStateRoomInfo } from '../../store/roomInfo/roomInfoSlice';
import { roomInfoData } from './roomInfoSlice';


const comments = makeFakeReviews();
const offers = makeFakeOffers();

describe('Reducer: roomInfoData', () => {
  let initialState: InitialStateRoomInfo;

  beforeEach(() => {
    initialState = {
      comments: [],
      nearbyOffers: [],
      isCommentsLoading: Status.Idle,
      isCommentPosting: Status.Idle,
      isNearbyOffersLoading: Status.Idle,
    };
  });

  describe('loadRoomCommentsAction test', () => {
    it('should update isCommentsLoading to "Loading" when pending', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: loadRoomCommentsAction.pending.type,
        })
      ).toEqual({
        ...initialState,
        isCommentsLoading: Status.Loading,
      });
    });

    it('should update isCommentsLoading by load comments', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: loadRoomCommentsAction.fulfilled.type,
          payload: comments,
        })
      ).toEqual({
        ...initialState,
        comments,
        isCommentsLoading: Status.Success,
      });
    });

    it('should update isCommentsLoading failed if server is unavailable', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: loadRoomCommentsAction.rejected.type,
        })
      ).toEqual({
        ...initialState,
        isCommentsLoading: Status.Error,
      });
    });
  });

  describe('loadNearOffersAction test', () => {
    it('should update isNearbyOffersLoading to "Loading" when pending', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: loadNearOffersAction.pending.type,
        })
      ).toEqual({
        ...initialState,
        isNearbyOffersLoading: Status.Loading,
      });
    });

    it('should update isNearbyOffersLoading by load near offers', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: loadNearOffersAction.fulfilled.type,
          payload: offers,
        })
      ).toEqual({
        ...initialState,
        nearbyOffers: offers,
        isNearbyOffersLoading: Status.Success,
      });
    });

    it('should update isNearbyOffersLoading failed if server is unavailable', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: loadNearOffersAction.rejected.type,
        })
      ).toEqual({
        ...initialState,
        isNearbyOffersLoading: Status.Error,
      });
    });
  });

  describe('postCommentAction test', () => {
    it('should update isCommentPosting to "Loading" when pending', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: postCommentAction.pending.type,
        })
      ).toEqual({
        ...initialState,
        isCommentPosting: Status.Loading,
      });
    });

    it('should update isCommentPosting by post comment', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: postCommentAction.fulfilled.type,
          payload: comments,
        })
      ).toEqual({
        ...initialState,
        comments,
        isCommentPosting: Status.Success,
      });
    });

    it('should update isCommentPosting failed if server is unavailable', () => {
      expect(
        roomInfoData.reducer(initialState, {
          type: postCommentAction.rejected.type,
        })
      ).toEqual({
        ...initialState,
        isCommentPosting: Status.Error,
      });
    });
  });
});
