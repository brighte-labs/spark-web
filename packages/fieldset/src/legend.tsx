import { VisuallyHidden } from '@spark-web/a11y';
import { Heading } from '@spark-web/heading';
import { Text } from '@spark-web/text';
import type { ReactNode } from 'react';

export type LegendAppearance = 'label' | 'legend' | 'hidden';

type LegendProps = {
  appearance?: LegendAppearance;
  children: ReactNode;
};

export const Legend = ({ appearance = 'legend', children }: LegendProps) => {
  switch (appearance) {
    case 'hidden':
      return <VisuallyHidden as="legend">{children}</VisuallyHidden>;
    case 'label':
      return (
        <Text as="legend" weight="semibold">
          {children}
        </Text>
      );
    case 'legend':
      return (
        <Heading as="legend" level="3">
          {children}
        </Heading>
      );
    default:
      assertNever(appearance);
  }
};

function assertNever(condition: never): never {
  throw new Error(`Unexpected call to assertNever: '${condition}'`);
}
