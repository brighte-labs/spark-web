import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import {
  CheckCircleIcon,
  ClockIcon,
  createIcon,
  XCircleIcon,
} from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';

export type StepProps = {
  children?: ReactNode;
  status?: keyof typeof fromStatus;
  heading: string;
  secondaryHeading?: string;
};

const DEFAULT_STATUS = 'disabled';

export function Step({
  children,
  heading,
  secondaryHeading,
  status = DEFAULT_STATUS,
}: StepProps) {
  const theme = useTheme();
  const Icon = fromStatus[status].icon;
  const [boxProps, stepStyles] = useStepStyles(status);

  return (
    <Box
      as="li"
      display="flex"
      alignItems="start"
      gap="medium"
      position="relative"
      paddingBottom="medium"
      className={css({ minHeight: theme.sizing.medium })}
    >
      <Box {...boxProps} className={css(stepStyles)}>
        <Icon size="xsmall" tone={fromStatus[status].iconTone} />
      </Box>
      <Stack flex={1} gap="medium">
        <Text weight="semibold" tone={fromStatus[status].textTone}>
          {heading}
        </Text>
        {secondaryHeading && (
          <Text
            size="small"
            weight="semibold"
            tone={fromStatus[status].textTone}
          >
            {secondaryHeading}
          </Text>
        )}
        <DefaultTextPropsProvider
          size="small"
          tone={status === 'disabled' ? 'muted' : 'neutral'}
        >
          {typeof children === 'string' || typeof children === 'number' ? (
            <Text>{children}</Text>
          ) : (
            children
          )}
        </DefaultTextPropsProvider>
      </Stack>
    </Box>
  );
}

Step.__isStep__ = true;

export const CircleIcon = createIcon(
  <circle cx={12} cy={12} r={9} />,
  'CircleIcon'
);

const fromStatus = {
  disabled: {
    border: 'fieldDisabled',
    icon: CircleIcon,
    iconTone: 'disabled',
    textTone: 'muted',
  },
  active: {
    border: 'fieldDisabled',
    icon: CircleIcon,
    iconTone: 'primary',
    textTone: 'neutral',
  },
  waiting: {
    border: 'fieldAccent',
    icon: ClockIcon,
    iconTone: 'primary',
    textTone: 'neutral',
  },
  complete: {
    border: 'fieldAccent',
    icon: CheckCircleIcon,
    iconTone: 'primary',
    textTone: 'neutral',
  },
  declined: {
    border: 'fieldDisabled',
    icon: XCircleIcon,
    iconTone: 'critical',
    textTone: 'neutral',
  },
} as const;

function useStepStyles(status: StepProps['status'] = DEFAULT_STATUS) {
  const theme = useTheme();
  const responsiveStyles = theme.utils.responsiveStyles({
    mobile: { height: theme.typography.text.standard.mobile.capHeight },
    tablet: { height: theme.typography.text.standard.tablet.capHeight },
  });

  // Account for icon when calculating height and position of the line
  const offset = theme.sizing.xsmall * 0.75;

  return [
    {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    },
    {
      ...responsiveStyles,
      ':after': {
        content: "''",
        background: theme.border.color[fromStatus[status].border],

        height: `calc(100% - ${offset}px)`,
        top: offset,

        left: theme.sizing.xsmall / 2,
        transform: 'translateX(-50%)',

        position: 'absolute',
        width: '2px',
      },
    },
  ] as const;
}
