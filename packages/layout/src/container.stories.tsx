import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Placeholder } from '../../../docs/components/example-helpers';
import type { ContainerProps } from './container';
import { Container } from './container';

export default {
  title: 'Page & Layout / Container',
  component: Container,
} as ComponentMeta<typeof Container>;

const ContainerStory: ComponentStory<typeof Container> = (
  args: ContainerProps
) => <Container {...args} />;

export const Default = ContainerStory.bind({});

Default.args = {
  size: 'large',
  children: <Placeholder height={64} />,
} as ContainerProps;
