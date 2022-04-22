import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { useRadioGroupContext } from './context';
import { Radio } from './radio';
import type { RadioSize } from './types';

jest.mock('./context', () => {
  const original = jest.requireActual('./context');
  return {
    ...original,
    useRadioGroupContext: jest.fn(),
  };
});
const useRadioGroupContextMock = useRadioGroupContext as jest.Mock;

const renderComponent = ({
  name,
  value,
  label,
  disabled,
  size,
}: {
  name?: string;
  value?: string;
  label: string;
  disabled?: boolean;
  size?: RadioSize;
}) => {
  return render(
    <Radio name={name} value={value} disabled={disabled} size={size}>
      {label}
    </Radio>
  );
};

describe('Radio component', () => {
  const label = 'Test radio';
  it('should have label', () => {
    const size = 'medium';
    renderComponent({ label, size });
    screen.getByText(label);
    expect(screen.getByRole('radio')).toBeEnabled();
  });

  it('should be disabled', () => {
    renderComponent({ label, disabled: true });
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('should be disabled by group context', () => {
    useRadioGroupContextMock.mockReturnValue({ disabled: true });
    renderComponent({ label, name: 'name', value: 'value' });
    expect(screen.getByRole('radio')).toBeDisabled();
  });
});
