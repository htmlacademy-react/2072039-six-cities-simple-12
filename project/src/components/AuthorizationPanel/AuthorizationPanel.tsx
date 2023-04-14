import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch, } from '../../hooks';

import { AppRoute, AuthStatus } from '../../constants';

import { logoutAction } from '../../store/apiActions';
import {
  getAuthorizationStatus,
  getUserLogin,
  getUserAvatar,
} from '../../store/user/selectors';


function AuthorizationPanel() {
  const dispatch = useAppDispatch();

  const autorizationStatus = useAppSelector(getAuthorizationStatus);
  const userAvatar = useAppSelector(getUserAvatar);
  const userLogin = useAppSelector(getUserLogin);

  const handleLogout = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {autorizationStatus === AuthStatus.Auth
          ? (
            <>
              <li className="header__nav-item user">
                <div className="header__nav-profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    <img src={userAvatar} alt={userLogin || ''} />
                  </div>
                  <span className="header__user-name user__name">{userLogin}</span>
                </div>
              </li>
              <li>
                <Link
                  className="header__nav-link"
                  to="/login"
                  onClick = {handleLogout}
                >
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="header__nav-link"
                to={AppRoute.Login}
              >
                Sign in
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
}

export default React.memo(AuthorizationPanel);
