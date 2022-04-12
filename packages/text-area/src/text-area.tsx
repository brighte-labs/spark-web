import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import { useTextContext } from '@spark-web/text';
import { useDefaultTextProps } from '@spark-web/text/src/defaultTextProps';
import type { UseTextProps } from '@spark-web/text/src/useText';
import { useText } from '@spark-web/text/src/useText';
import type { DataAttributeMap } from '@spark-web/utils-spark';
import { buildDataAttributes } from '@spark-web/utils-spark';
import { forwardRef } from 'react';

import { useTextAreaStyles } from './use-text-area';

export type TextAreaProps = Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'defaultValue' | 'name' | 'onBlur' | 'onChange' | 'required' | 'value'
> &
  Partial<Pick<UseTextProps, 'size' | 'weight'>> & {
    data?: DataAttributeMap;
    placeholder?: string;
  };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      size: sizeProp,
      weight: weightProp,
    },
    forwardedRef
  ) => {
    const { disabled, invalid, ...a11yProps } = useFieldContext();
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
    const textContext = useTextContext();
    const { size, weight, tone } = useDefaultTextProps({
      size: sizeProp ?? textContext?.size,
      weight: weightProp ?? textContext?.weight,
    });
    const textStyles = useText({ size, weight, tone });
    const textAreaStyles = useTextAreaStyles({ disabled, invalid });
    const styles = [textAreaStyles, textStyles];

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
