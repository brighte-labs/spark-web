import { css } from '@emotion/css';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import type { FieldState } from '@spark-web/field';
import { useFieldContext } from '@spark-web/field';
import { useOverflowStrategy, useText } from '@spark-web/text';
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
    const [boxProps, inputStyles] = useInputStyles({
      disabled,
      invalid,
      startAdornment: Boolean(startAdornment),
      endAdornment: Boolean(endAdornment),
    });

    return (
      <InputContainer
        display="inline-flex"
        alignItems="center"
        startAdornment={startAdornment}
        endAdornment={endAdornment}
      >
        <Box
          {...boxProps}
          {...consumerProps}
          {...a11yProps}
          as="input"
          className={css(inputStyles)}
          data={data}
          disabled={disabled}
          ref={forwardedRef}
        />
      </InputContainer>
    );
  }
);

TextInput.displayName = 'TextInput';

export type UseInputStylesProps = FieldState & {
  startAdornment?: boolean;
  endAdornment?: boolean;
};

/**
 * Returns a tuple where the first item is an object of props to spread onto the
 * underlying Box component that our inputs are created with, and the second
 * item is a CSS object to be passed to Emotion's `css` function
 **/
export const useInputStyles = ({
  disabled,
  startAdornment,
  endAdornment,
}: UseInputStylesProps) => {
  const theme = useTheme();
  const overflowStyles = useOverflowStrategy('truncate');
  const focusRingStyles = useFocusRing({ always: true });
  const textStyles = useText({
    baseline: false,
    tone: disabled ? 'disabled' : 'neutral',
    size: 'standard',
    weight: 'regular',
  });

  const [typographyStyles, responsiveStyles] = textStyles;

  return [
    {
      flex: 1,
      position: 'relative',
      height: 'medium',
      paddingLeft: startAdornment ? 'none' : 'medium',
      paddingRight: endAdornment ? 'none' : 'medium',
      shadow: 'small',
      width: 'full',
    },
    {
      ...typographyStyles,
      ...responsiveStyles,
      ...overflowStyles,
      ':enabled': {
        ':focus + [data-focus-indicator]': {
          borderColor: theme.border.color.fieldAccent,
          ...focusRingStyles,
        },
      },
      ':focus': { outline: 'none' },
      ':invalid': { color: theme.color.foreground.muted },
    },
  ] as const;
};
