import {
  ChangeEvent,
  useState,
  useEffect,
  Fragment,
  FormEvent,
} from 'react';

import { useAppDispatch } from '../../hooks';

import {
  MIN_LENGTH_COMMENT,
  MAX_LENGTH_COMMENT,
  STARS_NUMBER,
} from '../../constants';

import { NewComment } from '../../types/comments';

import { postCommentAction } from '../../store/apiActions';


type ReviewFormProps = {
  id: number;
};

function ReviewForm({ id }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const isDisable = !!(
      comment.length > MAX_LENGTH_COMMENT
      || comment.length < MIN_LENGTH_COMMENT
      || rating === 0
    );
    setButtonDisabled(isDisable);
  }, [rating, comment]);

  const onCommitChangeHandle = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
  };

  const ratingValues = Array.from({ length: STARS_NUMBER }, (_, index) => index + 1);

  const onSubmit = (data: NewComment) => {
    dispatch(postCommentAction(data));
  };

  const clearForm = () => {
    if (rating) {
      const ratingElement = document.getElementById(`${rating}-stars`);
      if (ratingElement) {
        (ratingElement as HTMLInputElement).checked = false;
      }
    }
    setRating(0);
    setComment('');
    setButtonDisabled(false);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({ id, comment, rating });
    clearForm();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit = {handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingValues.reverse().map((value: number) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={() => setRating(value)}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        onChange={onCommitChangeHandle}
        value={comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">
            &nbsp;{MIN_LENGTH_COMMENT} characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
