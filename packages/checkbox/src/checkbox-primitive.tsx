import type { CSSObject } from '@emotion/css';
import { css } from '@emotion/css';
import { useFocusRing, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { CheckIcon } from '@spark-web/icon';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { forwardRef } from 'react';

import type { CheckboxPrimitiveProps, CheckboxSize } from './types';

export const CheckboxPrimitive = forwardRef<
  HTMLInputElement,
  CheckboxPrimitiveProps
>(({ size = 'small', ...inputProps }, forwardedRef) => {
  return (
    /**
     * Text is being used here to add the `::before` and `::after` pseudo elements
     * so that we can align the checkbox with the label text
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
         * Zero-width space character, used to align checkbox with label text
         * @see https://codepen.io/adamwathan/pen/bGNxMpz
         */}
        &#8203;
        <VisuallyHidden
          as="input"
          aria-checked={inputProps.checked}
          ref={forwardedRef}
          type="checkbox"
          {...inputProps}
        />
        <Indicator size={size} />
      </Box>
    </Text>
  );
});
CheckboxPrimitive.displayName = 'CheckboxPrimitive';

const sizeToScaleKey = {
  small: 'xxsmall',
  medium: 'xsmall',
} as const;

function Indicator({ size }: { size: CheckboxSize }) {
  const indicatorStyles = useIndicatorStyles(size);

  return (
    <Box className={css(indicatorStyles)}>
      <CheckIcon />
    </Box>
  );
}

function useIndicatorStyles(size: CheckboxSize): CSSObject {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();
  const resolvedSize = theme.sizing[sizeToScaleKey[size]];
  // TODO: these colours all need to be revisited once we have a better handle on our tokens
  return {
    backgroundColor: theme.color.background.surface,

    borderColor: theme.border.color.field,
    borderRadius: theme.border.radius.small,
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
        stroke: theme.color.foreground.neutralInverted,
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
        stroke: theme.color.foreground.neutralInverted,
      },
    },

    'input:disabled + &': {
      backgroundColor: theme.border.color.field,
      borderColor: theme.border.color.fieldDisabled,
      cursor: 'default',
      '& > svg': {
        stroke: theme.border.color.field,
      },
    },

    'input:checked:disabled + &': {
      backgroundColor: theme.border.color.fieldDisabled,
      '& > svg': {
        stroke: theme.color.background.muted,
      },
    },
  };
}
