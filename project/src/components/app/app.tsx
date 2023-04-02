import { BrowserRouter, Route, Routes } from'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../../constants';

import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import LoginPage from'../../pages/LoginPage/LoginPage';
import RoomPage from'../../pages/RoomPage/RoomPage';

import { Offers } from '../../types/offers';
import { City } from '../../types/cities';


type AppProps = {
  offersCount: number;
  offers: Offers;
  city: City;
};

function App({offersCount, offers, city}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offersCount={offersCount} offers={offers} city={city} />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route path={AppRoute.Room} element={<RoomPage offers={offers} />}></Route>
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
