import { createReducer } from '@reduxjs/toolkit';

import { setCityAction, loadOffersAction } from './action';
import { offers } from '../mocks/offers';

import { Offers } from '../types/offers';


type initialStateType = {
  offers: Offers;
  activeCity: string;
}

const initialState: initialStateType = {
  offers: offers,
  activeCity: 'Paris',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityAction, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    });
});
