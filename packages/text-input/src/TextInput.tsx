import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import type { FieldState } from '@spark-web/field';
import { useFieldContext } from '@spark-web/field';
import { useText } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import type { AdornmentsAsChildren } from './childrenToAdornments';
import { childrenToAdornments } from './childrenToAdornments';
import { InputContainer } from './InputContainer';

type ValidTypes =
  | 'text'
  | 'password'
  | 'email'
  | 'search'
  | 'number'
  | 'tel'
  | 'url';
type ValidModes =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search';

type NativeInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'placeholder'
  | 'value'
  | 'required'
>;

export type TextInputProps = {
  /** Map of data attributes. */
  data?: DataAttributeMap;
  /**
   * How an input behaves varies considerably depending on the value of its type
   * attribute. If this attribute is not specified, the default type "text".
   */
  type?: ValidTypes;
  inputMode?: ValidModes;
  /**
   * Adorn the input with ornamental element(s) to aid user input, or
   * interactive element(s) to augment user input. Each child **must** be
   * wrapped with the `InputAdornment` component to ensure proper layout,
   * otherwise it will not be rendered.
   */
  children?: AdornmentsAsChildren;
} & NativeInputProps;

/** Organize and emphasize information quickly and effectively in a list of text elements. */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ children, data, ...consumerProps }, forwardedRef) => {
    const [{ disabled, invalid }, a11yProps] = useFieldContext();
    const { startAdornment, endAdornment } = childrenToAdornments(children);

    return (
      <InputContainer
        display="inline-flex"
        alignItems="center"
        startAdornment={startAdornment}
        endAdornment={endAdornment}
      >
        <Box
          {...consumerProps}
          {...a11yProps}
          as="input"
          ref={forwardedRef}
          data={data}
          disabled={disabled}
          position="relative"
          // Styles
          flex={1}
          height="medium"
          paddingX="medium"
          paddingLeft={startAdornment ? 'none' : 'medium'}
          paddingRight={endAdornment ? 'none' : 'medium'}
          className={css(useInput({ disabled, invalid }))}
        />
      </InputContainer>
    );
  }
);

TextInput.displayName = 'TextInput';

export type UseInputProps = FieldState;

export const useInput = ({ disabled }: UseInputProps) => {
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
    ':focus': { outline: 'none' },
    ':enabled': {
      ':focus + [data-focus-indicator]': {
        borderColor: theme.border.color.fieldAccent,
        ...focusRingStyles,
      },
    },
  } as const;
};
