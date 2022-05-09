import { cleanup, render } from '@testing-library/react';

import type { BoxProps } from './Box';
import { Box } from './Box';

const renderComponent = (props: BoxProps) =>
  render(<Box as={props?.asElement} data={props?.data} />);

describe('Alert component', () => {
  afterEach(cleanup);

  it('should render correctly with the minimum set of props, without crashing', () => {
    const { container } = renderComponent({});
    expect(container).toBeDefined();
  });
  it('should render as a div by default', () => {
    const { container } = renderComponent({});
    const tagEl = container.querySelector('div');
    expect(tagEl).toBeTruthy();
  });
  it('should render as a link if passed in', () => {
    const { container } = renderComponent({ asElement: 'link' });
    const linkEl = container.querySelector('link');
    const divEl = container.querySelector('div');
    expect(linkEl).toBeTruthy();
    expect(divEl).toBeFalsy();
  });
  it('should spread data attributes when they are passed in', () => {
    const data = { testAttr: 'some attr' };
    const { container } = renderComponent({ asElement: 'link', data });
    const divEl = container.querySelector('link');
    expect(divEl?.getAttribute('data-testAttr')).toEqual('some attr');
  });
});
