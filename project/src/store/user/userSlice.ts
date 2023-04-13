import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, AuthStatus } from '../../constants';

import { checkAuthAction, loginAction, logoutAction } from '../apiActions';


type userDataState = {
  authorizationStatus: AuthStatus;
  login: string | null;
  avatar: string;
}

const initialState: userDataState = {
  authorizationStatus: AuthStatus.Unknown,
  login: '',
  avatar: '',
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.login = action.payload.email;
        state.avatar = action.payload.avatarUrl;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.login = action.payload.email;
        state.avatar = action.payload.avatarUrl;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
      });
  }
});
