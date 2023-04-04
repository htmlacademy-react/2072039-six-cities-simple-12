import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { offers } from './mocks/offers';
import { city } from './mocks/cities';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Settings = {
  offersCount: 312,
} as const;

root.render(
  <React.StrictMode>
    <App offersCount={Settings.offersCount} offers={offers} city={city} />
  </React.StrictMode>,
);
