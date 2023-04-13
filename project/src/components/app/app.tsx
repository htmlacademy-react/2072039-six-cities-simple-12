import { Route, Routes } from'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useAppSelector } from '../../hooks';

import { AppRoute, Status } from '../../constants';

import { getIsOffersLoading } from '../../store/offers/selectors';

import Layout from './layout';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import LoginPage from'../../pages/LoginPage/LoginPage';
import RoomPage from'../../pages/RoomPage/RoomPage';
import Loader from '../Loader/Loader';
import HistoryRouter from '../HistoryRoute/HistoryRoute';
import browserHistory from '../../brouserHistory';


function App(): JSX.Element {
  const isOffersLoading = useAppSelector(getIsOffersLoading);

  if (isOffersLoading === Status.Loading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
