import { Box } from '@spark-web/box';
import type { LinkComponentProps } from '@spark-web/core';
import { useLinkComponent } from '@spark-web/core';
import { forwardRefWithAs } from '@spark-web/utils-ts';

export type LinkProps = LinkComponentProps;

export const Link = forwardRefWithAs<'a', LinkProps>((props, ref) => {
  const LinkComponent = useLinkComponent(ref);

  return <Box as={LinkComponent} asElement="a" ref={ref} {...props} />;
});
