import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import type { BoxProps } from '@spark-web/box';
import { useTheme } from '@spark-web/theme';

export function useIconButtonStyles() {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ tone: 'neutral' });

  const buttonStyleProps: Partial<BoxProps> = {
    alignItems: 'center',
    borderRadius: 'full',
    cursor: 'pointer',
    display: 'inline-flex',
    gap: 'small',
    height: 'small',
    justifyContent: 'center',
    paddingX: 'xsmall',
    position: 'relative',
    width: 'small',
    className: css({
      transitionProperty:
        'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: `${theme.animation.standard.duration}ms`,

      // interactions styles
      '&:hover': {
        backgroundColor: theme.backgroundInteractions['neutralLowHover'],
      },
      '&:active': {
        backgroundColor: theme.backgroundInteractions['neutralLowActive'],
        transform: 'scale(0.94)',
      },
      ':focus': focusRingStyles,
    }),
  };

  return buttonStyleProps;
}
