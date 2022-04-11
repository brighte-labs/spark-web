import { css } from '@emotion/css';
import type { ReactNode } from 'react';

import { forwardRefWithAs } from './forward-ref-with-as';

export type VisuallyHiddenProps = {
  children?: ReactNode;
};

/**
 * Only display content to screen readers
 * @see https://a11yproject.com/posts/how-to-hide-content/
 */
export const VisuallyHidden = forwardRefWithAs<'span', VisuallyHiddenProps>(
  ({ as: Tag = 'span', ...props }, ref) => {
    return <Tag ref={ref} className={css(visuallyHiddenStyles)} {...props} />;
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
