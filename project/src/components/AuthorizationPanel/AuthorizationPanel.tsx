import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch, } from '../../hooks';

import { AppRoute, AuthStatus } from '../../constants';

import { logoutAction } from '../../store/apiActions';


function AuthorizationPanel() {
  const dispatch = useAppDispatch();

  const autorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const handleLogout = (evt: React.MouseEvent<HTMLElement>) => {
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
                    <img src={user?.avatarUrl} alt={user?.name} />
                  </div>
                  <span className="header__user-name user__name">{user?.name}</span>
                </div>
              </li>
              <li>
                <Link className="header__nav-link" to="/login" onClick = {handleLogout}>
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link className="header__nav-link" to={AppRoute.Login}>
                Sign in
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
}

export default AuthorizationPanel;
