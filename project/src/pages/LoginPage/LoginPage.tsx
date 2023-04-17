import { Navigate, Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

import { AuthStatus, AppRoute } from '../../constants';

import { getAuthorizationStatus } from '../../store/user/selectors';

import Logo from '../../components/Logo/Logo';
import LoginForm from '../../components/LoginForm/LoginForm';


function LoginPage(): JSX.Element {
  const isAuth = useAppSelector(getAuthorizationStatus);

  return (
    isAuth === AuthStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : (
        <div>
          <div className="page page--gray page--login">
            <header className="header">
              <div className="container">
                <div className="header__wrapper">
                  <Logo />
                </div>
              </div>
            </header>

            <main className="page__main page__main--login">
              <div className="page__login-container container">
                <section className="login">
                  <h1 className="login__title">Sign in</h1>
                  <LoginForm />
                </section>
                <section className="locations locations--login locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="/">
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      )
  );
}

export default LoginPage;
