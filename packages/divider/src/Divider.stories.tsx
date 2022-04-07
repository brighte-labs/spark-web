import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Divider, DividerProps } from './Divider';

export default {
  title: 'Page & Layout / Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const DividerStory: ComponentStory<typeof Divider> = (args: DividerProps) => (
  <Divider {...args} />
);
export const Default = DividerStory.bind({});

Default.args = {
  width: 'standard',
} as DividerProps;
