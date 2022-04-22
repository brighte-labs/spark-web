import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { Radio } from './radio';
import { RadioGroup } from './radio-group';

const RadioGroupMock = ({
  selectedValue,
  message,
  radios,
  disabled,
}: {
  selectedValue: string;
  message: string;
  radios: { name: string; value?: string; disabled?: boolean }[];
  disabled?: boolean;
}) => {
  const [selected, setSelected] = useState(selectedValue);

  return (
    <RadioGroup
      value={selected ?? ''}
      onChange={setSelected}
      message={message}
      disabled={disabled}
    >
      {radios.map(radio => (
        <Radio key={radio.name} {...radio}>
          {radio.name}
        </Radio>
      ))}
    </RadioGroup>
  );
};

const renderRadioGroup = ({
  radios,
  message,
  selectedValue,
  disabled,
}: {
  message: string;
  radios: { name: string; value?: string }[];
  selectedValue?: string;
  disabled?: boolean;
}) => {
  return render(
    <RadioGroupMock
      selectedValue={selectedValue ?? ''}
      radios={radios}
      message={message}
      disabled={disabled}
    />
  );
};

describe('Radio component', () => {
  const message = 'radio_group_name';

  it('should have group name', () => {
    const radios = [{ value: 'foo', name: 'bar' }];
    renderRadioGroup({ radios, message });
    screen.getByText(message);
  });

  it('should have group disabled', () => {
    const radios = [
      { value: 'foo', name: 'bar' },
      { value: 'foo1', name: 'bar1' },
    ];
    renderRadioGroup({ radios, message, disabled: true });
    expect(screen.getAllByRole('radio')[0]).toBeDisabled();
    expect(screen.getAllByRole('radio')[1]).toBeDisabled();

    fireEvent.click(screen.getAllByRole('radio')[0]);
    expect(screen.getAllByRole('radio')[0]).toBeDisabled();
    expect(screen.getAllByRole('radio')[1]).toBeDisabled();
  });

  it('should render radio group', () => {
    const radios = [
      { value: 'foo', name: 'bar' },
      { value: 'foo1', name: 'bar1' },
    ];
    renderRadioGroup({ radios, message });
    screen.getByText('bar');
    screen.getByText('bar1');
  });

  it('should have radio disabled', () => {
    const radios = [
      { value: 'foo', name: 'bar' },
      { value: 'foo1', name: 'bar1', disabled: true },
    ];
    renderRadioGroup({ radios, message: 'radio_group_name' });
    expect(screen.getAllByRole('radio')[0]).toBeEnabled();
    expect(screen.getAllByRole('radio')[1]).toBeDisabled();
  });

  it('should have error without value for radio', () => {
    const radios = [{ name: 'bar' }, { name: 'bar1', value: 'foo1' }];
    expect.assertions(1);
    try {
      renderRadioGroup({ radios, message: 'radio_group_name' });
    } catch (err) {
      expect(err).toStrictEqual(
        new Error(
          'Each <Radio> within a <RadioGroup> requires a `value` property.'
        )
      );
    }
  });

  it('should have initial selected value', () => {
    const radios = [
      { value: 'foo', name: 'bar' },
      { value: 'foo1', name: 'bar1' },
    ];
    renderRadioGroup({
      selectedValue: 'foo1',
      radios,
      message,
    });

    expect(screen.getAllByRole('radio')[1]).toHaveAttribute(
      'aria-checked',
      'true'
    );
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute(
      'aria-checked',
      'false'
    );
  });

  it('should be selected by click', () => {
    const radios = [
      { value: 'foo', name: 'bar' },
      { value: 'foo1', name: 'bar1' },
      { value: 'foo2', name: 'bar2' },
    ];
    renderRadioGroup({
      selectedValue: 'foo',
      radios,
      message,
    });

    fireEvent.click(screen.getAllByRole('radio')[1]);
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute(
      'aria-checked',
      'true'
    );

    fireEvent.click(screen.getAllByRole('radio')[2]);
    expect(screen.getAllByRole('radio')[2]).toHaveAttribute(
      'aria-checked',
      'true'
    );
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute(
      'aria-checked',
      'false'
    );
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute(
      'aria-checked',
      'false'
    );
  });
});
