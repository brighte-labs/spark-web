import { Box } from '@spark-web/box';
import { LinkComponentProps, useLinkComponent } from '@spark-web/core';
import { forwardRefWithAs } from '@spark-web/utils-ts';

export type LinkProps = LinkComponentProps;

export const Link = forwardRefWithAs<'a', LinkProps>((props, ref) => {
  const LinkComponent = useLinkComponent(ref);

  return <Box as={LinkComponent} asElement="a" ref={ref} {...props} />;
});
