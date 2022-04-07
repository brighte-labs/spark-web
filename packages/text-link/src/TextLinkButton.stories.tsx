import { Text } from '@spark-web/text';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextLinkButton, TextLinkButtonProps } from './TextLinkButton';

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
