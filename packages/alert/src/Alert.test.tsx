import { cleanup, render } from '@testing-library/react';

import { Alert } from './Alert';

describe('Alert component', () => {
  afterEach(cleanup);

  it('should render correctly with the minimum set of props, without crashing', () => {
    const { container } = render(<Alert tone={'info'}>Test</Alert>);
    expect(container).toBeDefined();
  });
  it('should display data props when passed down', () => {
    const test_string = 'Test string';
    const data = { testAttr: 'some attr' };
    const { container } = render(
      <Alert data={data} tone={'info'}>
        {test_string}
      </Alert>
    );

    const divEl = container.querySelector('div');
    expect(divEl?.innerHTML).toContain('data-testattr="some attr"');
  });
});
