import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { useTheme } from '@spark-web/theme';
import { forwardRef } from 'react';

import type { RadioPrimitiveProps, RadioSize } from './types';

export const RadioPrimitive = forwardRef<HTMLInputElement, RadioPrimitiveProps>(
  ({ size = 'small', ...inputProps }, forwardedRef) => {
    const theme = useTheme();
    const responsiveStyles = theme.utils.responsiveStyles({
      mobile: { height: theme.typography.text.small.mobile.capHeight },
      tablet: { height: theme.typography.text.small.tablet.capHeight },
    });

    const [boxProps, radioStyles] = useRadioStyles({ size });

    return (
      <Box
        display="flex"
        alignItems="center"
        flexShrink={0}
        className={css(responsiveStyles)}
      >
        <Box
          {...inputProps}
          {...boxProps}
          aria-checked={inputProps.checked}
          aria-disabled={inputProps.disabled}
          as="input"
          className={css(radioStyles)}
          ref={forwardedRef}
          type="radio"
        />
        {/* Used for styling of RadioCard */}
        <span aria-hidden data-radio-border="true" />
      </Box>
    );
  }
);

RadioPrimitive.displayName = 'RadioPrimitive';

const sizeToScaleKey = {
  small: 'xxsmall',
  medium: 'xsmall',
} as const;

const outerToInnerSize = {
  xxsmall: 6,
  xsmall: 9,
} as const;

export function useTransitionProperties() {
  const theme = useTheme();
  return {
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    transitionTimingFunction: theme.animation.standard.easing,
    transitionDuration: `${theme.animation.standard.duration}ms`,
  };
}

/**
 * Returns a tuple where the first item is an object of props to spread onto the
 * underlying Box component that our inputs are created with, and the second
 * item is a CSS object to be passed to Emotion's `css` function
 */
function useRadioStyles({ size }: { size: RadioSize }) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();

  const outerSize = sizeToScaleKey[size];
  const innerSize = outerToInnerSize[outerSize];

  const transitionProperties = useTransitionProperties();

  return [
    {
      border: 'field',
      borderRadius: 'full',
      background: 'surface',

      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,

      height: outerSize,
      width: outerSize,

      position: 'relative',

      shadow: 'small',
    },
    {
      appearance: 'none',
      verticalAlign: 'text-bottom',
      ...transitionProperties,

      // Inner circle of radio
      '&::before': {
        content: '""',
        position: 'absolute',
        margin: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: 0,
        width: 0,
        overflow: 'hidden',
        ...transitionProperties,
      },

      // Show a border on the radio when the label is hovered.
      'label:hover &:not([disabled], &[aria-disabled=true])': {
        borderColor: theme.border.color.primaryHover,
      },

      // Focus styles
      '&:focus': focusRingStyles,

      // Checked styles
      '&:checked': {
        background: theme.color.background.primary,
        borderColor: theme.border.color.primaryHover,
      },
      '&:checked::before': {
        background: theme.color.background.surface,
        borderRadius: theme.border.radius.full,
        height: innerSize,
        width: innerSize,
      },

      // Hover styles when checked
      'label:hover &:not([disabled], &[aria-disabled=true]):checked': {
        // TODO: radio gets lighter on hover instead of darker like in the designs, will fix once tokens are revised
        background: theme.backgroundInteractions.primaryHover,
        border: theme.border.color.fieldAccent,
      },

      // Disabled styles when checked
      '&[disabled]:checked, &[aria-disabled=true]:checked': {
        // TODO: using a `border` colour for background here as we don't have a token for it just yet
        background: theme.border.color.field,
        border: theme.border.color.accent,
      },
      '&[disabled]:checked::before, &[aria-disabled=true]:checked::before': {
        background: theme.color.background.fieldAccent,
      },
    },
  ] as const;
}
