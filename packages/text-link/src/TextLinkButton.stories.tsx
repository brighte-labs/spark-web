import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { TextLinkButtonProps } from './Text-Link-Button';
import { TextLinkButton } from './Text-Link-Button';

export default {
  title: 'Forms / Buttons / TextLinkButton',
  component: TextLinkButton,
} as ComponentMeta<typeof TextLinkButton>;

const TextLinkButtonStory: ComponentStory<typeof TextLinkButton> = (
  args: TextLinkButtonProps
) => (
  <Text>
    <TextLinkButton {...args} />
  </Text>
);
export const Default = TextLinkButtonStory.bind({});

Default.args = {
  children: 'Text link button',
  onClick: () => window.alert('Clicked!'),
} as TextLinkButtonProps;
