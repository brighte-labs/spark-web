import { css } from '@emotion/css';
import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import { InputContainer } from '@spark-web/text-input';
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
> &
  Pick<BoxProps, 'data'>;

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
    const [{ disabled, invalid }, a11yProps] = useFieldContext();
    const [boxProps, textAreaStyles] = useTextAreaStyles({ disabled, invalid });

    return (
      <InputContainer>
        <Box
          {...boxProps}
          {...a11yProps}
          as="textarea"
          className={css(textAreaStyles)}
          data={data}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          ref={forwardedRef}
          required={required}
          rows={3}
          value={value}
        />
      </InputContainer>
    );
  }
);
TextArea.displayName = 'TextArea';
