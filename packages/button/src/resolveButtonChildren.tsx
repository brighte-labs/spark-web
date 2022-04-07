import { Text } from '@spark-web/text';
import { Children, isValidElement, cloneElement } from 'react';

import type {
  ButtonChildrenProps,
  ButtonProminence,
  ButtonSize,
  ButtonTone,
} from './types';
import { mapTokens, variants } from './utils';

type ResolveButtonChildren = ButtonChildrenProps & {
  prominence: ButtonProminence;
  size: ButtonSize;
  tone: ButtonTone;
};

export const resolveButtonChildren = ({
  children,
  prominence,
  size,
  tone,
}: ResolveButtonChildren): JSX.Element[] => {
  const variant = variants[prominence][tone];

  return Children.map(children, child => {
    if (typeof child === 'string') {
      return (
        <Text
          as="span"
          baseline={false}
          overflowStrategy="nowrap"
          weight="strong"
          size={mapTokens.fontSize[size]}
          tone={variant?.textTone}
        >
          {child}
        </Text>
      );
    }

    if (isValidElement(child)) {
      return cloneElement(child, {
        // Dismiss buttons need to be `xxsmall`
        // For everything else, we force them to be `xsmall`
        size: child.props.size === 'xxsmall' ? child.props.size : 'xsmall',

        // If the button is low prominence with a decorative tone we want to force
        // the tone to be the same as the button
        // We also don't want users to override the tone of the icon inside of the button
        tone: variant?.textTone,
      });
    }

    return null;
  });
};
