import { User } from './user';


export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type Reviews = Review[];

export type ReviewPayload = {
  comment: string;
  rating: number;
  id: number;
};
