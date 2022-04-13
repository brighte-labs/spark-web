import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Placeholder } from '../../../docs/components/example-helpers';
import type { ColumnsProps } from './columns';
import { Columns } from './columns';

export default {
  title: 'Page & Layout / Columns',
  component: Columns,
} as ComponentMeta<typeof Columns>;

const ColumnsStory: ComponentStory<typeof Columns> = (
  args: Omit<ColumnsProps, 'className'>
) => <Columns {...args} />;

export const Default = ColumnsStory.bind({});

Default.args = {
  gap: 'large',
  children: (
    <>
      <Placeholder height={40} />
      <Placeholder height={40} />
      <Placeholder height={40} />
    </>
  ),
} as ColumnsProps;
