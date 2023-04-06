import { createReducer } from '@reduxjs/toolkit';

import {
  verifyAuthAction,
  setUserAction,
  loadOffersAction,
  setOffersLoadingStatusAction,
  setCityAction,
} from './action';

import { Offers } from '../types/offers';
import { User } from '../types/user';

import { AuthStatus, cityNames } from '../constants';


type initialStateType = {
  offers: Offers;
  activeCity: string;
  isOffersLoading: boolean;
  authStatus: AuthStatus;
  user: User | null;
}

const initialState: initialStateType = {
  offers: [],
  activeCity: cityNames[0],
  isOffersLoading: false,
  authStatus: AuthStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(verifyAuthAction, (state, action) => {
      state.authStatus = action.payload;
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
    });
});
