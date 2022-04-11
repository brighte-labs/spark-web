import { Box } from '@spark-web/core';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
import * as React from 'react';

export type ControlLabelProps = {
  children: React.ReactNode;
  control: React.ReactNode;
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

function Content({ children }: { children: React.ReactNode }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text>{children}</Text>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
