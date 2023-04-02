import { User } from './user';


export type Reviews = Review[];

export type Review = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
};
