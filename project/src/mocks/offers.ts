import { Offers } from '../types/offers';


export const offers: Offers = [
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Fridge', 'Towels'],
    host: {
      avatarUrl: '../img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Max'
    },
    id: 1,
    images: [
      '../img/room.jpg',
      '../img/apartment-01.jpg',
      '../img/apartment-02.jpg',
      '../img/apartment-03.jpg',
      '../img/studio-01.jpg',
    ],
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    maxAdults: 6,
    previewImage: '../img/apartment-01.jpg',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment'
  },
  {
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['WI-FI', 'Heating', 'Kitchen', 'Fridge'],
    host: {
      avatarUrl: '../img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Max'
    },
    id: 2,
    images: [
      '../img/room.jpg',
      '../img/apartment-01.jpg',
      '../img/apartment-02.jpg',
      '../img/apartment-03.jpg',
      '../img/studio-01.jpg',
    ],
    isPremium: false,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: '../img/apartment-02.jpg',
    price: 80,
    rating: 4.8,
    title: 'Wood and stone place',
    type: 'Private room'
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge',],
    host: {
      avatarUrl: '../img/avatar-angelina.jpg',
      id: 3,
      isPro: true,
      name: 'Angelina'
    },
    id: 3,
    images: [
      '../img/room.jpg',
      '../img/apartment-01.jpg',
      '../img/apartment-02.jpg',
      '../img/apartment-03.jpg',
      '../img/studio-01.jpg',
    ],
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    maxAdults: 4,
    previewImage: '../img/apartment-03.jpg',
    price: 132,
    rating: 4.8,
    title: 'Canal View Prinsengracht',
    type: 'apartment'
  },
  {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Fridge', 'Towels'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina'
    },
    id: 4,
    images: [
      '../img/room.jpg',
      '../img/apartment-01.jpg',
      '../img/apartment-02.jpg',
      '../img/apartment-03.jpg',
      '../img/studio-01.jpg',
    ],
    isPremium: true,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    maxAdults: 6,
    previewImage: '../img/apartment-01.jpg',
    price: 180,
    rating: 5.0,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment'
  },
];
