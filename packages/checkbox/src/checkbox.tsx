import { ControlLabel } from '@spark-web/control-label';
import { FieldMessage, useFieldIds } from '@spark-web/field';
import { Stack } from '@spark-web/stack';
import { forwardRef } from 'react';

import { CheckboxPrimitive } from './checkbox-primitive';
import type { CheckboxProps } from './types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      children,
      disabled = false,
      id: idProp,
      message,
      size = 'small',
      tone = 'neutral',
      ...inputProps
    },
    forwardedRef
  ) => {
    const { inputId, messageId } = useFieldIds(idProp);
    const a11yProps = {
      'aria-describedby': message && messageId,
    };

    return (
      <Stack gap="small">
        <ControlLabel
          control={
            <CheckboxPrimitive
              {...inputProps}
              {...a11yProps}
              ref={forwardedRef}
              disabled={disabled}
              size={size}
              id={inputId}
            />
          }
          disabled={disabled}
          htmlFor={inputId}
          size={size}
        >
          {children}
        </ControlLabel>
        {message && (
          <FieldMessage tone={tone} id={messageId} message={message} />
        )}
      </Stack>
    );
  }
);
Checkbox.displayName = 'Checkbox';
