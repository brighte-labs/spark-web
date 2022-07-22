import { Box } from '@spark-web/box';
import { Text } from '@spark-web/text';
import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

import type {
  ButtonChildrenProps,
  ButtonProminence,
  ButtonSize,
  ButtonTone,
} from './types';
import { mapTokens, variants } from './utils';

type ResolveButtonChildren = ButtonChildrenProps & {
  isLoading: boolean;
  prominence: ButtonProminence;
  size: ButtonSize;
  tone: ButtonTone;
};

export const resolveButtonChildren = ({
  children,
  isLoading,
  prominence,
  size,
  tone,
}: ResolveButtonChildren): JSX.Element[] => {
  const variant = variants[prominence][tone];

  return Children.map(children, child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <HiddenWhenLoading isLoading={isLoading}>
          <Text
            as="span"
            baseline={false}
            overflowStrategy="nowrap"
            weight="semibold"
            size={mapTokens.fontSize[size]}
            tone={variant?.textTone}
          >
            {child}
          </Text>
        </HiddenWhenLoading>
      );
    }

    if (isValidElement(child)) {
      return (
        <HiddenWhenLoading isLoading={isLoading}>
          {cloneElement(child, {
            // Dismiss buttons need to be `xxsmall`
            // For everything else, we force them to be `xsmall`
            size: child.props.size === 'xxsmall' ? child.props.size : 'xsmall',

            // If the button is low prominence with a decorative tone we want to force
            // the tone to be the same as the button
            // We also don't want users to override the tone of the icon inside of the button
            tone: variant?.textTone,
          })}
        </HiddenWhenLoading>
      );
    }

    return null;
  });
};

function HiddenWhenLoading({
  children,
  isLoading,
}: {
  children: ReactNode;
  isLoading: boolean;
}) {
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      opacity={isLoading ? 0 : undefined}
    >
      {children}
    </Box>
  );
}
