import { Field } from '@spark-web/field';
import { InformationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { PasswordInputProps } from './PasswordInput';
import { PasswordInput } from './PasswordInput';

export default {
  title: 'Forms / TextInput',
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

const PasswordInputStory: ComponentStory<typeof PasswordInput> = (
  args: PasswordInputProps
) => (
  <Stack gap="large">
    <Inline gap="xsmall" alignY="center">
      <InformationCircleIcon tone="info" size="xsmall" />
      <Text weight="semibold" tone="info" baseline={false}>
        {`Must be used inside of a <Field/>`}
      </Text>
    </Inline>
    <Field label="Password input">
      <PasswordInput {...args} />
    </Field>
  </Stack>
);
export const Default = PasswordInputStory.bind({});

Default.args = {
  displayName: 'Display name',
} as PasswordInputProps;
