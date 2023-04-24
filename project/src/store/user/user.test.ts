import { userDataState, userData } from './userSlice';

import { AuthStatus, Status } from '../../constants';

import { checkAuthAction, loginAction, logoutAction } from '../apiActions';

import { makeFakeUserData } from '../../mocks/mocks';


const user = makeFakeUserData();

describe('Reducer: userData', () => {
  let initialState: userDataState;

  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthStatus.Unknown,
      login: '',
      avatar: '',
      getStatus: Status.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userData if checkAuthAction fulfilled', () => {
      expect(
        userData.reducer(initialState, {
          type: checkAuthAction.fulfilled.type,
          payload: user,
        })
      ).toEqual({
        authorizationStatus: AuthStatus.Auth,
        login: user.email,
        avatar: user.avatarUrl,
        getStatus: Status.Success,
      });
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(
        userData.reducer(initialState, {
          type: checkAuthAction.rejected.type,
          userData: null,
        })
      ).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        getStatus: Status.Error,
      });
    });
  });

  describe('loginAction test', () => {
    it('should update getStatus pending', () => {
      expect(
        userData.reducer(initialState, {
          type: loginAction.pending.type,
        })
      ).toEqual({
        ...initialState,
        getStatus: Status.Loading,
      });
    });

    it('should update authorizationStatus to "AUTH" and set userData if loginAction fulfilled', () => {
      expect(
        userData.reducer(initialState, {
          type: loginAction.fulfilled.type,
          payload: user,
        })
      ).toEqual({
        authorizationStatus: AuthStatus.Auth,
        login: user.email,
        avatar: user.avatarUrl,
        getStatus: Status.Success,
      });
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(
        userData.reducer(initialState, { type: loginAction.rejected.type })
      ).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        getStatus: Status.Error,
      });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(
        userData.reducer(initialState, { type: logoutAction.fulfilled.type })
      ).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        getStatus: Status.Success,
      });
    });
  });
});
