import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { ButtonProps } from './Button';
import { Button } from './Button';

export default {
  title: 'Forms / Buttons / Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const ButtonStory: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args} />
);
export const Default = ButtonStory.bind({});
export const Tone = ButtonStory.bind({});
export const Disabled = ButtonStory.bind({});

Default.args = {
  children: 'Click me!',
  tone: 'primary',
  onClick: () => window.alert('Clicked!'),
} as ButtonProps;

Tone.args = {
  children: 'Click me!',
  tone: 'critical',
  onClick: () => window.alert('Clicked!'),
} as ButtonProps;

Disabled.args = {
  children: 'Click me!',
  disabled: true,
  onClick: () => window.alert('Clicked!'),
} as ButtonProps;
