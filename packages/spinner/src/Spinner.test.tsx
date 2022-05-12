import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import type { SpinnerProps } from '.';
import { Spinner } from '.';

jest.mock('@spark-web/utils', () => {
  const original = jest.requireActual('@spark-web/utils');
  return {
    ...original,
    useSynchronizedAnimation: jest.fn(),
  };
});

const renderComponent = (props?: SpinnerProps) => {
  return render(<Spinner data={props?.data} />);
};

describe('Spinner component', () => {
  it('should have spinner as svg', () => {
    const { container } = renderComponent();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
  it('should display data props when passed down', () => {
    const data = { testAttr: 'some attr' };
    const { container } = renderComponent({ data });
    const attributeUnderTest =
      container?.firstElementChild?.getAttribute('data-testattr');
    expect(attributeUnderTest).toEqual('some attr');
  });
});
