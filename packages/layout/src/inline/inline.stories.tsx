import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Placeholder } from '../../../docs/components/example-helpers';
import type { InlineProps } from './inline';
import { Inline } from './inline';

export default {
  title: 'Page & Layout / Inline',
  component: Inline,
} as ComponentMeta<typeof Inline>;

const InlineStory: ComponentStory<typeof Inline> = (
  args: Omit<InlineProps, 'className'>
) => <Inline {...args} />;
export const Default = InlineStory.bind({});

Default.args = {
  gap: 'large',
  children: (
    <>
      <Placeholder width={128} />
      <Placeholder width={32} />
      <Placeholder width={64} />
    </>
  ),
} as InlineProps;
