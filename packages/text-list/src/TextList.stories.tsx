import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { TextListProps } from './TextList';
import { TextList } from './TextList';

export default {
  title: 'Data Display / TextList',
  component: TextList,
} as ComponentMeta<typeof TextList>;

const TextListStory: ComponentStory<typeof TextList> = (
  args: TextListProps
) => (
  <TextList {...args}>
    <Text>Here's</Text>
    <Text>A list of</Text>
    <Text>Items!</Text>
  </TextList>
);

export const Default = TextListStory.bind({});

Default.args = {} as TextListProps;
