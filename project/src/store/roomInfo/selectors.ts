import { NameSpace, Status } from '../../constants';

import { RootState } from '../../types/state';


export const getNearbyOffers = (state: RootState) => state[NameSpace.RoomInfo].nearbyOffers;
export const getComments = (state: RootState) => state[NameSpace.RoomInfo].comments;
export const getIsCommentPosting = (state: RootState): Status => state[NameSpace.RoomInfo].isCommentPosting;
