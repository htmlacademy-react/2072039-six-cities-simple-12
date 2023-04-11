import Logo from '../Logo/Logo';
import AuthorizationPanel from '../AuthorizationPanel/AuthorizationPanel';


function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <AuthorizationPanel />
        </div>
      </div>
    </header>
  );
}

export default Header;
