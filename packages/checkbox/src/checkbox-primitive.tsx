import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { CheckIcon } from '@spark-web/icon';
import { useTheme } from '@spark-web/theme';
import { forwardRef } from 'react';

import type { CheckboxPrimitiveProps, CheckboxSize } from './types';

export const CheckboxPrimitive = forwardRef<
  HTMLInputElement,
  CheckboxPrimitiveProps
>(({ size = 'small', ...inputProps }, forwardedRef) => {
  const theme = useTheme();
  const checkboxStyles = useCheckbox(size);

  const responsiveStyles = theme.utils.responsiveStyles({
    mobile: { height: theme.typography.text.small.mobile.capHeight },
    tablet: { height: theme.typography.text.small.tablet.capHeight },
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      flexShrink={0}
      className={css(responsiveStyles)}
    >
      <Box
        {...inputProps}
        {...checkboxStyles}
        aria-checked={inputProps.checked}
        aria-disabled={inputProps.disabled}
        ref={forwardedRef}
        as="input"
        type="checkbox"
      />
      <CheckIcon size={sizeToScaleKey[size]} />
    </Box>
  );
});
CheckboxPrimitive.displayName = 'CheckboxPrimitive';

const sizeToScaleKey = {
  small: 'xxsmall',
  medium: 'xsmall',
} as const;

function useCheckbox(size: CheckboxSize) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ always: true });

  const outerSize = sizeToScaleKey[size];

  const transitionProperties = {
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    transitionTimingFunction: theme.animation.standard.easing,
    transitionDuration: `${theme.animation.standard.duration}ms`,
  };

  return {
    border: 'field',
    borderRadius: 'small',
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

      '& + svg': {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
      },

      '&:focus': focusRingStyles,

      '&:checked': {
        background: theme.color.background.primary,
        borderColor: theme.border.color.primaryHover,

        '+ svg': {
          opacity: 1,
          stroke: theme.color.foreground.neutralInverted,
        },
      },

      'label:hover &:not([disabled], &[aria-disabled=true]):checked': {
        // TODO: checkbox gets lighter on hover instead of darker like in the designs, will fix once tokens are revised
        background: theme.backgroundInteractions.primaryHover,
        border: theme.border.color.fieldAccent,
      },

      '&[disabled]:checked, &[aria-disabled=true]:checked': {
        // TODO: using a `border` color for background here as we don't have a token for it just yet
        background: theme.border.color.field,
        border: theme.border.color.accent,

        '+ svg': {
          stroke: theme.color.foreground.neutral,
        },
      },
      '&[disabled]:checked::before, &[aria-disabled=true]:checked::before': {
        background: theme.color.background.fieldAccent,
      },
    }),
  } as const;
}
