import { css } from '@emotion/css';
import { Button } from '@spark-web/button';
import type { IconProps } from '@spark-web/icon';
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XIcon,
} from '@spark-web/icon';
import { Row } from '@spark-web/row';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

const toneToIcon = {
  caution: ExclamationIcon,
  critical: ExclamationIcon,
  info: InformationCircleIcon,
  positive: CheckCircleIcon,
};

type AlertTones = keyof typeof toneToIcon;

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

export function Alert({
  children,
  closeLabel = 'Close alert',
  data,
  heading,
  icon,
  onClose,
  tone = 'info',
}: AlertProps) {
  const Icon = icon || toneToIcon[tone];
  const iconSize = 'xsmall';

  return (
    <Row
      aria-live="polite"
      data={data}
      role="alert"
      // Styles
      alignY={heading ? 'top' : 'center'}
      background={`${tone}Low`}
      borderRadius="medium"
      gap="medium"
    >
      <Row
        alignY="top"
        gap="medium"
        padding="large"
        paddingRight="none"
        width="full"
        style={{ minWidth: 0 }}
      >
        <IconWrapper>
          <Icon size={iconSize} tone={tone} />
        </IconWrapper>
        <Stack flex={1} gap="medium">
          {heading && <Text weight="semibold">{heading}</Text>}
          <Content>{children}</Content>
        </Stack>
      </Row>
      {onClose && (
        <Row padding="small" alignSelf="start">
          <Button label={closeLabel} tone={tone} prominence="low">
            <XIcon size="xxsmall" />
          </Button>
        </Row>
      )}
    </Row>
  );
}

function IconWrapper({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const responsiveStyles = theme.utils.responsiveStyles({
    mobile: { height: theme.typography.text.standard.mobile.capHeight },
    tablet: { height: theme.typography.text.standard.tablet.capHeight },
  });

  return (
    <Row
      aria-hidden="true"
      align="center"
      alignY="center"
      cursor="default"
      flexShrink={0}
      className={css(responsiveStyles)}
    >
      {children}
    </Row>
  );
}

function Content({ children }: { children: ReactNode }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text>{children}</Text>;
  }

  return <Fragment>{children}</Fragment>;
}
