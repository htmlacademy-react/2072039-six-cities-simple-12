import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../constants';

import { userData } from './user/userSlice';
import { offers } from './offers/offersSlice';
import { offer } from './offer/offerSlice';
import { roomInfo } from './roomInfo/roomInfoSlice';


export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.Offer]: offer.reducer,
  [NameSpace.RoomInfo]: roomInfo.reducer,
});
