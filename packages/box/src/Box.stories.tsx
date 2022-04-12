import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { BoxProps } from './Box';
import { Box } from './Box';

export default {
  title: 'Page & Layout / Box',
  component: Box,
} as ComponentMeta<typeof Box>;

const BoxStory: ComponentStory<typeof Box> = (
  args: Omit<BoxProps, 'className'>
) => (
  <Box {...args}>
    <Text>I'm some text inside a Box</Text>
  </Box>
);

export const Default = BoxStory.bind({});

Default.args = {
  padding: 'small',
  shadow: 'medium',
  borderRadius: 'medium',
} as BoxProps;
