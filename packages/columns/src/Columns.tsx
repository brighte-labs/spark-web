import { css } from '@emotion/css';
import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import type {
  BrighteTheme,
  ResponsiveProp,
  ResponsiveRangeProps,
} from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import { forwardRefWithAs } from '@spark-web/utils-ts';
import type { ReactNode } from 'react';
import { Children } from 'react';

import type { AlignY } from './alignment';
import { alignYToAlignItems } from './alignment';

type Gap = ResponsiveProp<keyof Omit<BrighteTheme['spacing'], 'none'>>;
type ValidBoxProps = Omit<
  BoxProps,
  | 'display'
  | 'alignItems'
  | 'gap'
  | 'flexDirection'
  | 'justifyContent'
  | 'flexWrap'
>;

export type ColumnsProps = {
  /** Vertically align items within the container. */
  alignY?: ResponsiveProp<AlignY>;
  /** Elements representing each column. */
  children: ReactNode;
  /** At which breakpoint, if any, should the columns collapse. */
  collapseBelow?: ResponsiveRangeProps['below'];
  /** The size of the gap between each column. */
  gap?: Gap;
  /** Define the relative width of each column. By default each column is the same width. */
  template?: number[];
} & ValidBoxProps;

export const Columns = forwardRefWithAs<'div', ColumnsProps>(
  (
    { alignY = 'top', collapseBelow, gap, template, ...props },
    forwardedRef
  ) => {
    const { spacing, utils } = useTheme();
    const alignItems = alignYToAlignItems(alignY);
    const count = Children.count(props.children);
    const gridTemplateColumns = template
      ? template.map(c => `${c}fr`).join(' ')
      : `repeat(${count}, 1fr)`;

    const [
      collapseOnMobile,
      collapseOnTablet,
      collapseOnDesktop,
      collapseOnWide,
    ] = utils.responsiveRange({ below: collapseBelow });

    return (
      <Box
        ref={forwardedRef}
        className={css(
          utils.resolveResponsiveProps({
            alignItems,
            display: 'grid',
            gap: utils.mapResponsiveScale(gap, spacing),
            gridTemplateColumns: collapseBelow
              ? utils.optimizeResponsiveArray([
                  collapseOnMobile ? null : gridTemplateColumns,
                  collapseOnTablet ? null : gridTemplateColumns,
                  collapseOnDesktop ? null : gridTemplateColumns,
                  collapseOnWide ? null : gridTemplateColumns,
                ])
              : gridTemplateColumns,

            // fix flex overflow bug that prevents text truncation
            '> *': { minWidth: 0 },
          })
        )}
        {...props}
      />
    );
  }
);
