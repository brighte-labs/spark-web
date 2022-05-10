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
  { label: 'Jake', value: 'jake' },
  { label: 'Finn', value: 'finn' },
  { label: 'BMO', value: 'bmo' },
];

const ComboboxStory: ComponentStory<typeof Combobox> = () => {
  const [value, setValue] = useState<Item | null>(null);

  return (
    <Field label="What's your favourite Adventure Time character?">
      <Combobox
        placeholder="Select a character"
        items={items}
        onChange={value => setValue(value)}
        value={value}
      />
    </Field>
  );
};

export const Default = ComboboxStory.bind({});
