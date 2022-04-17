import '@testing-library/jest-dom';

import { useFieldIds } from '@spark-web/field';
import { cleanup, render, screen } from '@testing-library/react';

import { Checkbox } from './checkbox';

jest.mock('@spark-web/field', () => {
  const original = jest.requireActual('@spark-web/field');
  return {
    ...original,
    useFieldIds: jest.fn(),
  };
});

const useFieldIdsMock = useFieldIds as jest.Mock;

describe('Checkbox component', () => {
  beforeEach(() => {
    useFieldIdsMock.mockReturnValue({
      messageId: undefined,
      inputId: 'input_id',
    });
  });

  afterEach(cleanup);
  const text = 'Test checkbox';
  it('should have text', () => {
    render(<Checkbox>{text}</Checkbox>);
    screen.getByText(text);
    expect(screen.getByRole('checkbox')).toBeEnabled();
  });

  it('should be disabled', () => {
    useFieldIdsMock.mockReturnValue({
      messageId: undefined,
      inputId: 'input_id',
    });
    const props = { disabled: true };
    render(<Checkbox {...props}>{text}</Checkbox>);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should have described label if message', () => {
    const messageId = 'message_id';
    const message = 'checkbox message';
    useFieldIdsMock.mockReturnValue({
      messageId,
      inputId: 'input_id',
    });
    const props = { message };
    render(<Checkbox {...props}>{text}</Checkbox>);

    screen.getByText(message);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-describedby',
      messageId
    );
  });

  it('should not have described label if no message', () => {
    const messageId = 'message_id';
    useFieldIdsMock.mockReturnValue({
      messageId,
      inputId: 'input_id',
    });
    render(<Checkbox>{text}</Checkbox>);

    expect(screen.getByRole('checkbox')).not.toHaveAttribute(
      'aria-describedby'
    );
  });
});
