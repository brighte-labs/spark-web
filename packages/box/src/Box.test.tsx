import { cleanup, render } from '@testing-library/react';

import { Box } from './Box';

describe('Box component', () => {
  afterEach(cleanup);

  it('should render correctly with the minimum set of props, without crashing', () => {
    const { container } = render(<Box />);
    expect(container).toBeDefined();
  });
  it('should render as a div by default', () => {
    const { container } = render(<Box />);
    const tagEl = container.querySelector('div');
    expect(tagEl).toBeTruthy();
  });
  it('should render as a link if passed in', () => {
    const { container } = render(<Box as={'link'} />);
    const linkEl = container.querySelector('link');
    const divEl = container.querySelector('div');
    expect(linkEl).toBeTruthy();
    expect(divEl).toBeFalsy();
  });
  it('should spread data attributes when they are passed in', () => {
    const data = { testAttr: 'some attr' };
    const { container } = render(<Box as={'link'} data={data} />);
    const divEl = container.querySelector('link');
    expect(divEl?.getAttribute('data-testAttr')).toEqual('some attr');
  });
});
