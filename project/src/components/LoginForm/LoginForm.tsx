import { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../../hooks';

import { loginAction } from '../../store/apiActions';

import styles from './login.module.css';


type Field = {
  value: string;
  regex: RegExp;
  error: boolean;
  errorText: string;
}

const LoginForm = () => {
  const emailRegexp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  const passwordRegexp = /^\S*$/;

  const formFields:Record<string, string> = {
    email: 'E-mail',
    password: 'Password',
  };

  const [formData, setFormData] = useState<Record<string, Field>>({
    email: {
      value: '',
      error: false,
      regex: emailRegexp,
      errorText: 'Email is incorrect'
    },
    password: {
      value: '',
      error: false,
      regex: passwordRegexp,
      errorText: 'Password must not contain spaces'
    },
  });

  const dispatch = useAppDispatch();

  const isFieldsGroupValid = Object.values(formData).some((value) => value.error);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        error: !formData[name].regex.test(value),
        value: value,
      }
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction({
      login: formData.email.value,
      password: formData.password.value,
    }));
  };

  return (
    <form
      className="login__form form"
      action=""
      onSubmit={handleSubmit}
      method="post"
    >
      {Object.entries(formFields).map(([name, label]) => (
        <div key={name} className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">{label}</label>
          <div className={styles.error}>
            {formData[name].error && (
              <div className={styles.error}>{formData[name].errorText}</div>
            )}
          </div>
          <input className={cn('login__input form__input', { [styles.inputError]: formData[name].error })}
            type={name}
            name={name}
            value={formData[name].value}
            onChange={handleInputChange}
            placeholder={label}
            required
          />
        </div>
      ))}

      <button
        className="login__submit form__submit button"
        disabled={isFieldsGroupValid}
        type="submit"
      >Sign in
      </button>
    </form>
  );
};

export default LoginForm;
