import '@testing-library/jest-dom';

import type { FieldProps } from '@spark-web/field';
import { Field } from '@spark-web/field';
import { render, screen } from '@testing-library/react';

import type { TextAreaProps } from '.';
import { TextArea } from './text-area';

const renderComponent = (
  fieldProps: Omit<FieldProps, 'children'>,
  props?: TextAreaProps
) => {
  return render(
    <Field {...fieldProps}>
      <TextArea {...props} />
    </Field>
  );
};

describe('TextArea component', () => {
  const label = 'textarea_name';

  it('should have label', () => {
    renderComponent({ label });
    screen.getByText(label);
  });

  it('should have error if not used inside Field', () => {
    expect.assertions(1);
    try {
      render(<TextArea />);
    } catch (error) {
      expect(error).toStrictEqual(
        new Error('Input components must be inside a `Field`.')
      );
    }
  });

  it('should have attributes built by data', () => {
    const data = { foo: 'bar', foo1: 'bar1' };

    renderComponent({ label }, { data });
    expect(screen.getByLabelText(label)).toHaveAttribute('data-foo', 'bar');
    expect(screen.getByLabelText(label)).toHaveAttribute('data-foo1', 'bar1');
  });

  it('should be disabled', () => {
    renderComponent({ label, disabled: true });
    expect(screen.getByLabelText(label)).toBeDisabled();
  });

  it('should have message with critical icon', () => {
    const message = 'I am a message.';
    const { container } = renderComponent({ label, message, tone: 'critical' });
    screen.getByText(message);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have message without icon', () => {
    const message = 'I am a message.';
    const { container } = renderComponent({ label, message });
    screen.getByText(message);
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
