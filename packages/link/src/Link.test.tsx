import { cleanup, render } from '@testing-library/react';

import type { LinkProps } from './Link';
import { Link } from './Link';

describe('Link component', () => {
  afterEach(cleanup);

  const renderComponent = (props?: LinkProps) => {
    const href = props?.href ? props.href : 'test';
    return render(
      <Link data={props?.data} href={href}>
        Test
      </Link>
    );
  };

  it('should render correctly with the minimum set of props, without crashing', () => {
    const { container } = renderComponent();
    expect(container).toBeDefined();
  });
  it('should display data props when passed down', () => {
    const data = { testAttr: 'some attr' };
    const href = 'some_href';
    const { container } = renderComponent({ data, href });
    const attributeUnderTest =
      container?.firstElementChild?.getAttribute('data-testattr');
    expect(attributeUnderTest).toEqual('some attr');
  });
});
