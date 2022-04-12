import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { AlertProps } from './Alert';
import { Alert } from './Alert';

export default {
  title: 'Feedback & Overlays / Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const AlertStory: ComponentStory<typeof Alert> = (args: AlertProps) => (
  <Alert {...args}>Child text</Alert>
);

export const Info = AlertStory.bind({});
export const Critical = AlertStory.bind({});
export const Caution = AlertStory.bind({});
export const Positive = AlertStory.bind({});

Info.args = {
  tone: 'info',
  heading: 'Information',
} as AlertProps;

Caution.args = {
  tone: 'caution',
  heading: 'Caution',
} as AlertProps;

Critical.args = {
  tone: 'critical',
  heading: 'Critical',
} as AlertProps;

Positive.args = {
  tone: 'positive',
  heading: 'Positive',
} as AlertProps;
