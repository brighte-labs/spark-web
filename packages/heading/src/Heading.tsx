import { css } from '@emotion/css';
import type { BoxProps } from '@spark-web/core';
import { Box, forwardRefWithAs } from '@spark-web/core';
import { useOverflowStrategy } from '@spark-web/text';
import type { ReactNode } from 'react';

import { HeadingContext } from './context';
import type { UseHeadingProps } from './useHeading';
import { useHeading } from './useHeading';

const levelToDefaultElement = {
  '1': 'h1',
  '2': 'h2',
  '3': 'h3',
  '4': 'h4',
} as const;

export type HeadingProps = UseHeadingProps & {
  /** The text content. */
  children?: ReactNode;
  /** An identifier which must be unique in the whole document. */
  id?: BoxProps['id'];
  /** Truncate text to a single line. */
  truncate?: boolean;
};

export const Heading = forwardRefWithAs<'h1', HeadingProps>(
  ({ align, as, children, id, level, truncate, ...props }, ref) => {
    const overflowStyles = useOverflowStrategy(
      truncate ? 'truncate' : undefined
    );
    const styles = useHeading({ align, level });
    const content = overflowStyles ? (
      <span id={id} className={css(overflowStyles)}>
        {children}
      </span>
    ) : (
      children
    );

    return (
      <HeadingContext.Provider value>
        <Box
          as={as ?? levelToDefaultElement[level]}
          ref={ref}
          id={id}
          className={css(styles)}
          {...props}
        >
          {content}
        </Box>
      </HeadingContext.Provider>
    );
  }
);
