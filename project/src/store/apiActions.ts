import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import { toast } from 'react-toastify';

import { APIRoute, AppRoute } from '../constants';

import { redirectToRoute } from './action';

import { saveToken, dropToken } from '../services/token';

import { Offers, Offer } from '../types/offers';
import { AppDispatch, RootState } from '../types/state';
import { AuthData } from '../types/authData';
import { User } from '../types/user';
import { Comments, NewComment } from '../types/comments';


export const loadOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offers/load',
  async (_arg, { dispatch, extra: api }) => {
    // try {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
    // } catch (e) {
    //   toast.error('Failed get offers');
    //   throw e;
    // }
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {data: user} = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(user.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return user;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const loadOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/load',
  async (offerId, { dispatch, extra: api} ) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offer}/${offerId}`);
    return data;
  },
);

export const loadRoomCommentsAction = createAsyncThunk<Comments, number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/load',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Comments>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const loadNearOffersAction = createAsyncThunk<Offers, number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offersNearby/load',
  async (hotelId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offer}/${hotelId}/nearby`);
    return data;
  }
);

export const postCommentAction = createAsyncThunk<Comments, NewComment, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comment/post',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<Comments>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return data;
  },
);
