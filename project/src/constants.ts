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

export const defaultCity = 'Paris';

export const sortList = {
  DEFAULT: {
    label: 'Popular',
    value: 'default',
  },
  PRICE_HIGH: {
    label: 'Price: high to low',
    value: 'price',
  },
  PRICE_LOW: {
    label: 'Price: low to high',
    value: '-price',
  },
  RATING: {
    label: 'Top rated first',
    value: 'rating',
  },
};

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

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  Offer = 'OFFER',
  RoomInfo = 'ROOM_INFO',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'sixCitiesToken';
export const MAX_NUMBER_IMAGES = 6;
export const COMMENTS_COUNT = 10;

export const MIN_LENGTH_COMMENT = 50;
export const MAX_LENGTH_COMMENT = 300;
export const STARS_NUMBER = 5;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
