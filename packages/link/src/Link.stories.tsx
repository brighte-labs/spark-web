import { Inline } from '@spark-web/inline';
import { Text } from '@spark-web/text';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Link, LinkProps } from './Link';

export default {
  title: 'Navigation / Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const LinkStory: ComponentStory<typeof Link> = (args: LinkProps) => (
  <Inline>
    <Link {...args} />
  </Inline>
);
export const Default = LinkStory.bind({});

Default.args = {
  href: 'https://brighte.com.au',
  children: <Text>I'm a link!</Text>,
} as LinkProps;
