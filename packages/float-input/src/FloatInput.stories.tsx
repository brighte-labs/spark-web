import { Field } from '@spark-web/field';
import { InformationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { FloatInputProps } from './FloatInput';
import { FloatInput } from './FloatInput';

export default {
  title: 'Forms / FloatInput',
  component: FloatInput,
} as ComponentMeta<typeof FloatInput>;

const TextInputStory: ComponentStory<typeof FloatInput> = (
  args: FloatInputProps
) => {
  return (
    <Stack gap="large">
      <Inline gap="xsmall" alignY="center">
        <InformationCircleIcon tone="info" size="xsmall" />
        <Text weight="semibold" tone="info" baseline={false}>
          {`Must be used inside of a <Field/>`}
        </Text>
      </Inline>
      <Field label="Float input">
        <FloatInput {...args} />
      </Field>
    </Stack>
  );
};
export const Default = TextInputStory.bind({});

Default.args = {} as FloatInputProps;
