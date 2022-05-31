import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { useTheme } from '@spark-web/theme';
import type { ReactNode } from 'react';

import { Header } from './header';
import type { SidebarItem } from './sidebar';
import { Sidebar, SidebarProvider } from './sidebar';

export function Layout({
  navigation,
  children,
}: {
  navigation: SidebarItem[];
  children: ReactNode;
}): JSX.Element {
  const theme = useTheme();
  return (
    <SidebarProvider>
      <Box
        display="flex"
        flexDirection="column"
        background="surface"
        className={css({ minHeight: '100vh' })}
      >
        <Header />

        <Box display="flex" flex={1}>
          <Box
            className={css({
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: theme.contentWidth.xlarge,
              width: '100%',
              display: 'flex',
              flex: 1,
            })}
          >
            <Sidebar items={navigation} />
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarProvider>
  );
}
