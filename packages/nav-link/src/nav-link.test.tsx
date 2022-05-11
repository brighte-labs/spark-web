import { cleanup, render } from '@testing-library/react';

import type { NavLinkProps } from './nav-link';
import { NavLink } from './nav-link';

describe('Inline component', () => {
  afterEach(cleanup);

  const renderComponent = (props: NavLinkProps) => {
    return render(
      <NavLink data={props?.data} href={'test'}>
        {props.children}
      </NavLink>
    );
  };

  it('should render correctly with the minimum set of props, without crashing', () => {
    const { container } = renderComponent({
      href: 'test',
      children: 'some children',
    });
    expect(container).toBeDefined();
  });
  it('should display data props when passed down', () => {
    const data = { testAttr: 'some attr' };
    const { container } = renderComponent({
      href: 'test',
      children: 'some children',
      data,
    });
    const attributeUnderTest =
      container?.firstElementChild?.getAttribute('data-testattr');
    expect(attributeUnderTest).toEqual('some attr');
  });
});
