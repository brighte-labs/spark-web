import { Field } from '@spark-web/field';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextArea } from './text-area';

export default {
  title: 'Forms / TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const TextareaStory: ComponentStory<typeof TextArea> = () => (
  <Field label="Add some text" tone="neutral" message="You added text">
    <TextArea />
  </Field>
);
export const Default = TextareaStory.bind({});
