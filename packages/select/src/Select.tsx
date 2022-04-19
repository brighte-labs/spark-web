import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import { ChevronDownIcon } from '@spark-web/icon';
import type { UseInputProps } from '@spark-web/text-input';
import { useInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils-spark';
import { buildDataAttributes } from '@spark-web/utils-spark';
import * as React from 'react';

type Option = {
  disabled?: boolean;
  label: string;
  value: string | number;
};
type Group = { options: Array<Option>; label: string };
export type OptionsOrGroups = Array<Option | Group>;

export type SelectProps = Pick<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'defaultValue' | 'name' | 'onBlur' | 'onChange' | 'required' | 'value'
> & {
  data?: DataAttributeMap;
  options: OptionsOrGroups;
  placeholder?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      data,
      defaultValue,
      name,
      onBlur,
      onChange,
      options: optionsOrGroups,
      placeholder,
      required,
      value,
    },
    forwardedRef
  ) => {
    const { disabled, invalid, ...a11yProps } = useFieldContext();
    const styles = useSelectStyles({ disabled, invalid });

    const mapOptions = React.useCallback(
      (opt: Option) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ),
      []
    );

    return (
      <Box position="relative">
        <Box
          {...a11yProps}
          {...(data ? buildDataAttributes(data) : null)}
          as="select"
          defaultValue={defaultValue ?? placeholder ? '' : undefined}
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={forwardedRef}
          required={required}
          value={value}
          // Styles
          background={disabled ? 'inputDisabled' : 'input'}
          border={invalid ? 'critical' : 'field'}
          borderRadius="small"
          paddingX="medium"
          height="medium"
          width="full"
          className={css(styles)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {optionsOrGroups.map(optionOrGroup => {
            if ('options' in optionOrGroup) {
              return (
                <optgroup key={optionOrGroup.label} label={optionOrGroup.label}>
                  {optionOrGroup.options.map(option => mapOptions(option))}
                </optgroup>
              );
            }
            return mapOptions(optionOrGroup);
          })}
        </Box>
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          display="flex"
          alignItems="center"
          padding="medium"
          className={css({ pointerEvents: 'none' })}
        >
          <ChevronDownIcon size="xxsmall" tone="placeholder" />
        </Box>
      </Box>
    );
  }
);

Select.displayName = 'Select';

function useSelectStyles({ disabled, invalid }: UseInputProps) {
  const theme = useTheme();
  const inputStyles = useInput({
    disabled,
    invalid,
  });
  return {
    ...inputStyles,
    overflow: 'hidden', // fix for Safari to prevent unwanted scrolling of parent container to occur
    textOverflow: 'ellipsis',

    // Prevent text going underneath the chevron icon
    paddingRight:
      theme.sizing.xxsmall + // size of chevron icon
      theme.spacing.medium * 2, // paddingX value

    ':invalid': {
      color: theme.color.foreground.muted,
    },
  };
}
