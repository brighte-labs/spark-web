import type { ComponentMeta, ComponentStory } from '@storybook/react';

import type { StepProps } from './step';
import { Step } from './step';
import { Stepper } from './stepper';

export default {
  title: 'Navigation / Stepper',
  component: Stepper,
} as ComponentMeta<typeof Stepper>;

const steps: Array<{ heading: string; status?: StepProps['status'] }> = [
  { heading: 'Product details', status: 'complete' },
  { heading: 'Contact details', status: 'complete' },
  { heading: 'Confirm your eligibility', status: 'waiting' },
  { heading: 'Household details', status: 'declined' },
  { heading: 'Payment details' },
];

const StepperStory: ComponentStory<typeof Stepper> = () => (
  <Stepper label="Navigation">
    {steps.map(({ heading, status }) => (
      <Step key={heading} heading={heading} status={status} />
    ))}
  </Stepper>
);
export const Default = StepperStory.bind({});
