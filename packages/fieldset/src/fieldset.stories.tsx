import { Field } from '@spark-web/field';
import { Select } from '@spark-web/select';
import { Stack } from '@spark-web/stack';
import { TextInput } from '@spark-web/text-input';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Fieldset } from './fieldset';

export default {
  title: 'Forms / Fieldset',
  component: Fieldset,
} as ComponentMeta<typeof Fieldset>;

const FieldsetStory: ComponentStory<typeof Fieldset> = () => (
  <Fieldset legend="Billing address">
    <Stack gap="small">
      <Field label="Street">
        <TextInput />
      </Field>
      <Field label="City">
        <TextInput />
      </Field>
      <Field label="State">
        <Select
          onChange={() => {}}
          options={[
            { label: 'New South Wales', value: 'NSW' },
            { label: 'Victoria', value: 'VIC' },
            { label: 'Queensland', value: 'QLD' },
            { label: 'South Australia', value: 'SA' },
            { label: 'Western Australia', value: 'WA' },
            { label: 'Tasmania', value: 'TAS' },
            { label: 'Northern Territory', value: 'NT' },
            { label: 'Australian Capital Territory', value: 'ACT' },
          ]}
        />
      </Field>
      <Field label="Postcode">
        <TextInput />
      </Field>
    </Stack>
  </Fieldset>
);

export const Default = FieldsetStory.bind({});
