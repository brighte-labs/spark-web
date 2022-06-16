import type { UseInputStylesProps } from '@spark-web/text-input';
import { useInputStyles } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';

export function useTextAreaStyles(props: UseInputStylesProps) {
  const theme = useTheme();
  const [boxProps, inputStyles] = useInputStyles(props);

  return [
    boxProps,
    {
      ...inputStyles,
      // Text inputs have a fixed height, so we need to override it back to `auto`
      height: 'auto',
      minHeight: theme.sizing.medium,
      paddingTop: theme.spacing.small,
      paddingBottom: theme.spacing.small,
      resize: 'vertical',
    },
  ] as const;
}
