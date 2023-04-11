import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AppRoute, AuthStatus } from '../constants';

import {
  verifyAuth,
  setUser,
  loadOffers,
  setOffersLoadingStatus,
  redirectToRoute,
  loadOffer,
  loadNearbyOffers,
  loadCommentsByOffer,
  setCurrentOfferLoadingStatus,
  setPostCommentStatusLoding,
  postComment,
} from './action';

import { saveToken, dropToken } from '../services/token';

import { Offers, Offer } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { AuthData } from '../types/authData';
import { User } from '../types/user';
import { Comments, NewComment } from '../types/comments';


export const loadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const {data: user} = await api.get<User>(APIRoute.Login);
      dispatch(setUser(user));
      dispatch(verifyAuth(AuthStatus.Auth));
    } catch {
      dispatch(verifyAuth(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, {dispatch, extra: api}) => {
    const {data: user} = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(user.token);
    dispatch(verifyAuth(AuthStatus.Auth));
    dispatch(setUser(user));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(verifyAuth(AuthStatus.NoAuth));
  },
);

export const loadOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/load',
  async (offerId, { dispatch, extra: api} ) => {
    try {
      dispatch(setCurrentOfferLoadingStatus(true));
      const {data} = await api.get<Offer>(`${APIRoute.Offer}/${offerId}`);
      dispatch(loadOffer(data));
      dispatch(setCurrentOfferLoadingStatus(false));
    } catch {
      dispatch(redirectToRoute(AppRoute.PageNotFound));
    }
  },
);

export const loadRoomCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/load',
  async (offerId, { dispatch, extra: api }) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadCommentsByOffer(data));
  }
);

export const loadNearOffersAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offersNearby/load',
  async (hotelId, { dispatch, extra: api }) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offer}/${hotelId}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

export const postCommentAction = createAsyncThunk<void, NewComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comment/post',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    try {
      dispatch(setPostCommentStatusLoding(true));
      const {data} = await api.post<Comments>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
      dispatch(postComment(data));
    } finally {
      dispatch(setPostCommentStatusLoding(true));
    }
  },
);
