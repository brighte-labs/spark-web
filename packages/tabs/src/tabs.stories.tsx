import { css } from '@emotion/css';
import { Button } from '@spark-web/button';
import { DocumentTextIcon } from '@spark-web/icon';
import { Row } from '@spark-web/row';
import { Stack } from '@spark-web/stack';
import type { ForegroundTone } from '@spark-web/text';
import { Text, useForegroundTone } from '@spark-web/text';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import type { ComponentMeta } from '@storybook/react';
import { useMemo } from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from './tabs';

export default {
  title: 'Page & Layout / Tabs',
} as ComponentMeta<any>;

export function Default() {
  return (
    <Tabs defaultIndex={0}>
      <TabList>
        {tabs.map(({ tab }, index) => (
          <Tab key={index}>{tab}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map(({ panel }, index) => (
          <TabPanel key={index}>{panel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

const payments = [
  {
    year: '2022',
    payments: [
      {
        type: 'Repayment',
        amount: `+$${(27_000 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
      {
        type: 'Weekly account keeping fee',
        amount: `$${(-150 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
      {
        type: 'Repayment',
        amount: `+$${(27_000 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
      {
        type: 'Weekly account keeping fee',
        amount: `$${(-150 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
      {
        type: 'Repayment',
        amount: `+$${(27_000 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
    ],
  },
  {
    year: '2021',
    payments: [
      {
        type: 'Repayment',
        amount: `+$${(27_000 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
      {
        type: 'Weekly account keeping fee',
        amount: `$${(-150 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
      {
        type: 'Repayment',
        amount: `+$${(27_000 / 100).toLocaleString()}`,
        date: '21st May 2022',
      },
    ],
  },
] as const;

type SizeType = Exclude<keyof BrighteTheme['sizing'], 'full' | 'none'>;

export function BrighteIcon({
  size: sizeKey = 'small',
  tone = 'primary',
}: {
  size?: SizeType;
  tone?: ForegroundTone;
}) {
  const fill = useForegroundTone(tone);
  const theme = useTheme();
  const size = theme.sizing[sizeKey];
  const styles = useMemo(
    () => ({
      fill,
      height: size,
      width: size,
      stroke: 'none',
      verticalAlign: 'text-bottom', // removes whitespace inside buttons
    }),
    [fill, size]
  );

  return (
    <svg
      aria-label="Brighte logo"
      role="img"
      focusable="false"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
      className={css(styles)}
    >
      <path d="M19.552 11.008s.796-.399 2.44-.661a12.82 12.82 0 0 1 2.37-.215V.016a25.506 25.506 0 0 0-8.468 1.486l3.658 9.506Zm-3.34 1.894s-1.073.876-1.62 1.43c-.492.494-1.477 1.789-1.477 1.789l-8.941-5.397a22.79 22.79 0 0 1 6.018-6.265l6.02 8.443ZM10.8 23.508a15.64 15.64 0 0 1 .761-4.127c.082-.242.14-.428.14-.428L1.592 16.224A24.985 24.985 0 0 0 .43 23.841v.109h10.35s.005-.199.019-.442Zm13.563-3.93v-5.802c-6.014.123-9.931 4.256-9.931 10.065v.109h5.802c.002-.026.002-.051.002-.076v-.025c0-2.526 1.477-4.17 4.127-4.271Z" />
    </svg>
  );
}

const documents = [
  {
    type: 'Account statement',
    date: 'May 2022',
    documentId: 'bab9746b-e8d9-476f-932b-f58fb72557a2',
  },
  {
    type: 'Payout statement',
    date: 'May 2022',
    documentId: '656217b0-e260-48fe-94ed-085ed2ada0d7',
  },
  {
    type: 'Brighte finance contract',
    date: 'May 2022',
    documentId: '34db7708-683e-43de-88d5-35a7fbd58d83',
  },
  {
    type: 'Repayment schedule',
    date: 'May 2022',
    documentId: '534def27-1868-47cd-b041-d34ccb43c9c7',
  },
  {
    type: 'Payment details',
    date: 'May 2022',
    documentId: '7542a7a9-1cb6-4601-a168-d2ea9d4169d9',
  },
] as const;

const tabs = [
  {
    tab: 'Payments',
    panel: (
      <Stack gap="xxlarge" paddingY="large">
        {payments.map(({ year, payments }) => (
          <Stack key={year} gap="large">
            <Text size="small" tone="muted" weight="semibold">
              {year}
            </Text>
            {payments.map(({ type, amount, date }, index) => (
              <Row key={index} flexShrink={0} alignY="center" gap="large">
                <Row
                  align="center"
                  alignY="center"
                  background="primaryLow"
                  borderRadius="medium"
                  height="medium"
                  width="medium"
                >
                  <BrighteIcon size="xsmall" />
                </Row>
                <Stack gap="medium" flex={1}>
                  <Text size="small" weight="semibold">
                    {type}
                  </Text>
                  <Text size="small" tone="muted">
                    {date}
                  </Text>
                </Stack>
                <Text
                  size="small"
                  tone={amount.charAt(0) === '+' ? 'positive' : 'muted'}
                  weight="semibold"
                >
                  {amount}
                </Text>
              </Row>
            ))}
          </Stack>
        ))}
      </Stack>
    ),
  },
  {
    tab: 'Documents',
    panel: (
      <Stack gap="xlarge" paddingY="large">
        {documents.map(({ date, documentId, type }) => {
          return (
            <Row key={documentId} flexShrink={0} alignY="center" gap="large">
              <Row
                align="center"
                alignY="center"
                background="primaryLow"
                borderRadius="medium"
                height="medium"
                width="medium"
              >
                <DocumentTextIcon size="xsmall" tone="primaryActive" />
              </Row>
              <Stack gap="medium" flex={1}>
                <Text size="small" weight="semibold">
                  {type}
                </Text>
                <Text size="small" tone="muted">
                  As at {date}
                </Text>
              </Stack>
              <Button
                tone="neutral"
                onClick={() => console.log('Document requested')}
              >
                Request document
              </Button>
            </Row>
          );
        })}
      </Stack>
    ),
  },
] as const;
