import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Placeholder } from '../../../docs/components/example-helpers';
import type { RowProps } from './row';
import { Row } from './row';

export default {
  title: 'Page & Layout / Row',
  component: Row,
} as ComponentMeta<typeof Row>;

const RowStory: ComponentStory<typeof Row> = (
  args: Omit<RowProps, 'className'>
) => <Row {...args} />;

export const Default = RowStory.bind({});

Default.args = {
  gap: 'large',
  children: (
    <>
      <Placeholder height={40} />
      <Placeholder height={40} />
      <Placeholder height={40} />
    </>
  ),
} as RowProps;
