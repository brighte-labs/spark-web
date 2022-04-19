import { Field } from '@spark-web/field';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Select, OptionsOrGroups } from './Select';
import type { DataAttributeMap } from '@spark-web/utils-spark';
import { useFieldContext } from '@spark-web/field';

jest.mock('@spark-web/field', () => {
  const original = jest.requireActual('@spark-web/field');
  return {
    ...original,
    useFieldContext: jest.fn(),
  };
});

const useFieldContextMock = useFieldContext as jest.Mock;

const renderComponent = ({
  options,
  name,
  placeholder,
  data,
}: {
  options: OptionsOrGroups;
  name: string;
  placeholder?: string;
  data?: DataAttributeMap;
}) =>
  render(
    <Field label={name}>
      <Select
        options={options}
        {...(placeholder && { placeholder })}
        {...(data && { data })}
      />
    </Field>
  );

describe('Select component', () => {
  const name = 'test select';
  beforeEach(() => {
    useFieldContextMock.mockReturnValue({
      disabled: false,
      invalid: false,
      'aria-label': name,
    });
  });

  afterEach(cleanup);

  it('should display select label', () => {
    renderComponent({ options: [], name });
    screen.getByText(name);
  });

  it('should display placeholder with empty value and disabled', () => {
    const placeholder = 'select placeholder';
    renderComponent({ options: [], name, placeholder });
    const placeholderOption = screen.getByRole('option', {
      name: placeholder,
    }) as HTMLOptionElement;
    expect(placeholderOption.selected).toBe(true);
    expect(placeholderOption.value).toBe('');
    expect(placeholderOption).toBeDisabled();
  });

  it('should have options to select', () => {
    const options = [
      { label: 'foo', value: 'bar' },
      { label: 'foo1', value: 'bar1' },
      { label: 'foo2', value: 'bar2' },
    ];
    renderComponent({ options, name });
    expect(
      (screen.getByRole('option', { name: 'foo' }) as HTMLOptionElement)
        .selected
    ).toBe(true);

    fireEvent.change(screen.getByLabelText(name), {
      target: { value: 'bar1' },
    });
    expect(
      (screen.getByRole('option', { name: 'foo1' }) as HTMLOptionElement)
        .selected
    ).toBe(true);

    fireEvent.change(screen.getByLabelText(name), {
      target: { value: 'bar2' },
    });
    expect(
      (screen.getByRole('option', { name: 'foo2' }) as HTMLOptionElement)
        .selected
    ).toBe(true);
  });

  it('should have attributes built by data', () => {
    const data = { foo: 'bar', foo1: 'bar1' };

    renderComponent({ data, name, options: [] });
    expect(screen.getByLabelText(name)).toHaveAttribute('data-foo', 'bar');
    expect(screen.getByLabelText(name)).toHaveAttribute('data-foo1', 'bar1');
  });

  it('should be disabled by field context', () => {
    useFieldContextMock.mockReturnValue({
      disabled: true,
      invalid: true,
      'aria-label': name,
    });
    renderComponent({ name, options: [] });
    expect(screen.getByLabelText(name)).toBeDisabled();
  });

  it('should have option in optGroup', () => {
    const optGroupOption = { label: 'foo1-0', value: 'bar1-0' };
    const options = [
      { label: 'foo', value: 'bar' },
      {
        label: 'foo1',
        value: 'bar1',
        options: [optGroupOption],
      },
    ];
    renderComponent({ name, options });
    expect(
      (
        screen.getByRole('option', {
          name: optGroupOption.label,
        }) as HTMLOptionElement
      ).value
    ).toBe(optGroupOption.value);
  });
});
