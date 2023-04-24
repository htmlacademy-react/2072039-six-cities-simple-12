import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, AuthStatus, Status } from '../../constants';

import { checkAuthAction, loginAction, logoutAction } from '../apiActions';


export type userDataState = {
  authorizationStatus: AuthStatus;
  login: string | null;
  avatar: string;
  getStatus: Status;
}

const initialState: userDataState = {
  authorizationStatus: AuthStatus.Unknown,
  login: '',
  avatar: '',
  getStatus: Status.Idle,
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
        state.getStatus = Status.Success;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.getStatus = Status.Error;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.getStatus = Status.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.login = action.payload.email;
        state.avatar = action.payload.avatarUrl;
        state.getStatus = Status.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.getStatus = Status.Error;
      })
      .addCase(loginAction.pending, (state) => {
        state.getStatus = Status.Loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.getStatus = Status.Success;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.getStatus = Status.Error;
      })
      .addCase(logoutAction.pending, (state) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.getStatus = Status.Loading;
      });
  }
});
