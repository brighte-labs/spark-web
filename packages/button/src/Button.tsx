import { VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import { Spinner } from '@spark-web/spinner';
import { buildDataAttributes } from '@spark-web/utils/internal';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { forwardRef } from 'react';

import { resolveButtonChildren } from './resolveButtonChildren';
import type { CommonButtonProps, NativeButtonProps } from './types';
import { useButtonStyles } from './useButtonStyles';
import { variants } from './utils';

// TODO:
// discuss with design:
// - sizes
// - variants
// implementation details:
// - handle fragments?
// - validate children?

export type ButtonProps = CommonButtonProps & {
  /**
   * Identifies the element (or elements) whose contents or presence
   * are controlled by the current element.
   */
  'aria-controls'?: NativeButtonProps['aria-controls'];
  /**  Identifies the element (or elements) that describes the object. */
  'aria-describedby'?: NativeButtonProps['aria-describedby'];
  /**  Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  'aria-expanded'?: NativeButtonProps['aria-expanded'];
  /** When true, prevents onClick from firing. */
  disabled?: boolean;
  /** When true, the button will display a loading spinner. */
  loading?: boolean;
  /** Function to be fired following a click event of the button. Only applicable for Button. */
  onClick?: NativeButtonProps['onClick'];
  /** The size of the button. */
  size?: CommonButtonProps['size'];
  /** Provide an alternate type if the button is within a form. */
  type?: 'button' | 'submit' | 'reset';
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
      loading = false,
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

    const isDisabled = disabled || loading;
    const isLoading = loading && !disabled;

    const variant = variants[prominence][tone];

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
          isLoading,
          prominence,
          size,
          tone,
        })}
        {isLoading && <Loading tone={variant?.textTone} />}
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

function Loading({ tone }: { tone?: IconProps['tone'] }) {
  return (
    <Box
      as="span"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VisuallyHidden>button loading indicator</VisuallyHidden>
      <Spinner size="xsmall" tone={tone} />
    </Box>
  );
}
