import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import type { FieldContextType } from '@spark-web/field';
import { useFieldContext } from '@spark-web/field';
import { useText } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils-spark';
import { buildDataAttributes } from '@spark-web/utils-spark';
import type { AllHTMLAttributes } from 'react';
import { forwardRef } from 'react';

const validTypes = {
  text: 'text',
  password: 'password',
  email: 'email',
  search: 'search',
  number: 'number',
  tel: 'tel',
  url: 'url',
};

type NativeInputProps = Pick<
  AllHTMLAttributes<HTMLInputElement>,
  'onBlur' | 'onFocus' | 'onChange' | 'placeholder' | 'value'
>;

export type TextInputProps = {
  /** Map of data attributes. */
  data?: DataAttributeMap;
  /**
   * How an input behaves varies considerably depending on the value of its type
   * attribute. If this attribute is not specified, the default type "text".
   */
  type?: keyof typeof validTypes;
} & NativeInputProps;

/** Organize and emphasize information quickly and effectively in a list of text elements. */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ data, ...consumerProps }, forwardedRef) => {
    const { disabled, invalid, ...a11yProps } = useFieldContext();
    const inputStyles = useInput({ disabled, invalid });

    return (
      <Box
        as="input"
        disabled={disabled}
        ref={forwardedRef}
        // styles
        background={disabled ? 'inputDisabled' : 'input'}
        border={invalid ? 'critical' : 'field'}
        borderRadius="small"
        height="medium"
        paddingX="medium"
        className={css(inputStyles)}
        {...(data ? buildDataAttributes(data) : null)}
        {...a11yProps}
        {...consumerProps}
      />
    );
  }
);

// Styled components
// ------------------------------

export type UseInputProps = Pick<FieldContextType, 'disabled' | 'invalid'>;

export function useInput({ disabled, invalid }: UseInputProps) {
  const theme = useTheme();
  const focusRingStyles = useFocusRing({ always: true });
  const textStyles = useText({
    baseline: false,
    tone: disabled ? 'disabled' : 'neutral',
    size: 'standard',
    weight: 'regular',
  });

  const [typographyStyles, responsiveStyles] = textStyles;

  return {
    ...typographyStyles,
    ...responsiveStyles,
    ':enabled': {
      '&:hover': {
        borderColor: theme.border.color.fieldHover,
      },
      '&:focus': {
        ...focusRingStyles,
        borderColor: theme.border.color.fieldAccent,
      },
    },
  };
}
