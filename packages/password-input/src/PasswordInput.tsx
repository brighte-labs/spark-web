import { BaseButton } from '@spark-web/button';
import { useFieldContext } from '@spark-web/field';
import { EyeIcon, EyeOffIcon } from '@spark-web/icon';
import type { TextInputProps } from '@spark-web/text-input';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import { forwardRef, useState } from 'react';

import { useIconButtonStyles } from './useIconButtonStyles';

export type PasswordInputProps = Omit<TextInputProps, 'children' | 'inputMode'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, forwardedRef) => {
    const [{ disabled }] = useFieldContext();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const iconButtonStyles = useIconButtonStyles();
    const Icon = showPassword ? EyeOffIcon : EyeIcon;

    return (
      <TextInput
        {...props}
        ref={forwardedRef}
        inputMode="text"
        type={showPassword ? 'text' : 'password'}
      >
        <InputAdornment placement="end">
          <BaseButton
            {...iconButtonStyles}
            aria-checked={showPassword}
            aria-label={`${showPassword ? 'Hide' : 'Show'} password`}
            disabled={disabled}
            onClick={toggleShowPassword}
            role="switch"
          >
            <Icon tone={disabled ? 'disabled' : 'neutral'} />
          </BaseButton>
        </InputAdornment>
      </TextInput>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
