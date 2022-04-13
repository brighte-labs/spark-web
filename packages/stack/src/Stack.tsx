import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { Divider } from '@spark-web/divider';
import type { ResponsiveProp } from '@spark-web/theme';
import { forwardRefWithAs } from '@spark-web/utils-ts';
import type { ReactElement } from 'react';
import { Children, Fragment } from 'react';

import type { Align } from './alignment';
import { alignToAlignItems } from './alignment';

type ValidBoxProps = Omit<
  BoxProps,
  | 'display'
  | 'className'
  | 'alignItems'
  | 'flexDirection'
  | 'justifyContent'
  | 'flexWrap'
>;

export type StackProps = {
  /** Horizontally align items within the stack. */
  align?: ResponsiveProp<Align>;
  /** Place a divider between each element. */
  dividers?: boolean;
} & ValidBoxProps;

export const Stack = forwardRefWithAs<'div', StackProps>(
  ({ align = 'stretch', children, dividers, ...props }, forwardedRef) => {
    const alignItems = alignToAlignItems(align);
    const rootProps = {
      ref: forwardedRef,
      alignItems,
      display: 'flex',
      flexDirection: 'column',
      ...props,
    } as const;

    // bail early w/o dividers to avoid unnecessary map
    if (!dividers) {
      return <Box {...rootProps}>{children}</Box>;
    }

    // map over children to insert dividers
    // remove falsy values before mapping, keeps the index in sync
    const childArray = Children.toArray(children) as ReactElement[];
    return (
      <Box {...rootProps}>
        {childArray.map((child, idx) => (
          <Fragment key={child.key || idx}>
            {dividers && idx ? <Divider /> : null}
            {child}
          </Fragment>
        ))}
      </Box>
    );
  }
);
