import { rgba } from 'polished';
import { useEffect } from 'react';

import type { BrighteTheme } from '../theme/make-theme';
import { useTheme } from '../theme/theme-context';

const focusVisibleDataAttribute = 'data-brighte-focus-visible';

const showFocusRings = () =>
  document.body.setAttribute(focusVisibleDataAttribute, 'true');

const hideFocusRings = () =>
  document.body.removeAttribute(focusVisibleDataAttribute);

// Toggle state on user interaction
// Safari is basically the only browser where `:focus-visible` is still not supported
// https://caniuse.com/css-focus-visible

export const useFocusVisible = ({ enabled = true } = {}) => {
  useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', showFocusRings);
      window.addEventListener('mousemove', hideFocusRings);

      return () => {
        window.removeEventListener('keydown', showFocusRings);
        window.removeEventListener('mousemove', hideFocusRings);
      };
    }
  }, [enabled]);
};

export type BackgroundTone = keyof Pick<
  BrighteTheme['color']['background'],
  // Decorative tones
  | 'primary'
  | 'secondary'
  // Semantic tones
  | 'caution'
  | 'critical'
  | 'info'
  | 'neutral'
  | 'positive'
>;

type FocusRingProps = {
  /**
   * When true, always display the focus ring, even from mouse
   * interaction—useful for form elements.
   **/
  always?: boolean;
  /**
   * The tone of the focusable element
   **/
  tone?: BackgroundTone;
};

export const useFocusRing = ({
  always = false,
  tone = 'primary',
}: FocusRingProps = {}) => {
  const theme = useTheme();
  const baseRingColor =
    tone === 'neutral'
      ? theme.color.background.primary
      : theme.color.background[tone];
  const styles = {
    boxShadow: `0 0 0 ${theme.border.width.large}px ${rgba(
      baseRingColor,
      0.3
    )}`,
  };

  return {
    outline: 0,
    ...(always
      ? styles
      : {
          [`[${focusVisibleDataAttribute}] &`]: styles,
        }),
  };
};
