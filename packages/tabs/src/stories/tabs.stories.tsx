import { Button } from '@spark-web/button';
import { DocumentTextIcon } from '@spark-web/icon';
import { Row } from '@spark-web/row';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import type { ComponentMeta } from '@storybook/react';

import { TabButton, TabList, TabPanel, TabPanels, Tabs } from '../tabs';
import { BrighteIcon } from './brighte-icon';
import { documents, payments } from './lib';

export default {
  title: 'Page & Layout / Tabs',
} as ComponentMeta<any>;

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

export function Default() {
  return (
    <Tabs defaultIndex={0}>
      <TabList>
        {tabs.map(({ tab }, index) => (
          <TabButton key={index}>{tab}</TabButton>
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
