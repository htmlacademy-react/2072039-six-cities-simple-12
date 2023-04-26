import { render, screen } from '@testing-library/react';

import Loader from './loaders';


describe('Component: Loader', () => {
  it('should render correctly', () => {
    render (
      <Loader />
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
