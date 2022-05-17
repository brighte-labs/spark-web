import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import { rgba } from 'polished';
import { useEffect } from 'react';

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
    /**
     * This removes the nested input outline visibility since
     * the wrapper will be outlined, but still visibly focusable
     * to windows high contrast mode users.
     *
     * @see https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors
     */
    outline: '2px solid transparent',
    outlineOffset: '2px',
    ...(always
      ? styles
      : {
          [`[${focusVisibleDataAttribute}] &`]: styles,
        }),
  };
};
