export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
}

export type Comments = Comment[];

export type NewComment = {
  id: number;
  comment: string;
  rating: number;
};
