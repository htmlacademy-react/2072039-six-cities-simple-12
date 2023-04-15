import { FormEvent, useState, useRef } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../hooks';

import { loginAction } from '../../store/apiActions';

import { AuthData } from '../../types/authData';

import styles from './login.module.css';


const LoginForm = () => {
  const dispatch = useAppDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [passwordError, setPasswordError] = useState(false);

  const isPasswordValidate = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/g;
    return regex.test(password);
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (isPasswordValidate(passwordRef.current.value)) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
    }
  };

  return (
    <form
      className="login__form form"
      action=""
      onSubmit={handleSubmit}
      method="post"
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          ref={loginRef}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        {passwordError && (
          <div className={styles.error}>
            <div className={styles.error}>
              Password must contain at least 1 number and 1 letter
            </div>
          </div>
        )}
        <input
          className={cn('login__input form__input', { [styles.inputError]: passwordError })}
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
      >Sign in
      </button>
    </form>
  );
};

export default LoginForm;
