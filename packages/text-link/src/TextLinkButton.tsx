import { css } from '@emotion/css';
import { useComposedRefs } from '@spark-web/utils';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { buildDataAttributes } from '@spark-web/utils/internal';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { forwardRef, useCallback, useRef } from 'react';

import { useTextLink } from './useTextLink';

export type TextLinkButtonProps = {
  data?: DataAttributeMap;
} & HTMLAttributes<HTMLSpanElement>;

// NOTE: Rather than a native `button` element, we render a `span` with the ARIA
// role of "button" to avoid issues with text behaviour. Resolves:
// - alignment
// - truncating
// - wrapping

/** The appearance of `TextLink`, with the semantics of a `<button/>`. */
export const TextLinkButton = forwardRef<HTMLSpanElement, TextLinkButtonProps>(
  ({ data, ...consumerProps }, forwardedRef) => {
    const styles = useTextLink('span');

    const internalRef = useRef<HTMLSpanElement>(null);
    const ref = useComposedRefs(internalRef, forwardedRef);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          internalRef.current?.click();
        }
      },
      [internalRef]
    );

    return (
      <span
        role="button"
        ref={ref}
        className={css(styles)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...(data ? buildDataAttributes(data) : undefined)}
        {...consumerProps}
      />
    );
  }
);

TextLinkButton.displayName = 'TextLinkButton';
