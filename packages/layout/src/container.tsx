import { css } from '@emotion/css';
import type { BrighteTheme, DataAttributeMap } from '@spark-web/core';
import {
  Box,
  buildDataAttributes,
  forwardRefWithAs,
  useTheme,
} from '@spark-web/core';
import type { ReactNode } from 'react';

export type ContainerProps = {
  children: ReactNode;
  data?: DataAttributeMap;
  size?: keyof BrighteTheme['contentWidth'];
};

/** Provides a container that centers and constrains the maximum width of the content it wraps. */
export const Container = forwardRefWithAs<'div', ContainerProps>(
  ({ children, data, size = 'medium' }, ref) => {
    const { contentWidth } = useTheme();
    const maxWidth = contentWidth[size];

    return (
      <Box
        ref={ref}
        width="full"
        className={css({
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth,
        })}
        {...(data ? buildDataAttributes(data) : undefined)}
      >
        {children}
      </Box>
    );
  }
);
