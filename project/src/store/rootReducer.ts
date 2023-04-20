import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../constants';

import { userData } from './user/userSlice';
import { offersData } from './offers/offersSlice';
import { offerData } from './offer/offerSlice';
import { roomInfoData } from './roomInfo/roomInfoSlice';


export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.RoomInfo]: roomInfoData.reducer,
});
