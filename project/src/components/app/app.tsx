import { BrowserRouter, Route, Routes } from'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';

import { AppRoute } from '../../constants';

import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import LoginPage from'../../pages/LoginPage/LoginPage';
import RoomPage from'../../pages/RoomPage/RoomPage';
import Loader from '../Loader/Loader';


function App(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (isOffersLoading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
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
