import { createReducer } from '@reduxjs/toolkit';

import {
  setUser,
  loadOffers,
  setOffersLoadingStatus,
  setCity,
  loadOffer,
  setCurrentOfferLoadingStatus,
  loadNearbyOffers,
  loadCommentsByOffer,
  postComment,
} from './action';

import { Offers, Offer } from '../types/offers';
import { User } from '../types/user';
import { Comments } from '../types/comments';

import { cityNames } from '../constants';


type initialStateType = {
  offers: Offers;
  activeCity: string;
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
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setCity, (state, action) => {
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
    })
    .addCase(postComment, (state, action) => {
      state.comments = action.payload;
    });
});
