import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { Divider } from '@spark-web/divider';
import type { ResponsiveProp } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { forwardRefWithAs } from '@spark-web/utils/ts';
import type { ReactElement } from 'react';
import { Children, Fragment } from 'react';

import type { Align, AlignY } from './alignment';
import { alignToJustifyContent, alignYToAlignItems } from './alignment';

type ValidBoxProps = Omit<
  BoxProps,
  'display' | 'alignItems' | 'flexDirection' | 'justifyContent' | 'flexWrap'
>;

export type RowProps = {
  /** Horizontally align items within the container. */
  align?: ResponsiveProp<Align>;
  /** Vertically align items within the container. */
  alignY?: ResponsiveProp<AlignY>;
  /** Allows setting of data attributes on the underlying element. */
  data?: DataAttributeMap;
  /** Place a divider between each element. */
  dividers?: boolean;
} & ValidBoxProps;

export const Row = forwardRefWithAs<'div', RowProps>(
  (
    { align = 'left', alignY = 'stretch', children, data, dividers, ...props },
    forwardedRef
  ) => {
    const justifyContent = alignToJustifyContent(align);
    const alignItems = alignYToAlignItems(alignY);
    const rootProps = {
      ref: forwardedRef,
      display: 'flex',
      alignItems,
      justifyContent,
      ...props,
    } as const;

    // bail early w/o dividers to avoid unnecessary map
    if (!dividers) {
      return (
        <Box data={data} {...rootProps}>
          {children}
        </Box>
      );
    }

    // map over children to insert dividers
    // remove falsy values before mapping, keeps the index in sync
    const childArray = Children.toArray(children) as ReactElement[];
    return (
      <Box data={data} {...rootProps}>
        {childArray.map((child, idx) => (
          <Fragment key={child.key || idx}>
            {dividers && idx ? <Divider vertical /> : null}
            {child}
          </Fragment>
        ))}
      </Box>
    );
  }
);
