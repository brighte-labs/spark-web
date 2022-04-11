import { css, CSSObject } from '@emotion/css';
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

    return (
      <Box position="relative">
        <Box
          {...a11yProps}
          {...(data ? buildDataAttributes(data) : null)}
          as="textarea"
          defaultValue={defaultValue ?? placeholder ? '' : undefined}
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={forwardedRef}
          required={required}
          value={value}
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

function useTextAreaStyles({ disabled, invalid }: UseInputProps): CSSObject {
  const theme = useTheme();
  const inputStyles = useInput({
    disabled,
    invalid,
  });

  return {
    ...inputStyles,
    overflow: 'hidden', // fix for Safari to prevent unwanted scrolling of parent container to occur
    textOverflow: 'ellipsis',
    resize: 'vertical',
    minHeight: theme.sizing.medium,

    // Prevent text going underneath the chevron icon
    paddingRight:
      theme.sizing.xxsmall + // size of chevron icon
      theme.spacing.medium * 2, // paddingX value

    ':invalid': {
      color: theme.color.foreground.muted,
    },
  };
}
