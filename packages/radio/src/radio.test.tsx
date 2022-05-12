import '@testing-library/jest-dom';

import type { DataAttributeMap } from '@spark-web/utils/internal';
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
  data,
}: {
  name?: string;
  value?: string;
  label: string;
  disabled?: boolean;
  size?: RadioSize;
  data?: DataAttributeMap;
}) => {
  return render(
    <Radio
      name={name}
      value={value}
      disabled={disabled}
      size={size}
      data={data}
    >
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
  it('should assign a value to the input correctly when passed in', () => {
    const value = 'some value';
    renderComponent({ label, value });
    expect(screen.getByDisplayValue('some value')).toBeTruthy();
  });
  it('should display data props when passed down', () => {
    const data = { testAttr: 'some attr' };
    const value = 'some value';
    renderComponent({ label, value, data });
    const attributeUnderTest = screen
      .getByDisplayValue('some value')
      .parentElement?.getAttribute('data-testattr');
    expect(attributeUnderTest).toEqual('some attr');
  });
});
