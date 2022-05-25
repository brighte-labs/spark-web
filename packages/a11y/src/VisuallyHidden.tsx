import { css } from '@emotion/css';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import { forwardRefWithAs } from '@spark-web/utils/ts';
import type { ReactNode } from 'react';

export type VisuallyHiddenProps = {
  children?: ReactNode;
  /** Map of data attributes. */
  data?: DataAttributeMap;
};

/**
 * Only display content to screen readers
 * @see https://a11yproject.com/posts/how-to-hide-content/
 */
export const VisuallyHidden = forwardRefWithAs<'span', VisuallyHiddenProps>(
  ({ as: Tag = 'span', data, ...props }, forwardedRef) => {
    return (
      <Tag
        {...props}
        {...(data ? buildDataAttributes(data) : undefined)}
        ref={forwardedRef}
        className={css(visuallyHiddenStyles)}
      />
    );
  }
);

export const visuallyHiddenStyles = {
  border: 0,
  clip: 'rect(0, 0, 0, 0)',
  height: 1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
} as const;
