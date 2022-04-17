import type { UseInputProps } from '@spark-web/text-input';
import { useInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';

export function useTextAreaStyles({ disabled, invalid }: UseInputProps) {
  const theme = useTheme();
  const inputStyles = useInput({
    disabled,
    invalid,
  });

  return {
    ...inputStyles,

    // Text inputs have a fixed height, so we need to override it back to `auto`
    height: 'auto',
    minHeight: theme.sizing.medium,

    paddingTop: theme.spacing.small,
    paddingBottom: theme.spacing.small,
    resize: 'vertical',

    ':invalid': {
      color: theme.color.foreground.muted,
    },
  } as const;
}
