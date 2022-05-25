import { Box } from '@spark-web/box';
import type { TextProps } from '@spark-web/text';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

export type ControlLabelProps = {
  children: ContentProps['children'];
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

type RawContent = {
  children: string | number;
} & Omit<TextProps, 'children' | 'align' | 'inline' | 'overflowStrategy'>;

type NodeContent = {
  children: Omit<ReactNode, 'string' | 'number'>;
};

export type ContentProps = RawContent | NodeContent;

export function Content({ children, ...textProps }: ContentProps) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text {...textProps}>{children}</Text>;
  }

  return <Fragment>{children}</Fragment>;
}
