import { Route, Routes } from'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';

import { AppRoute, Status } from '../../constants';

import { getIsOffersLoading } from '../../store/offers/selectors';

import Layout from './layout';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoginPage from'../../pages/login-page/login-page';
import RoomPage from'../../pages/room-page/room-page';
import Loader from '../loaders/loaders';


function App(): JSX.Element {
  const isOffersLoading = useAppSelector(getIsOffersLoading);

  if (isOffersLoading === Status.Loading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path='/' element={<Layout /> }>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Room}
            element={<RoomPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
