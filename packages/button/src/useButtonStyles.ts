import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import type { BoxProps } from '@spark-web/box';
import { useTheme } from '@spark-web/theme';

import type { ButtonProminence, ButtonSize, ButtonTone } from './types';
import { mapTokens, variants } from './utils';

type UseButtonStylesProps = {
  iconOnly: boolean;
  prominence: ButtonProminence;
  size: ButtonSize;
  tone: ButtonTone;
};

export function useButtonStyles({
  iconOnly,
  prominence,
  size,
  tone,
}: UseButtonStylesProps) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ tone });
  const variant = variants[prominence][tone];
  const isLarge = size === 'large';

  const transitionColours = {
    transitionProperty:
      'color, background-color, border-color, text-decoration-color',
    transitionTimingFunction: 'cubic-bezier(0.02, 1.505, 0.745, 1.235)',
    transitionDuration: `${theme.animation.standard.duration}ms`,
  };

  const buttonStyleProps: Partial<BoxProps> = {
    alignItems: 'center',
    background: variant?.background,
    border: variant?.border,
    borderWidth: variant?.borderWidth,
    borderRadius: isLarge ? 'medium' : 'small',
    cursor: 'pointer',
    display: 'inline-flex',
    gap: 'small',
    height: mapTokens.size[size],
    justifyContent: 'center',
    paddingX: iconOnly ? undefined : mapTokens.spacing[size],
    position: 'relative',
    width: iconOnly ? mapTokens.size[size] : undefined,
    // interactions styles
    className: css({
      ...transitionColours,

      '&:hover': {
        borderColor: variant?.borderHover
          ? theme.border.color[variant.borderHover]
          : undefined,
        backgroundColor: variant?.backgroundHover
          ? theme.backgroundInteractions[variant.backgroundHover]
          : undefined,

        // Style button text when hovering
        '> *': {
          ...transitionColours,
          color: variant?.textToneHover
            ? theme.color.foreground[variant.textToneHover]
            : undefined,
          stroke: variant?.textToneHover
            ? theme.color.foreground[variant.textToneHover]
            : undefined,
        },
      },
      '&:active': {
        borderColor: variant?.borderActive
          ? theme.border.color[variant.borderActive]
          : undefined,
        backgroundColor: variant?.backgroundActive
          ? theme.backgroundInteractions[variant?.backgroundActive]
          : undefined,
        transform: 'scale(0.98)',

        // Style button text when it's active
        '> *': {
          ...transitionColours,
          color: variant?.textToneActive
            ? theme.color.foreground[variant.textToneActive]
            : undefined,
          stroke: variant?.textToneActive
            ? theme.color.foreground[variant.textToneActive]
            : undefined,
        },
      },
      ':focus': focusRingStyles,
    }),
  };

  return buttonStyleProps;
}
