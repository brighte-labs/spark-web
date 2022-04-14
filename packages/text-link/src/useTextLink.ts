import { useFocusRing } from '@spark-web/a11y';
import { useForegroundTone, useTextContext } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { resetElementStyles } from '@spark-web/utils';

type UseTextLinkProps = {
  isSubtle?: boolean;
};

export const TEXT_LINK_ERROR_MESSAGE =
  'TextLink components must be inside `Text`.';

export function useTextLink(tag: 'a' | 'span', props?: UseTextLinkProps) {
  const inText = useTextContext();
  const { isSubtle } = props ?? {};

  // Limit API surface area; expect style inheritance
  if (!inText) {
    throw new Error(TEXT_LINK_ERROR_MESSAGE);
  }

  const { color, typography } = useTheme();
  const { tone } = useTextContext() || { tone: 'neutral' };
  const textColor = useForegroundTone(tone);

  const focusRingStyles = useFocusRing();
  const resetStyles = resetElementStyles(tag);
  const linkStyles = isSubtle
    ? {
        color: textColor,
        cursor: 'pointer',
        textDecoration: 'underline',

        ':hover, :focus': {
          color: color.foreground.link,
        },

        ':focus': focusRingStyles,
      }
    : {
        color: color.foreground.link,
        cursor: 'pointer',
        fontWeight: typography.fontWeight.medium,

        ':hover, :focus': {
          textDecoration: 'underline',
        },

        ':focus': focusRingStyles,
      };

  const styles = [resetStyles, linkStyles];

  return styles;
}
