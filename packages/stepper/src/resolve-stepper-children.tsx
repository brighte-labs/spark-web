import { Children, isValidElement } from 'react';

import type { StepperProps } from './stepper';

type ResolveButtonChildren = Pick<StepperProps, 'children'>;

export function resolveStepperChildren({ children }: ResolveButtonChildren) {
  return Children.map(children, (child: any) => {
    if (!child.type.__isStep__) {
      throw new Error('Only Step elements can be direct children of Stepper.');
    }
    if (isValidElement(child)) {
      return child;
    }
  });
}
