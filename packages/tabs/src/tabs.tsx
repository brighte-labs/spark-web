import { css } from '@emotion/css';
import {
  Content as RadixTabPanel,
  List as RadixTabList,
  Root as RadixTabs,
  Trigger as RadixTab,
} from '@radix-ui/react-tabs';
import { useFocusRing } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { BaseButton } from '@spark-web/button';
import { Divider } from '@spark-web/divider';
import { Inline } from '@spark-web/inline';
import { useLinkComponent } from '@spark-web/link';
import { Stack } from '@spark-web/stack';
import { DefaultTextPropsProvider, Text } from '@spark-web/text';
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
export type TabsProps = {
  /**
   * When automatic, tabs are activated when receiving focus. When manual,
   * tabs are activated when clicked.
   */
  activationMode?: 'automatic' | 'manual';
  children: Array<ReactElement<TabListProps | TabPanelsProps>>;
  defaultIndex?: number;
  // /**
  //  * The controlled value of the tab to activate.
  //  * Should be used in conjunction with onIndexChange.
  //  */
  // index?: number;
  // /**
  //  * Event handler called when the value changes.
  //  */
  // onIndexChange?: (index: number) => void;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      activationMode,
      children,
      defaultIndex,
      // index,
      // onIndexChange,
    },
    forwardedRef
  ) => {
    const defaultValue =
      typeof defaultIndex === 'undefined' ? String(0) : String(defaultIndex);

    return (
      <RadixTabs
        activationMode={activationMode}
        defaultValue={defaultValue}
        ref={forwardedRef}
        // value={String(index)}
        // onValueChange={onIndexChange}
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
type TabListChildren = ReactElement<TabButtonProps> | Array<TabListChildren>;
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
export type TabButtonProps = {
  children: ReactNode;
  disabled?: boolean;
};

const GAP = 'small'; // Space between the interactive element and the pseudo border

export const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ children, disabled }, forwardedRef) => {
    const [boxProps, tabStyles] = useTabStyles();

    const { ref, width } = useWidth();
    const composedRef = useComposedRefs(ref, forwardedRef);

    const index = useIndexContext();

    return (
      <Stack position="relative" paddingY={GAP}>
        <RadixTab value={index} asChild>
          <BaseButton
            {...boxProps}
            ref={composedRef}
            disabled={disabled}
            className={css(tabStyles)}
            style={{ width }}
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

TabButton.displayName = 'TabButton';

export type TabLinkProps = {
  children: ReactNode;
  disabled?: boolean;
  href: string;
};

export const TabLink = forwardRef<HTMLAnchorElement, TabLinkProps>(
  ({ children, href }, forwardedRef) => {
    const [boxProps, tabStyles] = useTabStyles();

    const { ref, width } = useWidth();
    const composedRef = useComposedRefs(ref, forwardedRef);

    const index = useIndexContext();
    const linkComponent = useLinkComponent(forwardedRef);

    return (
      <Stack position="relative" paddingY={GAP}>
        <RadixTab value={index} asChild>
          <Box
            {...boxProps}
            as={linkComponent}
            asElement="a"
            ref={composedRef}
            href={href}
            className={css(tabStyles)}
            style={{ width }}
          >
            <DefaultTextPropsProvider size="small" tone="muted">
              <Content>{children}</Content>
            </DefaultTextPropsProvider>
          </Box>
        </RadixTab>
      </Stack>
    );
  }
);

TabLink.displayName = 'TabLink';

function useTabStyles() {
  const theme = useTheme();
  const focusStyles = useFocusRing();

  return [
    {
      borderRadius: 'small',
      cursor: 'pointer',
      paddingX: 'xlarge',
      paddingY: 'medium',
      position: 'relative',
    },
    {
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
          bottom: -theme.spacing[GAP],
          left: 0,
          transform: 'translateY(100%)',
          height: theme.border.width.large,
          width: '100%',
          background: theme.color.foreground.primaryActive,
        },
      },
    },
  ] as const;
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
};

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children }, forwardedRef) => {
    const index = useIndexContext();

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
  children: TabButtonProps['children'] | TabPanelProps['children']
) {
  return Children.map(children, (child, index) => {
    return (
      isValidElement(child) && (
        <IndexProvider value={index}>{child}</IndexProvider>
      )
    );
  });
}

/**
 * The font-weight changes when the button is active. This causes the button
 * to get slightly wider (which we don't want).
 * To avoid this, we measure the initial width of the button and make it fixed
 * width.
 * We're using the style prop for this so that Emotion doesn't need to generate
 * a completely new hash (as the width will vary between for each tab based
 * on the length of the text)
 */
function useWidth() {
  const ref = useRef<HTMLElement>(null);
  const width = ref.current?.getBoundingClientRect().width;

  return {
    ref,
    width,
  };
}
