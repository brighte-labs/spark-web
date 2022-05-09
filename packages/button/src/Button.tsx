import { Box } from '@spark-web/box';
import { buildDataAttributes } from '@spark-web/utils/internal';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { forwardRef } from 'react';

import { resolveButtonChildren } from './resolveButtonChildren';
import type { CommonButtonProps, NativeButtonProps } from './types';
import { useButtonStyles } from './useButtonStyles';

// TODO:
// discuss with design:
// - sizes
// - variants
// implementation details:
// - handle fragments?
// - validate children?

export type ButtonProps = CommonButtonProps & {
  'aria-controls'?: NativeButtonProps['aria-controls'];
  'aria-describedby'?: NativeButtonProps['aria-describedby'];
  'aria-expanded'?: NativeButtonProps['aria-expanded'];
  onClick?: NativeButtonProps['onClick'];
  size?: CommonButtonProps['size'];
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

/**
 * Buttons are used to initialize an action, their label should express what
 * action will occur when the user interacts with it.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-expanded': ariaExpanded,
      data,
      disabled = false,
      id,
      onClick,
      prominence = 'high',
      size = 'medium',
      tone = 'primary',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const iconOnly = Boolean(props.label);
    const buttonStyleProps = useButtonStyles({
      iconOnly,
      size,
      tone,
      prominence,
    });

    // TODO: add loading state for button
    const isDisabled = disabled; /* || loading */
    /**
     * handle "disabled" behaviour w/o disabling buttons
     * @see https://axesslab.com/disabled-buttons-suck/
     */
    const handleClick = getPreventableClickHandler(onClick, isDisabled);

    return (
      <Box
        aria-controls={ariaControls}
        aria-describedby={ariaDescribedBy}
        aria-disabled={isDisabled}
        aria-expanded={ariaExpanded}
        aria-label={props.label}
        as="button"
        id={id}
        onClick={handleClick}
        ref={ref}
        type={type}
        {...buttonStyleProps}
        {...(data ? buildDataAttributes(data) : undefined)}
      >
        {resolveButtonChildren({
          ...props,
          prominence,
          size,
          tone,
        })}
      </Box>
    );
  }
);
Button.displayName = 'Button';

/**
 * Prevent click events when the component is "disabled".
 * Note: we don't want to actually disable a button element for several reasons.
 * One being because that would prohibit the use of tooltips.
 */
export function getPreventableClickHandler(
  onClick: NativeButtonProps['onClick'],
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
