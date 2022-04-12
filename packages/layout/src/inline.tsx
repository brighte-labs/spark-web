import type { BoxProps, ResponsiveProp } from '@spark-web/core';
import { Box, forwardRefWithAs } from '@spark-web/core';

import type { Align, AlignY } from './alignment';
import { alignToJustifyContent, alignYToAlignItems } from './alignment';

type ValidBoxProps = Omit<
  BoxProps,
  'display' | 'alignItems' | 'flexDirection' | 'justifyContent' | 'flexWrap'
>;

export type InlineProps = {
  /** Horizontally align items within the container. */
  align?: ResponsiveProp<Align>;
  /** Vertically align items within the container. */
  alignY?: ResponsiveProp<AlignY>;
} & ValidBoxProps;

export const Inline = forwardRefWithAs<'div', InlineProps>(
  ({ align = 'left', alignY = 'top', ...boxProps }, forwardedRef) => {
    const justifyContent = alignToJustifyContent(align);
    const alignItems = alignYToAlignItems(alignY);

    return (
      <Box
        ref={forwardedRef}
        // styles
        alignItems={alignItems}
        display="flex"
        justifyContent={justifyContent}
        flexWrap="wrap"
        minWidth={0} // fix flex overflow bug that prevents text truncation
        {...boxProps}
      />
    );
  }
);
