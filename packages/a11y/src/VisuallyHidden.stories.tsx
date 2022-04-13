import { ExclamationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { VisuallyHiddenProps } from './VisuallyHidden';
import { VisuallyHidden } from './VisuallyHidden';

export default {
  title: 'Accessibility / VisuallyHidden',
  component: VisuallyHidden,
} as ComponentMeta<typeof VisuallyHidden>;

const VisuallyHiddenStory: ComponentStory<typeof VisuallyHidden> = (
  args: VisuallyHiddenProps
) => (
  <Inline gap="xsmall" alignY="center">
    <ExclamationCircleIcon tone="critical" size="xsmall" />{' '}
    <Text weight="medium" tone="critical" baseline={false}>
      <VisuallyHidden {...args} />
      This action is not reversible
    </Text>
  </Inline>
);

export const Default = VisuallyHiddenStory.bind({});

Default.args = {
  children: 'Danger',
} as VisuallyHiddenProps;
