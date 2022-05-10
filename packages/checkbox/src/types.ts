import type { Tone } from '@spark-web/field';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'small' | 'medium';

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'value'
>;

export type CheckboxPrimitiveProps = {
  /** When true, the checkbox will be checked. */
  checked?: boolean;
  /** Sets data attributes on the component. */
  data?: DataAttributeMap;
  /** When true, the checkbox will be disabled. */
  disabled?: boolean;
  /** The size of the checkbox. */
  size?: CheckboxSize;
  /** The value of the checkbox. */
  value?: string;
} & InputProps;

export type CheckboxProps = {
  /** Provide a message, informing the user about changes in state. */
  message?: string;
  /** Provide a tone to influence elements of the field, and its input. */
  tone?: Tone;
  /** The checkbox label content. */
  children: ReactNode;
} & CheckboxPrimitiveProps;
