import { Navigate, Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks';

import { AuthStatus, AppRoute, randomCity } from '../../constants';

import { getAuthorizationStatus } from '../../store/user/selectors';

import { setCity } from '../../store/offers/offersSlice';

import Logo from '../../components/Logo/Logo';
import LoginForm from '../../components/LoginForm/LoginForm';


function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getAuthorizationStatus);

  const toMainPageHandler = () => {
    dispatch(setCity(randomCity));
  };

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
                    <Link
                      className="locations__item-link"
                      to="/"
                      onClick={toMainPageHandler}
                    >
                      <span>{randomCity}</span>
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
