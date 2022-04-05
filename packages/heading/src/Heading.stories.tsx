import { Stack } from '@spark-web/stack';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Heading, HeadingProps } from './Heading';

export default {
  title: 'Typography / Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>;

const HeadingStory: ComponentStory<typeof Heading> = (args: HeadingProps) => (
  <Stack gap="large">
    <Heading {...args} />
  </Stack>
);

export const Default = HeadingStory.bind({});

Default.args = {
  children: 'Heading',
  level: '1',
} as HeadingProps;
