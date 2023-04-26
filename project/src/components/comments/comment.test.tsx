import { render, screen } from '@testing-library/react';

import { getHumanizedDate } from '../../utils/getHumanizedDate';

import { makeFakeReview } from '../../mocks/mocks';

import CommentItem from './comments';


describe('Component: Comment', () => {
  it('should render correctly', () => {
    const fakeReview = makeFakeReview();
    const reviewViewDate = getHumanizedDate(fakeReview.date);

    render(
      <CommentItem comment={fakeReview} />
    );

    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText(reviewViewDate)).toBeInTheDocument();
  });
});
