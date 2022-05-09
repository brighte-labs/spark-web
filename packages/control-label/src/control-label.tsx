import { Box } from '@spark-web/box';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

export type ControlLabelProps = {
  children: ReactNode;
  control: ReactNode;
  disabled?: boolean;
  htmlFor?: string;
  size: 'small' | 'medium';
};

export function ControlLabel({
  children,
  control,
  disabled = false,
  htmlFor,
  size = 'small',
}: ControlLabelProps): JSX.Element {
  return (
    <Box
      as="label"
      alignItems="start"
      display="inline-flex"
      gap={size}
      htmlFor={htmlFor}
      userSelect="none"
    >
      {control}
      <DefaultTextPropsProvider tone={disabled ? 'disabled' : 'neutral'}>
        <Content>{children}</Content>
      </DefaultTextPropsProvider>
    </Box>
  );
}

function Content({ children }: { children: ReactNode }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text>{children}</Text>;
  }

  return <Fragment>{children}</Fragment>;
}
