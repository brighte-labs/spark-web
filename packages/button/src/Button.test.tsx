import { cleanup, render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('button component', () => {
  afterEach(cleanup);

  it('should show a button with expected text', () => {
    render(<Button>Test Button</Button>);

    screen.getByText('Test Button');
  });

  it('should trigger button onClick function', () => {
    const jsfn = jest.fn();

    render(<Button onClick={jsfn}>Test Button</Button>);
    screen.getByText('Test Button').click();

    expect(jsfn).toBeCalled();
  });

  it('Build expected data attribute', () => {
    const { container } = render(
      <Button data={{ button: 'test-value' }} id="test-button">
        More Test Text
      </Button>
    );

    expect(container.querySelector('[data-button="test-value"]')?.id).toEqual(
      'test-button'
    );
  });
});
