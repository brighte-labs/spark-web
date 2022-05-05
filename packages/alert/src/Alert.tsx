import { Box } from '@spark-web/box';
import type { IconProps } from '@spark-web/icon';
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from '@spark-web/icon';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { IndicatorContainer } from '@spark-web/text-list';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

type AlertTones = 'caution' | 'critical' | 'info' | 'positive';

export type AlertProps = {
  children: string | ReactNode;
  closeLabel?: string;
  data?: DataAttributeMap;
  heading?: string;
  icon?: ({ size: sizeKey, tone }: IconProps) => JSX.Element;
  id?: string;
  onClose?: () => void;
  tone: AlertTones;
};

export const Alert = ({
  children,
  closeLabel = 'Close alert',
  heading,
  icon,
  onClose,
  tone = 'info',
}: AlertProps): JSX.Element => {
  const Icon = icon || toneToIcon[tone];
  const iconSize = 'xsmall';

  return (
    <Box
      role="alert"
      aria-live="polite"
      background={`${tone}Muted`}
      borderRadius="medium"
      display="flex"
      alignItems="start"
      gap="medium"
    >
      <Box
        display="flex"
        flex={1}
        alignItems="start"
        gap="medium"
        padding="large"
      >
        <IndicatorContainer>
          <Icon tone={tone} size={iconSize} />
        </IndicatorContainer>
        <Stack flex={1} gap="medium">
          {heading && <Text weight="strong">{heading}</Text>}
          <Content>{children}</Content>
        </Stack>
      </Box>
      {onClose && (
        <Box padding="small">
          {/* TODO: replace with Button component */}
          <Box
            as="button"
            aria-label={closeLabel}
            onClick={onClose}
            type="button"
            // Styling
            borderRadius="small"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="medium"
            width="medium"
            // NOTE: hover/focus styles etc have not been implemented
            // as we don't have the correct tokens yet and this will soon be replaced
            // with a `Button` component that will handle this for us.
          >
            <XIcon size="xxsmall" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

const toneToIcon = {
  caution: ExclamationIcon,
  critical: ExclamationIcon,
  info: InformationCircleIcon,
  positive: CheckCircleIcon,
};

const Content = ({ children }: { children: ReactNode }) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text>{children}</Text>;
  }

  return <Fragment>{children}</Fragment>;
};
