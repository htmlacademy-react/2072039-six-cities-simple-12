import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
// import { ToastContainer } from 'react-toastify';

import { checkAuthAction, fetchOffersAction } from './store/apiActions';

import App from './components/app/app';

import { store } from './store';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <ToastContainer /> */}
    </Provider>
  </React.StrictMode>,
);
