import MainPage from '../../pages/MainPage/MainPage';


type AppProps = {
  offersCount: number;
};

function App({offersCount}: AppProps): JSX.Element {
  return (
    <MainPage offersCount={offersCount} />
  );
}

export default App;
