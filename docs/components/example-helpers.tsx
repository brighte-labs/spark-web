import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Text, useText } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import * as React from 'react';

// Code
// ------------------------------

const CodeElement = ({
  inline,
  ...props
}: {
  children: React.ReactNode;
  inline?: boolean;
}) => {
  const textStyles = useText({
    baseline: false,
    tone: inline ? 'accent' : 'neutral',
    size: 'small',
    weight: 'medium',
  });

  return (
    <Box
      as={inline ? 'span' : 'code'}
      className={css([
        textStyles,
        { fontFamily: 'Monaco, Consolas, monospace' },
      ])}
      {...props}
    />
  );
};

// Code block

export const CodeBlock = ({ children }: { children: string }) => {
  return (
    <Box
      as="pre"
      background="neutral"
      padding="xxlarge"
      borderRadius="large"
      overflow="auto"
    >
      <CodeElement>{children}</CodeElement>
    </Box>
  );
};

// Inline code

export const InlineCode = ({ children }: { children: string }) => {
  return (
    <Box
      as="code"
      background="accentMuted"
      paddingX="xsmall"
      borderRadius="small"
    >
      <CodeElement inline>{children}</CodeElement>
    </Box>
  );
};

// Placeholder element

type PlaceholderProps = {
  height?: string | number;
  width?: string | number;
  label?: React.ReactNode;
  shape?: 'rectangle' | 'round';
};

export const Placeholder = ({
  label,
  width,
  height,
  shape = 'rectangle',
}: PlaceholderProps) => {
  const theme = useTheme();
  const minDimensions = theme.sizing.small;

  const svgStyles = css({
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
  });
  const lineStyles = css({
    stroke: theme.border.color.standard,
    strokeWidth: 2,
  });

  return (
    <Box
      alignItems="center"
      background="surfaceMuted"
      border="standard"
      borderRadius={shape === 'round' ? 'full' : undefined}
      borderWidth="large"
      display="flex"
      justifyContent="center"
      overflow="hidden"
      position="relative"
      className={css({ minHeight: minDimensions, minWidth: minDimensions })}
      style={{ width, height }}
    >
      {label ? (
        <Box paddingX="xsmall" paddingY="xxsmall">
          <Text
            align="center"
            baseline={false}
            size="small"
            tone="muted"
            weight="strong"
          >
            {label}
          </Text>
        </Box>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={svgStyles}>
          <line className={lineStyles} x1={0} y1={0} x2="100%" y2="100%" />
          <line className={lineStyles} x1="100%" y1={0} x2={0} y2="100%" />
        </svg>
      )}
    </Box>
  );
};
