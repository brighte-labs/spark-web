import { useForegroundTone, useTextContext } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { resetElementStyles } from '@spark-web/utils-spark';

export const TEXT_LINK_ERROR_MESSAGE =
  'TextLink components must be inside `Text`.';

export function useTextLink(tag: 'a' | 'span') {
  const inText = useTextContext();

  // Limit API surface area; expect style inheritance
  if (!inText) {
    throw new Error(TEXT_LINK_ERROR_MESSAGE);
  }

  const { typography } = useTheme();
  const { tone } = useTextContext() || { tone: 'temporary-dark' };
  const textColor = useForegroundTone(tone);

  const resetStyles = resetElementStyles(tag);
  const linkStyles = {
        color: textColor,
        cursor: 'pointer',
        textDecoration: 'underline',
        fontWeight: typography.fontWeight.medium,
      };

  const styles = [resetStyles, linkStyles];

  return styles;
}
