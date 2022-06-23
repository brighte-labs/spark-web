import { VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import { Spinner } from '@spark-web/spinner';
import { forwardRef } from 'react';

import { BaseButton } from './BaseButton';
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
      disabled,
      id,
      loading = false,
      onClick,
      prominence = 'high',
      size = 'medium',
      tone = 'primary',
      type,
      ...props
    },
    forwardedRef
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

    return (
      <BaseButton
        {...buttonStyleProps}
        aria-controls={ariaControls}
        aria-describedby={ariaDescribedBy}
        aria-disabled={isDisabled}
        aria-expanded={ariaExpanded}
        aria-label={props.label}
        data={data}
        disabled={isDisabled}
        id={id}
        onClick={onClick}
        ref={forwardedRef}
        type={type}
      >
        {resolveButtonChildren({
          ...props,
          isLoading,
          prominence,
          size,
          tone,
        })}
        {isLoading && <Loading tone={variant?.textTone} />}
      </BaseButton>
    );
  }
);
Button.displayName = 'Button';

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
