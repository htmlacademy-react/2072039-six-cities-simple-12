import { createAction } from '@reduxjs/toolkit';

import{ Offers } from '../types/offers';


export const setCityAction = createAction<string>('activeCity/set');

export const loadOffersAction = createAction<Offers>('offers/load');
