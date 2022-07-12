import { cleanup, render } from '@testing-library/react';

import { Alert } from './Alert';

describe('Alert component', () => {
  afterEach(cleanup);

  it('should render correctly with the minimum set of props, without crashing', () => {
    const { container } = render(<Alert tone="info">Test</Alert>);
    expect(container).toBeDefined();
  });

  it('should display data props when passed down', () => {
    const testString = 'Test string';
    const { container } = render(
      <Alert data={{ testAttr: 'some attr' }} tone="info">
        {testString}
      </Alert>
    );
    const alertEl = container.firstElementChild;
    expect(alertEl?.getAttribute('data-testattr')).toEqual('some attr');
  });
});
