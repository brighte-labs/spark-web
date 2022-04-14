import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import type { LinkComponentProps } from '@spark-web/core';
import { useLinkComponent } from '@spark-web/core';
import type { DataAttributeMap } from '@spark-web/utils';
import { buildDataAttributes, forwardRefWithAs } from '@spark-web/utils';

import { useTextLink } from './useTextLink';

export type TextLinkProps = {
  data?: DataAttributeMap;
  isSubtle?: boolean;
} & LinkComponentProps;

/**
 * Text links are used as navigational elements. They may appear on their own,
 * within a sentence or paragraph, or directly following content.
 *
 * @note If you are **only** providing "onClick" use `TextLinkButton` instead.
 */
export const TextLink = forwardRefWithAs<'a', TextLinkProps>(
  // NOTE: we need `forwardRefWithAs` for TS, but we don't want consumers changing the underlying element
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ as: UNUSED_AS_PROP, data, isSubtle, ...consumerProps }, ref) => {
    const LinkComponent = useLinkComponent(ref);
    const styles = useTextLink('a', { isSubtle });

    return (
      <Box
        as={LinkComponent}
        asElement="a"
        ref={ref}
        className={css(styles)}
        {...(data ? buildDataAttributes(data) : undefined)}
        {...consumerProps}
      />
    );
  }
);
