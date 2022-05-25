import '@testing-library/jest-dom';

import type { FieldProps, Tone } from '@spark-web/field';
import { Field } from '@spark-web/field';
import { cleanup, render, screen } from '@testing-library/react';

import type { ComboboxProps } from './combobox';
import { Combobox } from './combobox';

// Tone['critical'];
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const items: Item[] = [
  { label: 'Test One', value: 'Test One' },
  { label: 'Test Two', value: 'Test Two' },
];
type Item = { label: string; value: string };

const defaultFieldProps = {
  id: 'id',
  message: 'some test message',
  label: 'some test label',
  tone: 'muted' as Tone,
};

describe('Combobox component', () => {
  const renderComponent = (
    comboProps?: ComboboxProps,
    fieldProps?: Omit<FieldProps, 'children'>
  ) => {
    return render(
      <Field
        id={fieldProps?.id}
        message={fieldProps?.message}
        label={fieldProps?.label || 'default test label'}
        tone={fieldProps?.tone}
      >
        <Combobox
          items={comboProps?.items || items}
          onChange={value => value}
          value={'value'}
          data={comboProps?.data}
        />
      </Field>
    );
  };
  it('should render correctly', () => {
    const props: ComboboxProps = {
      items,
    };
    renderComponent(props);
    expect(screen.getByRole('combobox')).toBeTruthy();
  });
  it('should assume the ID passed in from wrapper field component', () => {
    const props = {
      ...defaultFieldProps,
      id: 'some-test-id',
    };
    renderComponent(undefined, props);
    expect(screen.getByRole('combobox').id).toEqual('some-test-id');
  });
  it('should use the field message to populate the aria-describedby attribute on the combobox input element', () => {
    const props = {
      ...defaultFieldProps,
      id: 'some-test-id',
    };
    renderComponent(undefined, props);
    expect(
      screen.getByRole('combobox').getAttribute('aria-describedby')
    ).toEqual('some-test-id--message');
  });
  it('should not pass through the aria-invalid attribute to the combobox input element if tone not set to critical', () => {
    renderComponent(undefined, defaultFieldProps);
    expect(
      screen.getByRole('combobox').getAttribute('aria-invalid')
    ).toBeFalsy();
  });
  it('should pass through the aria-invalid attribute to combobox input element correctly if tone set to critical', () => {
    const props = {
      ...defaultFieldProps,
      tone: 'critical' as Tone,
    };
    renderComponent(undefined, props);
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toEqual(
      'true'
    );
  });
  it('should pass through data attributes', () => {
    const props: ComboboxProps = {
      items,
      data: { testAttr: 'some attr' },
    };
    renderComponent(props);
    expect(screen.getByRole('combobox').getAttribute('data-testAttr')).toEqual(
      'some attr'
    );
  });
});
