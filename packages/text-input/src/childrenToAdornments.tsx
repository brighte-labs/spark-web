import type { ReactElement } from 'react';
import { Children, isValidElement } from 'react';

import type { InputAdornmentProps } from './InputAdornment';
// NOTE: `null | undefined` allow consumers to conditionally render adornments
export type AdornmentChild =
  | ReactElement<InputAdornmentProps>
  | null
  | undefined;
export type AdornmentsAsChildren =
  | AdornmentChild
  | [AdornmentChild, AdornmentChild];

/**
 * Map children for placement within the `TextInput` flex container. Ensures that
 * placeholders are provided for unused placements.
 */
export const childrenToAdornments = (
  children?: AdornmentsAsChildren
): {
  startAdornment: ReactElement<InputAdornmentProps> | null;
  endAdornment: ReactElement<InputAdornmentProps> | null;
} => {
  let startAdornment: AdornmentChild | null = null;
  let endAdornment: AdornmentChild | null = null;
  if (!children) {
    return { startAdornment, endAdornment };
  }
  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.props.placement === 'end') {
        endAdornment = child;
      }
      if (child.props.placement === 'start') {
        startAdornment = child;
      }
    }
  });
  return { startAdornment, endAdornment };
};
