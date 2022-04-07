import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text, TextProps } from './Text';

export default {
  title: 'Typography / Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const LinkStory: ComponentStory<typeof Text> = (args: TextProps) => (
  <Text {...args} />
);

export const Default = LinkStory.bind({});

Default.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque rhoncus ex purus, nec rutrum lorem placerat vestibulum. Ut sit amet libero non tellus aliquam pretium nec ac dui. Vivamus erat nibh, placerat vitae nisi eu, aliquet auctor dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
};
