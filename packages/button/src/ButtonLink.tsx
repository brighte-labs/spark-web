import { Box } from '@spark-web/box';
import type { LinkComponentProps } from '@spark-web/link';
import { useLinkComponent } from '@spark-web/link';
import { useComposedRefs } from '@spark-web/utils';
import { forwardRef, useRef } from 'react';

import { resolveButtonChildren } from './resolveButtonChildren';
import type { CommonButtonProps } from './types';
import { useButtonStyles } from './useButtonStyles';

export type ButtonLinkProps = LinkComponentProps & CommonButtonProps;

/** The appearance of a `Button`, with the semantics of a link. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      data,
      href,
      id,
      prominence = 'high',
      size = 'medium',
      tone = 'primary',
      ...props
    },
    forwardedRef
  ) => {
    const LinkComponent = useLinkComponent(forwardedRef);

    const internalRef = useRef<HTMLAnchorElement>(null);
    const composedRefs = useComposedRefs(internalRef, forwardedRef);

    const iconOnly = Boolean(props.label);
    const buttonStyleProps = useButtonStyles({
      iconOnly,
      prominence,
      size,
      tone,
    });

    return (
      <Box
        {...buttonStyleProps}
        aria-label={props.label}
        as={LinkComponent}
        asElement="a"
        data={data}
        href={href}
        id={id}
        ref={composedRefs}
      >
        {resolveButtonChildren({
          ...props,
          isLoading: false,
          prominence,
          size,
          tone,
        })}
      </Box>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
