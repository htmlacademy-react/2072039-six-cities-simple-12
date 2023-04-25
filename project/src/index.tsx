import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { checkAuthAction, loadOffersAction } from './store/api-actions';

import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './brouser-history';

import { store } from './store';

import 'react-toastify/dist/ReactToastify.css';


store.dispatch(checkAuthAction());
store.dispatch(loadOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
