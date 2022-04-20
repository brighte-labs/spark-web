import { Box } from '@spark-web/box';
import { forwardRefWithAs } from '@spark-web/utils-ts';

import type { LinkComponentProps } from './linkContext';
import { useLinkComponent } from './linkContext';

export type LinkProps = LinkComponentProps;

export const Link = forwardRefWithAs<'a', LinkProps>((props, ref) => {
  const LinkComponent = useLinkComponent(ref);

  return <Box as={LinkComponent} asElement="a" ref={ref} {...props} />;
});
