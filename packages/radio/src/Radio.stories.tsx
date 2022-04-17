import { Field } from '@spark-web/field';
import { InformationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio } from './radio';

export default {
  title: 'Forms / Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

const RadioStory: ComponentStory<typeof Radio> = () => (
  <Stack gap="large">
    <Inline gap="xsmall" alignY="center">
      <InformationCircleIcon tone="info" size="xsmall" />
      <Text weight="medium" tone="info" baseline={false}>
        {`Must be used inside of a <Field/>`}
      </Text>
    </Inline>
    <Field label="Radio input">
      <Radio name="radio-story" value="one">
        One
      </Radio>
      <Radio name="radio-story" value="two">
        two
      </Radio>
      <Radio name="radio-story" value="three">
        three
      </Radio>
    </Field>
  </Stack>
);
export const Default = RadioStory.bind({});
