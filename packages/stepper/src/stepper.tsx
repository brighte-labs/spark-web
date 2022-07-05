import { Box } from '@spark-web/box';
import { Stack } from '@spark-web/stack';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ReactElement } from 'react';

import { resolveStepperChildren } from './resolve-stepper-children';
import type { StepProps } from './step';

export type StepperProps = {
  children: ReactElement<StepProps>[];
  data?: DataAttributeMap;
  label: string;
};

export function Stepper({ children, data, label }: StepperProps) {
  return (
    <Box as="nav" aria-label={label} data={data}>
      <Stack as="ol" gap="small" position="relative">
        {resolveStepperChildren({ children })}
      </Stack>
    </Box>
  );
}

Stepper.displayName = 'Stepper';
