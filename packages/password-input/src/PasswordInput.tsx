import { getPreventableClickHandler } from '@spark-web/button/src/Button';
import { useFieldContext } from '@spark-web/field';
import { EyeIcon, EyeOffIcon } from '@spark-web/icon';
import type { TextInputProps } from '@spark-web/text-input';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import { forwardRef, useState } from 'react';

import { IconButton } from './IconButton';

export type PasswordInputProps = Omit<TextInputProps, 'children' | 'inputMode'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, forwardedRef) => {
    const { disabled } = useFieldContext();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const handleClick = getPreventableClickHandler(
      toggleShowPassword,
      disabled
    );

    const Icon = showPassword ? EyeOffIcon : EyeIcon;

    return (
      <TextInput
        {...props}
        ref={forwardedRef}
        inputMode="text"
        type={showPassword ? 'text' : 'password'}
      >
        <InputAdornment placement="end">
          <IconButton handleClick={handleClick} aria-pressed={showPassword}>
            <Icon tone={disabled ? 'disabled' : 'neutral'} />
          </IconButton>
        </InputAdornment>
      </TextInput>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
