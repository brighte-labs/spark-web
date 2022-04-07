import { Field } from '@spark-web/field';
import { InformationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox } from './checkbox';
import { CheckboxProps } from './types';

export default {
  title: 'Forms / Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const CheckboxStory: ComponentStory<typeof Checkbox> = (
  args: CheckboxProps
) => (
  <Stack gap="large">
    <Inline gap="xsmall" alignY="center">
      <InformationCircleIcon tone="info" size="xsmall" />{' '}
      <Text weight="medium" tone="info" baseline={false}>
        {`Must be used inside of a <Field/>`}
      </Text>
    </Inline>
    <Field label="Checkbox input">
      <Checkbox {...args}>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </Checkbox>
    </Field>
  </Stack>
);

export const Default = CheckboxStory.bind({});

Default.args = {} as CheckboxProps;
