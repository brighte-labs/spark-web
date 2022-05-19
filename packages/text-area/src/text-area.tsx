import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import { InputContainer } from '@spark-web/text-input';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { useTextAreaStyles } from './use-text-area';

export type TextAreaProps = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'defaultValue'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'placeholder'
  | 'required'
  | 'value'
> & {
  data?: DataAttributeMap;
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
    const textAreaStyles = useTextAreaStyles({ disabled, invalid });

    return (
      <InputContainer>
        <Box
          {...a11yProps}
          {...consumerProps}
          as="textarea"
          aria-invalid={invalid || undefined}
          data={data}
          ref={forwardedRef}
          rows={3}
          // Styles
          background={disabled ? 'inputDisabled' : 'input'}
          border={invalid ? 'critical' : 'field'}
          borderRadius="small"
          paddingX="medium"
          height="medium"
          width="full"
          className={css(textAreaStyles)}
        />
      </InputContainer>
    );
  }
);
TextArea.displayName = 'TextArea';
