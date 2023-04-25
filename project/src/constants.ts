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

export enum CommentLenght {
  MinSymbolCount = 50,
  MaxSymbolCount = 300,
}

export enum RatingStars {
  MinStarsNumber = 0,
  MaxStarsNumber = 5,
}

export enum MapMarker {
  Default = '../img/pin.svg',
  Current = '../img/pin-active.svg',
}

export const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'sixCitiesToken';
export const MAX_NUMBER_IMAGES = 6;
export const COMMENTS_COUNT = 10;
