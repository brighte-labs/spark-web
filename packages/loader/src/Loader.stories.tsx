import { Loader, LoaderProps } from './Loader';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Feedback & Overlays / Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const LoaderStory: ComponentStory<typeof Loader> = (args: LoaderProps) => (
  <Stack align="left" gap="xxlarge">
    <Inline gap="xxlarge">
      <Loader {...args} />
    </Inline>
  </Stack>
);

export const Default = LoaderStory.bind({});
export const Critical = LoaderStory.bind({});
export const Caution = LoaderStory.bind({});
export const Positive = LoaderStory.bind({});
export const Primary = LoaderStory.bind({});

Default.args = {} as LoaderProps;

Caution.args = {
  tone: 'caution',
} as LoaderProps;

Critical.args = {
  tone: 'critical',
} as LoaderProps;

Positive.args = {
  tone: 'positive',
} as LoaderProps;

Primary.args = {
  tone: 'primary',
} as LoaderProps;
