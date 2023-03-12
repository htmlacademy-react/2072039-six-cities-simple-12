import { BrowserRouter, Route, Routes } from'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import PrivateRoute from '../../components/private-route/private-route';

import { AppRoute } from '../../constants';

import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import LoginPage from'../../pages/LoginPage/LoginPage';
import RoomPage from'../../pages/RoomPage/RoomPage';


type AppProps = {
  offersCount: number;
};

function App({offersCount}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage offersCount={offersCount} />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route path={AppRoute.Room} element={<RoomPage />}></Route>
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
