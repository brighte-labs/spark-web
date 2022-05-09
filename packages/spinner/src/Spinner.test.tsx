import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { Spinner } from '.';

jest.mock('@spark-web/utils', () => {
  const original = jest.requireActual('@spark-web/utils');
  return {
    ...original,
    useSynchronizedAnimation: jest.fn(),
  };
});

const renderComponent = () => {
  return render(<Spinner />);
};

describe('Spinner component', () => {
  it('should have spinner as svg', () => {
    const { container } = renderComponent();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
