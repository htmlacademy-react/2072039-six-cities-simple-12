import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeUserData, makeFakeOffer } from '../../mocks/mocks';
import { AuthStatus, Status, NameSpace } from '../../constants';

import HistoryRouter from '../history-router/history-router';
import ReviewForm from './review-form';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeUserData = makeFakeUserData();
const fakeOfferData = makeFakeOffer();

const fakeStore = {
  [NameSpace.RoomInfo]: {
    comments: [],
    isCommentsLoading: Status.Success,
    isCommentPosting: Status.Idle,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthStatus.Auth,
    login: fakeUserData.email,
    getStatus: Status.Success,
  },
};

describe('Component: ReviewForm', () => {
  it('should update review inputs', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore(fakeStore)}>
        <HistoryRouter history={history}>
          <ReviewForm id={fakeOfferData.id} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
    await act(
      async () =>
        await userEvent.type(screen.getByRole('textbox'), 'test message')
    );
    expect(screen.getByDisplayValue(/test message/i)).toBeInTheDocument();
  });
});
