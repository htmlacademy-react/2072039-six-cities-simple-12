import { useMemo } from 'react';
import { Comment } from '../../types/comments';
import { getPersentsFromNumber } from '../../utils/getPersentsFromNumber';


type CommentProps = {
  comment: Comment;
};

function CommentItem({ comment }: CommentProps): JSX.Element {
  const { date, user } = comment;
  const itemDate = new Date(date);
  const monthName = useMemo(() => (itemDate.toLocaleString('en-EN', { month: 'long' })), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${getPersentsFromNumber(comment.rating)}` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time
          className="reviews__time"
          dateTime={`${itemDate.getFullYear()}-${itemDate.getMonth()}-${itemDate.getDate()}`}
        >
          {monthName} {itemDate.getFullYear()}
        </time>
      </div>
    </li>
  );
}

export default CommentItem;
