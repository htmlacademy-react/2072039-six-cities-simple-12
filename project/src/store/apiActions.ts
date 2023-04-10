import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AppRoute, AuthStatus } from '../constants';

import {
  verifyAuthAction,
  setUserAction,
  loadOffersAction,
  setOffersLoadingStatusAction,
  redirectToRouteAction,
  loadOffer,
  loadNearbyOffers,
  loadCommentsByOffer,
  setCurrentOfferLoadingStatus,
  setPostCommentStatusLoding,
} from './action';

import { saveToken, dropToken } from '../services/token';

import { Offers, Offer } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { AuthData } from '../types/authData';
import { User } from '../types/user';
import { Comments, NewComment } from '../types/comments';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatusAction(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersLoadingStatusAction(false));
    dispatch(loadOffersAction(data));
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
      dispatch(setUserAction(user));
      dispatch(verifyAuthAction(AuthStatus.Auth));
    } catch {
      dispatch(verifyAuthAction(AuthStatus.NoAuth));
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
    dispatch(verifyAuthAction(AuthStatus.Auth));
    dispatch(setUserAction(user));
    dispatch(redirectToRouteAction(AppRoute.Main));
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
    dispatch(setUserAction(null));
    dispatch(verifyAuthAction(AuthStatus.NoAuth));
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
      dispatch(redirectToRouteAction(AppRoute.PageNotFound));
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
      dispatch(loadCommentsByOffer(data));
    } finally {
      dispatch(setPostCommentStatusLoding(true));
    }
  },
);
