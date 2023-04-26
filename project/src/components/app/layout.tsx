import { Outlet } from 'react-router-dom';

import Logo from '../logos/logos';
import AuthorizationPanel from '../authorization-panel/authorization-panel';


function Layout(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <AuthorizationPanel />
          </div>
        </div>
      </header>
      <Outlet/>
    </div>
  );
}

export default Layout;
