import { Global } from '@emotion/react';
import type { ReactNode } from 'react';

import { useFocusVisible } from './focus-ring';
import { IdProvider } from './id-context';
import type { LinkComponent } from './link-context';
import { DefaultLinkComponent, LinkComponentContext } from './link-context';
import type { BrighteTheme } from './make-theme';
import { defaultTheme, ThemeProvider } from './theme-context';

export type SparkProviderProps = {
  children: ReactNode;
  linkComponent?: LinkComponent;
  theme?: BrighteTheme;
};

/** Consolidates core functionality and dependencies of Spark web. */
export const SparkProvider = ({
  children,
  linkComponent = DefaultLinkComponent,
  theme = defaultTheme,
}: SparkProviderProps) => {
  useFocusVisible();

  return (
    <ThemeProvider value={theme}>
      <LinkComponentContext.Provider value={linkComponent}>
        <IdProvider>{children}</IdProvider>
      </LinkComponentContext.Provider>
      {/* Minimum reset */}
      <Global
        styles={`body{margin:0;padding:0;background:${theme.color.background.body}; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}`}
      />
    </ThemeProvider>
  );
};
