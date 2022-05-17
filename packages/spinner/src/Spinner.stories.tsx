import type { Story } from '@ladle/react';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';

import type { SpinnerProps } from './Spinner';
import { Spinner } from './Spinner';

const meta = {
  title: 'Feedback & Overlays / Spinner',
  component: Spinner,
};
export default meta;

const SpinnerStory: Story<SpinnerProps> = args => {
  return (
    <Stack align="left" gap="xxlarge">
      <Inline gap="xxlarge">
        <Spinner {...args} />
      </Inline>
    </Stack>
  );
};

export const Default = SpinnerStory.bind({});
export const Critical = SpinnerStory.bind({});
export const Caution = SpinnerStory.bind({});
export const Positive = SpinnerStory.bind({});
export const Primary = SpinnerStory.bind({});

Default.args = {} as SpinnerProps;

Caution.args = {
  tone: 'caution',
} as SpinnerProps;

Critical.args = {
  tone: 'critical',
} as SpinnerProps;

Positive.args = {
  tone: 'positive',
} as SpinnerProps;

Primary.args = {
  tone: 'primary',
} as SpinnerProps;
