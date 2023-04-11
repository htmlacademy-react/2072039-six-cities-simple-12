export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer/:id',
  PageNotFound = '/404',
}

export const cityNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum SortTypes {
  DEFAULT = 'Popular',
  PRICE_UP = 'Price: low to high',
  PRICE_DOWN = 'Price: high to low',
  RATING = 'Top rated first'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Offer = '/hotels',
}

export const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'sixCitiesToken';
export const MAX_NUMBER_IMAGES = 6;
export const COMMENTS_COUNT = 10;

export const MIN_LENGTH_COMMENT = 10;
export const MAX_LENGTH_COMMENT = 300;
export const STARS_NUMBER = 5;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
