import type { CSSObject } from '@emotion/css';
import { css } from '@emotion/css';
import { useFocusRing, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { createIcon } from '@spark-web/icon';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { forwardRef } from 'react';

import type { RadioPrimitiveProps, RadioSize } from './types';

export const RadioPrimitive = forwardRef<HTMLInputElement, RadioPrimitiveProps>(
  ({ size = 'small', ...inputProps }, forwardedRef) => {
    return (
      /**
       * Text is being used here to add the `::before` and `::after` pseudo elements
       * so that we can align the radio button with the label text
       */
      <Text>
        <Box
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          {/**
           * Zero-width space character, used to align radio button with label text
           * @see https://codepen.io/adamwathan/pen/bGNxMpz
           */}
          &#8203;
          <VisuallyHidden
            as="input"
            type="radio"
            ref={forwardedRef}
            aria-checked={inputProps.checked}
            {...inputProps}
          />
          <Indicator size={size} />
        </Box>
      </Text>
    );
  }
);
RadioPrimitive.displayName = 'RadioPrimitive';

const DotIcon = createIcon(<circle cx="12" cy="12" r="5" />, 'DotIcon');

function Indicator({ size }: { size: RadioSize }) {
  const indicatorStyles = useIndicatorStyles(size);

  return (
    <Box className={css(indicatorStyles)}>
      <DotIcon size={sizeToScaleKey[size]} />
    </Box>
  );
}

const sizeToScaleKey = {
  small: 'xxsmall',
  medium: 'xsmall',
} as const;

function useIndicatorStyles(size: RadioSize): CSSObject {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();
  const resolvedSize = theme.sizing[sizeToScaleKey[size]];
  // TODO: these colours all need to be revisited once we have a better handle on our tokens
  return {
    backgroundColor: theme.color.background.surface,

    borderColor: theme.border.color.field,
    borderRadius: theme.border.radius.full,
    borderStyle: 'solid',
    borderWidth: theme.border.width.large,

    boxSizing: 'border-box',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,

    height: resolvedSize,
    width: resolvedSize,

    transitionProperty: 'all',
    transitionTimingFunction: theme.animation.standard.easing,
    transitionDuration: `${theme.animation.standard.duration}ms`,
    '& > svg': {
      stroke: theme.color.foreground.neutralInverted,
    },

    'input:hover + &': {
      borderColor: theme.border.color.fieldAccent,
      '& > svg': {
        fill: theme.color.foreground.neutralInverted,
      },
    },

    'input:focus + &, input:active + &': {
      borderColor: theme.border.color.fieldAccent,
    },

    'input:focus + &': focusRingStyles,

    'input:checked + &': {
      backgroundColor: theme.color.background.primary,
      borderColor: theme.border.color.fieldAccent,
      '& > svg': {
        fill: theme.color.foreground.neutralInverted,
      },
    },

    'input:disabled + &': {
      backgroundColor: theme.border.color.field,
      borderColor: theme.border.color.fieldDisabled,
      cursor: 'default',
      '& > svg': {
        fill: theme.border.color.field,
        stroke: theme.border.color.field,
      },
    },

    'input:checked:disabled + &': {
      backgroundColor: theme.border.color.fieldDisabled,
      '& > svg': {
        fill: theme.color.background.muted,
        stroke: theme.color.background.muted,
      },
    },
  };
}
