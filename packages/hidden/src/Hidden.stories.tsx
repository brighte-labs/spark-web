import { Divider } from '@spark-web/divider';
import { InformationCircleIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/layout';
import { Stack } from '@spark-web/layout';
import { Text } from '@spark-web/text';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Placeholder } from '../../../docs/components/example-helpers';
import type { HiddenProps } from './Hidden';
import { Hidden } from './Hidden';

export default {
  title: 'Accessibility / Hidden',
  component: Hidden,
} as ComponentMeta<typeof Hidden>;

const HiddenStory: ComponentStory<typeof Hidden> = (args: HiddenProps) => (
  <Stack gap="large">
    <Inline gap="xsmall" alignY="center">
      <InformationCircleIcon tone="info" size="xsmall" />{' '}
      <Text weight="medium" tone="info" baseline={false}>
        Resize this window to see elements hide / show
      </Text>
    </Inline>
    <Divider />
    <Hidden {...args} />
  </Stack>
);
export const Default = HiddenStory.bind({});

Default.args = {
  children: (
    <Stack gap="small">
      <Placeholder label="Always visible" height={64} />
      <Hidden below="wide">
        <Placeholder label="Hidden below wide" height={64} />
      </Hidden>
      <Hidden above="desktop">
        <Placeholder label="Visible below wide" height={64} />
      </Hidden>
    </Stack>
  ),
} as HiddenProps;
