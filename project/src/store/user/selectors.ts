import { NameSpace, AuthStatus } from '../../constants';

import { RootState } from '../../types/state';


export const getAuthorizationStatus = (state: RootState): AuthStatus => state[NameSpace.User].authorizationStatus;
export const getIsAuth = (state: RootState) => state[NameSpace.User].authorizationStatus === AuthStatus.Auth;
export const getUserLogin = (state: RootState) => state[NameSpace.User].login;
export const getUserAvatar = (state: RootState) => state[NameSpace.User].avatar;
