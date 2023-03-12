import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import { AppRoute } from '../../constants';


function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </div>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={AppRoute.Login}>
                  <span className="header__signout">Sign out</span>
                </Link>
                {/* {!isAuth && (
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Login</span>
                  </Link>
                )} */}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
