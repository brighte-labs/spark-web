import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import type { UseInputProps } from '@spark-web/text-input';
import { useInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils-spark';
import { buildDataAttributes } from '@spark-web/utils-spark';
import * as React from 'react';

export type TextAreaProps = Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'defaultValue' | 'name' | 'onBlur' | 'onChange' | 'required' | 'value'
> & {
  data?: DataAttributeMap;
  placeholder?: string;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      data,
      defaultValue,
      name,
      onBlur,
      onChange,
      placeholder,
      required,
      value,
    },
    forwardedRef
  ) => {
    const { disabled, invalid, ...a11yProps } = useFieldContext();
    const styles = useTextAreaStyles({ disabled, invalid });
    const consumerProps = {
      value,
      defaultValue,
      disabled,
      name,
      onBlur,
      onChange,
      placeholder,
      required,
    };
    return (
      <Box position="relative">
        <Box
          {...a11yProps}
          {...consumerProps}
          {...(data ? buildDataAttributes(data) : null)}
          as="textarea"
          ref={forwardedRef}
          rows={3}
          // Styles
          background={disabled ? 'inputDisabled' : 'input'}
          border={invalid ? 'critical' : 'field'}
          borderRadius="small"
          paddingX="medium"
          height="medium"
          width="full"
          className={css(styles)}
        />
      </Box>
    );
  }
);

TextArea.displayName = 'TextArea';

function useTextAreaStyles({ disabled, invalid }: UseInputProps) {
  const theme = useTheme();
  const inputStyles = useInput({
    disabled,
    invalid,
  });

  return {
    ...inputStyles,

    // Text inputs have a fixed height, so we need to override it back to `auto`
    height: 'auto',
    minHeight: inputStyles.height,

    paddingTop: theme.spacing.small,
    paddingBottom: theme.spacing.small,
    resize: 'vertical',

    ':invalid': {
      color: theme.color.foreground.muted,
    },
  } as const;
}
