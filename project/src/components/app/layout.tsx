import { Outlet } from 'react-router-dom';

import Logo from '../../components/Logo/Logo';
import AuthorizationPanel from '../AuthorizationPanel/AuthorizationPanel';


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
