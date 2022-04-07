import { Global } from '@emotion/react';
import { IdProvider, useFocusVisible } from '@spark-web/a11y';
import { BrighteTheme, defaultTheme, ThemeProvider } from '@spark-web/theme';
import type { ReactNode } from 'react';

import {
  DefaultLinkComponent,
  LinkComponent,
  LinkComponentContext,
} from './linkContext';

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
