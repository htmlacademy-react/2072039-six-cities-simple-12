export type Offer = {
  id: string;
  isPremium?: boolean;
  image: string;
  price: number;
  rating: string;
  ratingValue: number;
  description: string;
  type: string;
  roomConfiguration?: RoomConfiguration;
  reviews?: Reviews;
};

export type Offers = Offer[];

export type RoomConfiguration = {
  bedroomsNumber: number;
  maxAdults: number;
  roomFilling: string[];
};

export type Reviews = {
  avaUser: string;
  userName: string;
  userStatus: string;
  text: string;
  time: string;
};
