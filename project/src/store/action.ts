import { createAction } from '@reduxjs/toolkit';

import{ Offers } from '../types/offers';
import { User } from '../types/user';

import { AppRoute, AuthStatus } from '../constants';


export const verifyAuthAction = createAction<AuthStatus>('isAuth/check');

export const setUserAction = createAction<User | null>('user/set');

export const loadOffersAction = createAction<Offers>('offers/load');

export const setOffersLoadingStatusAction = createAction<boolean>('isOffersLoading/set');

export const setCityAction = createAction<string>('activeCity/set');

export const redirectToRouteAction = createAction<AppRoute>('app/redirectToRoute');
