import type { BackgroundTone } from '@spark-web/a11y';
import type { IconProps } from '@spark-web/icon';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ButtonHTMLAttributes, ReactElement } from 'react';

import type { mapTokens } from './utils';

export type ButtonSize = keyof typeof mapTokens[keyof typeof mapTokens];
export type ButtonProminence = 'high' | 'low' | 'none';
export type ButtonTone = BackgroundTone;

type ChildrenWithText = {
  label?: never;
  children:
    | string
    // Strict tuple type to allow only 1 icon and 1 string
    | [ReactElement<IconProps>, string]
    | [string, ReactElement<IconProps>];
};
type IconOnly = {
  label: string;
  children: ReactElement<IconProps>;
};

export type ButtonChildrenProps = ChildrenWithText | IconOnly;

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type CommonButtonProps = {
  data?: DataAttributeMap;
  id?: string;
} & ButtonChildrenProps &
  ButtonStyleProps;

export type ButtonStyleProps = {
  /** Sets the visual prominence of the button. */
  prominence?: ButtonProminence;
  /** Sets the size of the button. */
  size?: ButtonSize;
  /** Sets the tone of the button. */
  tone?: ButtonTone;
};
