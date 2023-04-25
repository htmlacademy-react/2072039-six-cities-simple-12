import Logo from '../logo/logo';
import AuthorizationPanel from '../authorization-panel/authorization-panel';


function Header(): JSX.Element {
  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <AuthorizationPanel />
        </div>
      </div>
    </header>
  );
}

export default Header;
