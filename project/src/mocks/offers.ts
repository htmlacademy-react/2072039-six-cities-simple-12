import { Offers } from '../types/offers';


export const offers: Offers = [
  {
    id: '1',
    isPremium: true,
    image: '../img/apartment-01.jpg',
    price: 120,
    rating: '80%',
    ratingValue: 4.8,
    description: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    roomConfiguration: {
      bedroomsNumber: 3,
      maxAdults: 6,
      roomFilling: ['WI-FI', 'Heating', 'Kitchen', 'Fridge', 'Towels', 'Coffee machine', 'Baby seat', 'Dishwasher', 'Cabel TV'],
    },
    reviews: {
      avaUser: '../img/avatar-max.jpg',
      userName: 'Max',
      userStatus: 'Pro',
      text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      time: 'April 2019',
    }
  },
  {
    id: '2',
    image: '../img/room.jpg',
    price: 80,
    rating: '80%',
    ratingValue: 4.8,
    description: 'Wood and stone place',
    type: 'Private room',
    roomConfiguration: {
      bedroomsNumber: 3,
      maxAdults: 6,
      roomFilling: ['WI-FI', 'Heating', 'Kitchen', 'Fridge'],
    },
    reviews: {
      avaUser: '../img/avatar-max.jpg',
      userName: 'Max',
      userStatus: 'New',
      text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      time: 'April 2019',
    }
  },
  {
    id: '3',
    image: '../img/apartment-02.jpg',
    price: 132,
    rating: '80%',
    ratingValue: 4.8,
    description: 'Canal View Prinsengracht',
    type: 'Apartment',
    roomConfiguration: {
      bedroomsNumber: 3,
      maxAdults: 6,
      roomFilling: ['WI-FI', 'Heating', 'Kitchen', 'Fridge'],
    },
    reviews: {
      avaUser: '../img/avatar-angelina.jpg',
      userName: 'Angelina',
      userStatus: 'Pro',
      text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      time: 'April 2019',
    }
  },
  {
    id: '4',
    isPremium: true,
    image: '../img/apartment-03.jpg',
    price: 180,
    rating: '100%',
    ratingValue: 5.0,
    description: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    roomConfiguration: {
      bedroomsNumber: 3,
      maxAdults: 6,
      roomFilling: ['WI-FI', 'Heating', 'Kitchen', 'Fridge'],
    },
    reviews: {
      avaUser: '../img/avatar-max.jpg',
      userName: 'Max',
      userStatus: 'New',
      text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      time: 'April 2019',
    }
  },
];
