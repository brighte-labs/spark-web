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
    marginTop: 'small',
    paddingX: 'xsmall',
    position: 'relative',
    width: 'small',
    // interactions styles
    className: css({
      '&:hover': {
        backgroundColor: theme.backgroundInteractions['neutralLowHover'],
      },
      '&:active': {
        backgroundColor: theme.backgroundInteractions['neutralLowActive'],
        transform: 'scale(0.98)',
      },
      ':focus': focusRingStyles,
    }),
  };

  return buttonStyleProps;
}
