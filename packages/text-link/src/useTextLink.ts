import { useForegroundTone, useTextContext } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { resetElementStyles } from '@spark-web/utils-spark';

export const TEXT_LINK_ERROR_MESSAGE =
  'TextLink components must be inside `Text`.';

export function useTextLink(tag: 'a' | 'span') {
  const textContext = useTextContext();

  // Limit API surface area; expect style inheritance
  if (!textContext) {
    throw new Error(TEXT_LINK_ERROR_MESSAGE);
  }

  const { typography } = useTheme();
  const textColor = useForegroundTone(textContext.tone);

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
