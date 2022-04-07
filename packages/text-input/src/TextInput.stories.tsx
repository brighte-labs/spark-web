import { Field } from '@spark-web/field';
import { InformationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextInput, TextInputProps } from './TextInput';

export default {
  title: 'Forms / TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const TextInputStory: ComponentStory<typeof TextInput> = (
  args: TextInputProps
) => (
  <Stack gap="large">
    <Inline gap="xsmall" alignY="center">
      <InformationCircleIcon tone="info" size="xsmall" />
      <Text weight="medium" tone="info" baseline={false}>
        {`Must be used inside of a <Field/>`}
      </Text>
    </Inline>
    <Field label="Text input">
      <TextInput {...args} />
    </Field>
  </Stack>
);
export const Default = TextInputStory.bind({});

Default.args = {
  displayName: 'Display name',
} as TextInputProps;
