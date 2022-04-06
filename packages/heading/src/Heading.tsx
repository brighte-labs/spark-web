import { css } from '@emotion/css';
import type { BoxProps } from '@spark-web/box';
import { Box } from '@spark-web/box';
import { useOverflowStrategy } from '@spark-web/text';
import { forwardRefWithAs } from '@spark-web/utils-ts';
import React, { ReactNode } from 'react';

import { HeadingContext } from './context';
import { useHeading, UseHeadingProps } from './useHeading';

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
