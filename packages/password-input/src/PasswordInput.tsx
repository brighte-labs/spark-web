import { useFieldContext } from '@spark-web/field';
import { EyeIcon, EyeOffIcon } from '@spark-web/icon';
import type { TextInputProps } from '@spark-web/text-input';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import type {
  ButtonHTMLAttributes,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { forwardRef, useState } from 'react';

import { IconButton } from './IconButton';

export type PasswordInputProps = Omit<TextInputProps, 'children' | 'inputMode'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, forwardedRef) => {
    const [{ disabled }] = useFieldContext();
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

/**
 * Prevent click events when the component is "disabled".
 * Note: we don't want to actually disable a button element for several reasons.
 * One being because that would prohibit the use of tooltips.
 */
export function getPreventableClickHandler(
  onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick'],
  disabled: boolean
) {
  return function handleClick(
    event: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (disabled) {
      event.preventDefault();
    } else {
      onClick?.(event);
    }
  };
}
