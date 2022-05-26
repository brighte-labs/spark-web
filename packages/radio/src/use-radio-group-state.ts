import { useId } from '@spark-web/a11y';
import type { ChangeEvent } from 'react';

import type { RadioGroupProps, RadioProps } from './types';

type StateHookProps<T extends string> = Omit<
  RadioGroupProps<T>,
  'children' | 'gap' | 'legend'
>;

export function useRadioGroupState<Value extends string>(
  props: StateHookProps<Value>
) {
  const name = useId(props.name);
  return {
    disabled: props.disabled,
    name: props.name ?? name,
    onChange(event: ChangeEvent<HTMLInputElement>) {
      if (props.disabled) {
        return;
      }
      const inputValue = event.target.value as Value;
      props.onChange(inputValue);
    },
    size: props.size,
    value: props.value,
    'aria-describedby': props['aria-describedby'],
  };
}

export function useRadioGroupItem({
  props,
  state,
}: {
  props: Omit<RadioProps, 'children'>;
  state?: ReturnType<typeof useRadioGroupState>;
}) {
  if (typeof state === 'undefined') {
    return undefined;
  }

  const radioValue = props.value;
  if (typeof radioValue === 'undefined') {
    throw new Error(
      'Each <Radio> within a <RadioGroup> requires a `value` property.'
    );
  }

  return {
    checked: state.value === radioValue,
    disabled: state.disabled,
    name: state.name,
    onChange: state.onChange,
    size: state.size,
    value: radioValue,
    'aria-describedby': state['aria-describedby'],
  };
}
