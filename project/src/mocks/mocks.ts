import { datatype, internet, name, system } from 'faker';

import { cityNames } from '../constants';

import { Offer, Offers } from '../types/offers';
import { ReviewPayload, Review, Reviews } from '../types/reviews';
import { User } from '../types/user';


export const makeFakeUserData = (): User => ({
  avatarUrl: internet.url(),
  email: internet.email(),
  id: datatype.number(100),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(),
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(100),
  previewImage: system.commonFileName(),
  title: datatype.string(),
  isPremium: datatype.boolean(),
  price: datatype.number(100),
  rating: datatype.number(100),
  bedrooms: datatype.number(100),
  city: {
    location: {
      latitude: datatype.float(0.01),
      longitude: datatype.float(0.01),
      zoom: datatype.number(10),
    },
    name: cityNames[Math.floor(Math.random() * cityNames.length)],
  },
  description: datatype.string(),
  goods: Array.from({ length: datatype.number(10) }, () => datatype.string()),
  host: {
    id: datatype.number(100),
    avatarUrl: system.commonFileName(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  images: Array.from({ length: datatype.number(10) }, () => datatype.string()),
  location: {
    latitude: datatype.float(0.01),
    longitude: datatype.float(0.01),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(100),
  type: datatype.string(),
});

export const makeFakeOffers = (): Offers =>
  Array.from({ length: datatype.number(10) }, () => makeFakeOffer());

export const makeFakeReview = (): Review => ({
  comment: datatype.string(),
  date: datatype.string(),
  id: datatype.number(100),
  rating: datatype.number(5),
  user: makeFakeUserData(),
});

export const makeFakeReviews = (): Reviews =>
  Array.from({ length: datatype.number(10) }, () => makeFakeReview());

export const makeFakeReviewPayload = (): ReviewPayload => ({
  comment: datatype.string(),
  rating: 5,
  id: 1,
});
