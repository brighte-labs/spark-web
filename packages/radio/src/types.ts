import type { Tone } from '@spark-web/field';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type RadioSize = 'small' | 'medium';

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'value'
>;

export type RadioPrimitiveProps = {
  /** When true, the radio will be checked. */
  checked?: boolean;
  /** Allows setting of data attributes on the underlying element. */
  data?: DataAttributeMap;
  /** When true, the radio will be disabled. */
  disabled?: boolean;
  /** The size of the radio. */
  size?: RadioSize;
  /** The value of the radio. */
  value?: string;
} & InputProps;

export type RadioProps = {
  /** The radio label content. */
  children: ReactNode;
} & RadioPrimitiveProps;

export type RadioGroupProps<Value extends string> = {
  /** id(s) of the element(s) that describe the `Radio`. */
  'aria-describedby'?: string;

  /** `Radio` components. */
  children: ReactNode;

  /** When true, disables the group of nested radios. */
  disabled?: boolean;

  /** An identifier which must be unique in the whole document. */
  id?: string;

  /** Provide a message, informing the user about changes in state. */
  message?: string;

  /** Name for the group of `Radio` components. */
  name?: string;

  /** Function that is fired whenever a change event is triggered on a `Radio`. */
  onChange: (selectedValue: Value) => void;

  /** The size of the nested radios. */
  size?: RadioSize;

  /** Provide a tone to influence elements of the field, and its input. */
  tone?: Tone;

  /** The value of the nested radios. */
  value: Value;
};
