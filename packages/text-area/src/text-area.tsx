import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import type { DataAttributeMap } from '@spark-web/utils-spark';
import { buildDataAttributes } from '@spark-web/utils-spark';
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
          className={css(textAreaStyles)}
        />
      </Box>
    );
  }
);
TextArea.displayName = 'TextArea';
