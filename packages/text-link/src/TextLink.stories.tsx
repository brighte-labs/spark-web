import { Text } from '@spark-web/text';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextLink, TextLinkProps } from './TextLink';

export default {
  title: 'Navigation / TextLink',
  component: TextLink,
} as ComponentMeta<typeof TextLink>;

const TextLinkStory: ComponentStory<typeof TextLink> = (
  args: TextLinkProps
) => (
  <Text>
    {`Here's some text with a `}
    <TextLink {...args} />
  </Text>
);
export const Default = TextLinkStory.bind({});

Default.args = {
  href: 'https://brighte.com.au',
  children: 'link!',
} as TextLinkProps;
