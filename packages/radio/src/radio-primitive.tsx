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

    const radioStyles = useRadioStyles({ size });

    return (
      <Box
        display="flex"
        alignItems="center"
        flexShrink={0}
        className={css(responsiveStyles)}
      >
        <Box
          {...inputProps}
          {...radioStyles}
          aria-checked={inputProps.checked}
          aria-disabled={inputProps.disabled}
          ref={forwardedRef}
          as="input"
          type="radio"
        />
        {/* Used for styling of Radio Card */}
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

function useRadioStyles({ size }: { size: RadioSize }) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ always: true });

  const outerSize = sizeToScaleKey[size];
  const innerSize = outerToInnerSize[outerSize];

  const transitionProperties = {
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    transitionTimingFunction: theme.animation.standard.easing,
    transitionDuration: `${theme.animation.standard.duration}ms`,
  };

  return {
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

    className: css({
      appearance: 'none',
      verticalAlign: 'text-bottom',
      ...transitionProperties,

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

      'label:hover &:not([disabled], &[aria-disabled=true])': {
        borderColor: theme.border.color.primaryHover,
      },

      '&:focus': focusRingStyles,

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

      'label:hover &:not([disabled], &[aria-disabled=true]):checked': {
        // TODO: radio gets lighter on hover instead of darker like in the designs, will fix once tokens are revised
        background: theme.backgroundInteractions.primaryHover,
        border: theme.border.color.fieldAccent,
      },

      '&[disabled]:checked, &[aria-disabled=true]:checked': {
        // TODO: using a `border` colour for background here as we don't have a token for it just yet
        background: theme.border.color.field,
        border: theme.border.color.accent,
      },
      '&[disabled]:checked::before, &[aria-disabled=true]:checked::before': {
        background: theme.color.background.fieldAccent,
      },

      // RadioCard styles
      '&[data-radio-card=true] + [data-radio-border=true]': {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderColor: theme.border.color.field,
        borderStyle: 'solid',
        borderWidth: theme.border.width.standard,
        borderRadius: theme.border.radius.small,
        pointerEvents: 'none',
        ...transitionProperties,
      },

      'label:hover &:not([disabled], &[aria-disabled=true]) + [data-radio-border=true]':
        {
          borderColor: theme.border.color.primaryHover,
        },

      '&[data-radio-card=true]:focus': {
        borderColor: theme.border.color.primary,
        boxShadow: 'none',
      },

      '&[data-radio-card=true]:focus + [data-radio-border=true]': {
        borderColor: theme.border.color.primary,
        ...focusRingStyles,
      },

      '&[data-radio-card=true]:is([disabled], &[aria-disabled=true]) + [data-radio-border=true]':
        {
          borderColor: theme.border.color.field,
        },

      '&[data-radio-card=true]:checked + [data-radio-border=true]': {
        borderColor: theme.border.color.primary,
        borderWidth: theme.border.width.large,
      },
    }),
  } as const;
}
