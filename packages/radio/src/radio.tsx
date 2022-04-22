import { ControlLabel } from '@spark-web/control-label';
import { Stack } from '@spark-web/stack';
import { forwardRef } from 'react';

import { useRadioGroupContext } from './context';
import { RadioPrimitive } from './radio-primitive';
import type { RadioProps } from './types';
import { useRadioGroupItem } from './use-radio-group-state';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { children, disabled, id, size: sizeProp, ...consumerProps },
    forwardedRef
  ) => {
    const groupState = useRadioGroupContext();
    const radioGroupItemProps = useRadioGroupItem({
      props: consumerProps,
      state: groupState,
    });
    const inputProps =
      typeof groupState === 'undefined' ? consumerProps : radioGroupItemProps;

    const isDisabled = disabled ?? groupState?.disabled ?? false;
    const size = sizeProp ?? groupState?.size;

    return (
      <Stack gap="small">
        <ControlLabel
          control={
            <RadioPrimitive
              {...inputProps}
              ref={forwardedRef}
              disabled={isDisabled}
              size={size}
              id={id}
            />
          }
          disabled={isDisabled}
          htmlFor={id}
          size={size ?? 'small'}
        >
          {children}
        </ControlLabel>
      </Stack>
    );
  }
);
Radio.displayName = 'Radio';
