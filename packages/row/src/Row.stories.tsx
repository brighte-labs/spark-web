import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Placeholder } from '../../../docs/components/example-helpers';
import { Row, RowProps } from './Row';

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
