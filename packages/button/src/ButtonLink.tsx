import { Box } from '@spark-web/box';
import type { LinkComponentProps } from '@spark-web/link';
import { useLinkComponent } from '@spark-web/link';
import { buildDataAttributes } from '@spark-web/utils/internal';
import { forwardRefWithAs } from '@spark-web/utils/ts';

import { resolveButtonChildren } from './resolveButtonChildren';
import type { CommonButtonProps } from './types';
import { useButtonStyles } from './useButtonStyles';

export type ButtonLinkProps = LinkComponentProps & CommonButtonProps;

/** The appearance of a `Button`, with the semantics of a link. */
export const ButtonLink = forwardRefWithAs<'a', ButtonLinkProps>(
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
    ref
  ) => {
    const LinkComponent = useLinkComponent(ref);
    const iconOnly = Boolean(props.label);
    const buttonStyleProps = useButtonStyles({
      iconOnly,
      prominence,
      size,
      tone,
    });

    return (
      <Box
        aria-label={props.label}
        as={LinkComponent}
        asElement="a"
        id={id}
        href={href}
        ref={ref}
        {...buttonStyleProps}
        {...(data ? buildDataAttributes(data) : undefined)}
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
