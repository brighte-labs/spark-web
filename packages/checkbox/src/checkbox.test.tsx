import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Checkbox } from './checkbox';
import { useFieldIds } from '@spark-web/field';

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

  it('should have described label from message', () => {
    const message = 'checkbox message';
    const props = { message };
    render(<Checkbox {...props}>{text}</Checkbox>);

    screen.getByText(message);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-describedby',
      message
    );
  });

  it('should have described label from message id', () => {
    const messageId = 'message_id';
    useFieldIdsMock.mockReturnValue({
      messageId,
      inputId: 'input_id',
    });
    render(<Checkbox>{text}</Checkbox>);

    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-describedby',
      messageId
    );
  });
});
