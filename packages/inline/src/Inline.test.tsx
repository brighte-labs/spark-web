import { cleanup, render } from '@testing-library/react';

import type { InlineProps } from './Inline';
import { Inline } from './Inline';

describe('Inline component', () => {
  afterEach(cleanup);

  const renderComponent = (props?: InlineProps) => {
    return render(<Inline data={props?.data}>Test</Inline>);
  };

  it('should render correctly with the minimum set of props, without crashing', () => {
    const { container } = renderComponent();
    expect(container).toBeDefined();
  });
  it('should display data props when passed down', () => {
    const data = { testAttr: 'some attr' };
    const { container } = renderComponent({ data });
    const attributeUnderTest =
      container?.firstElementChild?.getAttribute('data-testattr');
    expect(attributeUnderTest).toEqual('some attr');
  });
});
