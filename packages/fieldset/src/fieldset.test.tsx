import { cleanup, render } from '@testing-library/react';

import { Fieldset } from './fieldset';

describe('Fieldset component', () => {
  afterEach(cleanup);

  it('should have legend as first direct child of fieldset', () => {
    // https://www.accessibility-developer-guide.com/examples/forms/grouping-with-fieldset-legend/#legend-must-be-a-direct-child-of-fieldset

    const { container } = render(
      <Fieldset legend="Test legend">Test content</Fieldset>
    );

    const fieldsetEl = container.firstElementChild!;
    expect(fieldsetEl.tagName).toBe('FIELDSET');

    const legendEl = fieldsetEl.firstElementChild!;
    expect(legendEl.tagName).toBe('LEGEND');
  });
  it('should attach data attributes when passed in', () => {
    const data = { testAttr: 'some attr' };
    const { container } = render(<Fieldset data={data}>Test content</Fieldset>);

    const fieldsetEl = container.firstElementChild!;
    expect(fieldsetEl.getAttribute('data-testattr')).toEqual('some attr');
  });
});
