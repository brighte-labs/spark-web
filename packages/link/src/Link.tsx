import type { LinkComponentProps } from '@spark-web/core';
import { Box, forwardRefWithAs, useLinkComponent } from '@spark-web/core';

export type LinkProps = LinkComponentProps;

export const Link = forwardRefWithAs<'a', LinkProps>((props, ref) => {
  const LinkComponent = useLinkComponent(ref);

  return <Box as={LinkComponent} asElement="a" ref={ref} {...props} />;
});
