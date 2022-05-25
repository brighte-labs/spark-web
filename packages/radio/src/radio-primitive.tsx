import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { useTheme } from '@spark-web/theme';
import { forwardRef } from 'react';

import type { RadioPrimitiveProps, RadioSize } from './types';

export const RadioPrimitive = forwardRef<HTMLInputElement, RadioPrimitiveProps>(
  ({ size = 'small', data, ...inputProps }, forwardedRef) => {
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
          as="input"
          aria-checked={inputProps.checked}
          aria-disabled={inputProps.disabled}
          ref={forwardedRef}
          data={data}
          type="radio"
        />
      </Box>
    );
  }
);

RadioPrimitive.displayName = 'RadioPrimitive';

const sizeToScaleKey = {
  small: 'xxsmall',
  medium: 'xsmall',
} as const;

function useRadioStyles({ size }: { size: RadioSize }) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ always: true });

  const sizeToken = sizeToScaleKey[size];
  const resolvedSize = theme.sizing[sizeToken];

  const transitionProperties = {
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    transitionTimingFunction: theme.animation.standard.easing,
    transitionDuration: `${theme.animation.standard.duration}ms`,
  };

  return {
    border: 'field',
    display: 'inline-block',
    background: 'surface',
    height: sizeToken,
    width: sizeToken,
    borderRadius: 'full',
    position: 'relative',
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
        height: resolvedSize / 2.6666666667,
        width: resolvedSize / 2.6666666667,
      },

      '&[disabled]:checked, &[aria-disabled=true]:checked': {
        // TODO: using a `border` colour for background here as we don't have a token for it just yet
        background: theme.border.color.field,
        border: theme.border.color.accent,
      },
      '&[disabled]:checked::before, &[aria-disabled=true]:checked::before': {
        background: theme.color.background.fieldAccent,
      },
    }),
  } as const;
}
