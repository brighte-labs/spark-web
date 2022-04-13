import { Field } from '@spark-web/field';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { TextAreaProps } from './text-area';
import { TextArea } from './text-area';

export default {
  title: 'Forms / TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const TextareaStory: ComponentStory<typeof TextArea> = (
  args: TextAreaProps
) => (
  <Field label="Add some text" tone="neutral" message="You added text">
    <TextArea {...args} />
  </Field>
);

export const Default = TextareaStory.bind({});
