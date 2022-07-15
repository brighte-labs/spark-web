import { css } from '@emotion/css';
import type { TabsProps as RadixTabsProps } from '@radix-ui/react-tabs';
import {
  Content as RadixTabPanel,
  List as RadixTabList,
  Root as RadixTabs,
  Trigger as RadixTab,
} from '@radix-ui/react-tabs';
import { useFocusRing } from '@spark-web/a11y';
import { BaseButton } from '@spark-web/button';
import { Divider } from '@spark-web/divider';
import { Inline } from '@spark-web/inline';
import { Stack } from '@spark-web/stack';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
import type { BrighteTheme } from '@spark-web/theme';
import { useTheme } from '@spark-web/theme';
import { useComposedRefs } from '@spark-web/utils';
import type { ReactElement, ReactNode } from 'react';
import { Children, forwardRef, Fragment, isValidElement, useRef } from 'react';

import { IndexProvider, useIndexContext } from './context';

/**
 * =============================================================================
 * Tabs
 * =============================================================================
 */
export type TabsProps = Pick<
  RadixTabsProps,
  'value' | 'onValueChange' | 'activationMode'
> & {
  children: Array<ReactElement<TabListProps | TabPanelsProps>>;
  defaultIndex?: number;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, defaultIndex, ...props }, forwardedRef) => {
    return (
      <RadixTabs
        {...props}
        defaultValue={
          defaultIndex !== undefined ? String(defaultIndex) : undefined
        }
        ref={forwardedRef}
      >
        {children}
      </RadixTabs>
    );
  }
);

Tabs.displayName = 'Tabs';

/**
 * =============================================================================
 * TabList
 * =============================================================================
 */
type TabListChildren = ReactElement<TabProps> | Array<TabListChildren>;
export type TabListProps = {
  children: TabListChildren | Array<TabListChildren>;
};

export function TabList({ children }: TabListProps) {
  return (
    <RadixTabList asChild>
      <Inline gap="small">{resolveChildren(children)}</Inline>
    </RadixTabList>
  );
}

/**
 * =============================================================================
 * Tab
 * =============================================================================
 */
export type TabProps = {
  children: ReactNode;
  disabled?: boolean;
  /**
   * Note:
   * If you provide an index for any Tabs or TabPanels, you _must_ provide
   * one for _all_ of them
   * */
  index?: number;
};

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ children, disabled, index: indexProp }, forwardedRef) => {
    /**
     * The font-weight changes when the button is active. This causes the button
     * to get slightly wider (which we don't want).
     * To avoid this, we measure the initial width of the button and make it fixed
     * width.
     * We're using the style prop for this so that Emotion doesn't need to generate
     * a completely new hash (as the width will vary between for each tab based
     * on the length of the text)
     */
    const internalRef = useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(internalRef, forwardedRef);
    const buttonGap = 'small'; // Space between the button and the pseudo border
    const buttonWidth = internalRef.current?.getBoundingClientRect().width;
    const tabStyles = useTabStyles(buttonGap);

    const index = useIndexContext(indexProp);

    return (
      <Stack position="relative" paddingY={buttonGap}>
        <RadixTab value={index} asChild>
          <BaseButton
            ref={composedRef}
            disabled={disabled}
            // Styles
            borderRadius="small"
            cursor="pointer"
            paddingX="xlarge"
            paddingY="medium"
            position="relative"
            className={css(tabStyles)}
            style={{ width: buttonWidth }}
          >
            <DefaultTextPropsProvider size="small" tone="muted">
              <Content>{children}</Content>
            </DefaultTextPropsProvider>
          </BaseButton>
        </RadixTab>
      </Stack>
    );
  }
);

Tab.displayName = 'Tab';

function useTabStyles(buttonGap: keyof BrighteTheme['spacing']) {
  const theme = useTheme();
  const focusStyles = useFocusRing();

  return {
    ':focus': focusStyles,
    ':hover': { background: theme.color.background.surfaceMuted },
    '&[data-state=active]': {
      '*': {
        color: theme.color.foreground.primaryActive,
        fontWeight: theme.typography.fontWeight.semibold,
      },
      ':hover': { background: theme.color.background.primaryMuted },
      // Pseudo border
      '::after': {
        content: '""',
        position: 'absolute',
        right: 0,
        bottom: -theme.spacing[buttonGap],
        left: 0,
        transform: 'translateY(100%)',
        height: theme.border.width.large,
        width: '100%',
        background: theme.color.foreground.primaryActive,
      },
    },
  } as const;
}

/**
 * =============================================================================
 * TabPanels
 * =============================================================================
 */
type TabPanelsChildren = ReactElement<TabPanelProps> | Array<TabPanelsChildren>;
export type TabPanelsProps = {
  children: TabPanelsChildren;
};

export function TabPanels({ children }: TabPanelsProps) {
  return (
    <Stack>
      <Divider width="large" />
      {resolveChildren(children)}
    </Stack>
  );
}

/**
 * =============================================================================
 * TabPanel
 * =============================================================================
 */
export type TabPanelProps = {
  children: ReactNode;
  /**
   * Note:
   * If you provide an index for any Tabs or TabPanels, you _must_ provide
   * one for _all_ of them
   * */
  index?: number;
};

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, index: indexProp }, forwardedRef) => {
    const index = useIndexContext(indexProp);

    return (
      <RadixTabPanel ref={forwardedRef} value={index}>
        {children}
      </RadixTabPanel>
    );
  }
);

TabPanel.displayName = 'TabPanel';

/**
 * =============================================================================
 * Helpers
 * =============================================================================
 */
function Content({ children }: { children: ReactNode }) {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text>{children}</Text>;
  }

  return <Fragment>{children}</Fragment>;
}

/**
 * the `value` prop for Tab and TabPanel is required
 */
function resolveChildren(
  children: TabProps['children'] | TabPanelProps['children']
) {
  return Children.map(children, (child, index) => {
    return (
      isValidElement(child) && (
        <IndexProvider value={index}>{child}</IndexProvider>
      )
    );
  });
}
