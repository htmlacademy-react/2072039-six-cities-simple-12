import { createAction } from '@reduxjs/toolkit';

import{ Offers, Offer } from '../types/offers';
import { User } from '../types/user';
import { Comments } from '../types/comments';

import { AppRoute, AuthStatus } from '../constants';


export const verifyAuthAction = createAction<AuthStatus>('isAuth/check');

export const setUserAction = createAction<User | null>('user/set');

export const loadOffersAction = createAction<Offers>('offers/load');

export const setOffersLoadingStatusAction = createAction<boolean>('isOffersLoading/set');

export const setCityAction = createAction<string>('activeCity/set');

export const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');

export const loadOffer = createAction<Offer>('offer/load');

export const setCurrentOfferLoadingStatus = createAction<boolean>('currentOffer/load');

export const loadNearbyOffers = createAction<Offers>('offersNearby/load');

export const loadCommentsByOffer = createAction<Comments>('comments/load');

export const postComment = createAction<Comments>('comment/post');

export const setPostCommentStatusLoding = createAction<boolean>('newComment/loading');
