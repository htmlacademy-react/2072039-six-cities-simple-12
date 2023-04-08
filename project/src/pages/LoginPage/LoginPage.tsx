import { Navigate, Link } from 'react-router-dom';
import { FormEvent, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { AuthStatus, AppRoute } from '../../constants';

import { loginAction } from '../../store/apiActions';

import { AuthData } from '../../types/authData';

import Logo from '../../components/Logo/Logo';


function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.authorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (user: AuthData) => {
    dispatch(loginAction(user));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
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
                  <div className="header__left">
                    <Logo />
                  </div>
                </div>
              </div>
            </header>

            <main className="page__main page__main--login">
              <div className="page__login-container container">
                <section className="login">
                  <h1 className="login__title">Sign in</h1>
                  <form
                    className="login__form form"
                    onSubmit = {handleSubmit}
                  >
                    <div className="login__input-wrapper form__input-wrapper">
                      <label className="visually-hidden">
                        E-mail
                      </label>
                      <input
                        className="login__input form__input"
                        type="email" name="email"
                        placeholder="Email"
                        ref={loginRef}
                        required
                      />
                    </div>
                    <div className="login__input-wrapper form__input-wrapper">
                      <label className="visually-hidden">
                        Password
                      </label>
                      <input
                        className="login__input form__input"
                        type="password"
                        name="password"
                        ref={passwordRef}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <button
                      className="login__submit form__submit button"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </form>
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
