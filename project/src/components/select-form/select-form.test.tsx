import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { sortList } from '../../constants';

import HistoryRouter from '../history-router/history-router';
import SelectForm from './select-form';


const currentSortOption = sortList.DEFAULT;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: SelectForm', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SelectForm select={currentSortOption} />
        </HistoryRouter>
      </Provider>
    );

    const paragraphElement = screen.getByText(currentSortOption.label);

    expect(paragraphElement).toBeInTheDocument();
  });
});
