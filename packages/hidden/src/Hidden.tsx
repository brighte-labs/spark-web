import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useHeadingContext } from '@spark-web/heading';
import { useTextContext } from '@spark-web/text';
import type { ResponsiveRangeProps } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import { forwardRefWithAs } from '@spark-web/utils/ts';
import type { ReactNode } from 'react';

export type HiddenProps = {
  children: ReactNode;
  data?: DataAttributeMap;
  inline?: boolean;
  on?: 'screen' | 'print';
} & ResponsiveRangeProps;

/** Conditionally display content for different screen sizes. */
export const Hidden = forwardRefWithAs<'div', HiddenProps>(
  ({ above, as, below, children, data, inline: inlineProp, on }, ref) => {
    const { utils } = useTheme();
    const [hiddenOnMobile, hiddenOnTablet, hiddenOnDesktop, hiddenOnWide] =
      utils.responsiveRange({ above, below });

    const hiddenOnScreen = on === 'screen';
    const conditionalStyles = on
      ? { [`@media ${on}`]: { display: 'none !important' } }
      : null;

    const inText = Boolean(useTextContext());
    const inHeading = Boolean(useHeadingContext());
    const inline = inlineProp ?? (inText || inHeading);
    const display = inline ? 'inline' : 'block';

    return (
      <Box
        as={as || (inline ? 'span' : 'div')}
        ref={ref}
        className={css([
          hiddenOnScreen
            ? null
            : utils.resolveResponsiveProps({
                display: utils.optimizeResponsiveArray([
                  hiddenOnMobile ? 'none' : display,
                  hiddenOnTablet ? 'none' : display,
                  hiddenOnDesktop ? 'none' : display,
                  hiddenOnWide ? 'none' : display,
                ]),
              }),
          conditionalStyles,
        ])}
        {...(data ? buildDataAttributes(data) : undefined)}
      >
        {children}
      </Box>
    );
  }
);
