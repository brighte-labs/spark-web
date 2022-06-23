import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useFieldContext } from '@spark-web/field';
import { ChevronDownIcon } from '@spark-web/icon';
import type { UseInputStylesProps } from '@spark-web/text-input';
import { InputContainer, useInputStyles } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { SelectHTMLAttributes } from 'react';
import { forwardRef, useCallback } from 'react';

export type Option = {
  /** Whether or not the option is disabled. */
  disabled?: boolean;
  /** Label for the option. */
  label: string;
  /** Value of the option. */
  value: string | number;
};
export type Group = {
  /** List of options for the group. */
  options: Array<Option>;
  /** Label for the group. */
  label: string;
};
export type OptionsOrGroups = Array<Option | Group>;
export type NativeSelectProps = Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  'defaultValue' | 'name' | 'onBlur' | 'onChange' | 'required' | 'value'
>;
export type SelectProps = NativeSelectProps & {
  /** Allows setting of data attributes on the underlying element. */
  data?: DataAttributeMap;
  /** The values that can be selected by the input. */
  options: OptionsOrGroups;
  /** Placeholder text for when the input does not have an initial value. */
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
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
    const [{ disabled, invalid }, a11yProps] = useFieldContext();
    const [boxProps, inputStyles] = useSelectStyles({
      disabled,
      invalid,
    });

    const mapOptions = useCallback(
      (opt: Option) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ),
      []
    );

    return (
      <InputContainer>
        <Indicator />
        <Box
          {...boxProps}
          {...a11yProps}
          as="select"
          className={css(inputStyles)}
          data={data}
          defaultValue={defaultValue ?? placeholder ? '' : undefined}
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={forwardedRef}
          required={required}
          value={value}
          width="full"
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
      </InputContainer>
    );
  }
);

Select.displayName = 'Select';

const Indicator = () => {
  return (
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
  );
};

function useSelectStyles(props: UseInputStylesProps) {
  const [boxProps, inputStyles] = useInputStyles(props);
  const theme = useTheme();
  return [
    boxProps,
    {
      ...inputStyles,
      // Prevent text going underneath the chevron icon
      paddingRight:
        theme.sizing.xxsmall + // size of chevron icon
        theme.spacing.medium * 2, // paddingX value
    },
  ] as const;
}
