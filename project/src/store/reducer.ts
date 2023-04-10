import { createReducer } from '@reduxjs/toolkit';

import {
  verifyAuthAction,
  setUserAction,
  loadOffersAction,
  setOffersLoadingStatusAction,
  setCityAction,
  loadOffer,
  setCurrentOfferLoadingStatus,
  loadNearbyOffers,
  loadCommentsByOffer,
} from './action';

import { Offers, Offer } from '../types/offers';
import { User } from '../types/user';
import { Comments } from '../types/comments';

import { AuthStatus, cityNames } from '../constants';


type initialStateType = {
  offers: Offers;
  activeCity: string;
  authorizationStatus: AuthStatus;
  user: User | null;
  offer: Offer | null;
  nearbyOffers: Offers | null;
  comments: Comments | null;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isCommentPosting: boolean;
}

const initialState: initialStateType = {
  offers: [],
  activeCity: cityNames[0],
  authorizationStatus: AuthStatus.Unknown,
  user: null,
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isCommentPosting: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(verifyAuthAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserAction, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatusAction, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setCityAction, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setCurrentOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadCommentsByOffer, (state, action) => {
      state.comments = action.payload;
    });
});
