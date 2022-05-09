import { Field } from '@spark-web/field';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Combobox } from './combobox';

export default {
  title: 'Forms / Combobox',
  component: Combobox,
} as ComponentMeta<typeof Combobox>;

type Item = { label: string; value: string };
const items: Item[] = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
];

const ComboboxStory: ComponentStory<typeof Combobox> = () => {
  const [value, setValue] = useState<Item | null>(null);

  return (
    <Field label="What's your favourite ice cream flavour?">
      <Combobox
        placeholder="Select a flavour"
        items={items}
        onChange={value => setValue(value)}
        value={value}
      />
    </Field>
  );
};

export const Default = ComboboxStory.bind({});
