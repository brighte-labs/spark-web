import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Hidden } from '@spark-web/hidden';
import { NavLink } from '@spark-web/nav-link';
import { Stack } from '@spark-web/stack';
import { useTheme } from '@spark-web/theme';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants';

export type SidebarNavItemType = { name: string; href: string };

export const Sidebar = ({ items }: { items: SidebarNavItemType[] }) => {
  const { asPath, events } = useRouter();
  const { sidebarIsOpen, closeSidebar } = useSidebarContext();
  useEffect(() => {
    // subscribe to next/router event
    events.on('routeChangeStart', closeSidebar);
    return () => {
      // unsubscribe to event on unmount to prevent memory leak
      events.off('routeChangeStart', closeSidebar);
    };
  }, [closeSidebar, events]);

  const { color, utils } = useTheme();
  const fixedScrollableArea = utils.responsiveStyles({
    mobile: {
      backgroundColor: color.background.surface,
      bottom: 0,
      left: 0,
      right: 0,
      top: HEADER_HEIGHT + 1,
    },
    tablet: {
      backgroundColor: 'initial',
      left: 'auto',
      right: 'auto',
      width: SIDEBAR_WIDTH,
    },
  });

  return (
    <Hidden below={sidebarIsOpen ? undefined : 'tablet'}>
      <Box
        position="fixed"
        overflow="auto"
        paddingX={{ tablet: 'large' }}
        paddingY={{ mobile: 'medium', tablet: 'large' }}
        zIndex="sticky"
        className={css(fixedScrollableArea)}
      >
        <nav aria-label="Page navigation">
          <Stack as="ul" gap="small">
            {items.map(({ href, name }) => (
              <Box key={name} as="li">
                <NavLink href={href} isSelected={href === asPath}>
                  {name}
                </NavLink>
              </Box>
            ))}
          </Stack>
        </nav>
      </Box>
    </Hidden>
  );
};

// Context

// ------------------------------

type SidebarContextType = {
  sidebarIsOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarIsOpen, setOpen] = useState(false);

  const ctx = {
    sidebarIsOpen,
    openSidebar: () => setOpen(true),
    closeSidebar: () => setOpen(false),
    toggleSidebar: () => setOpen(bool => !bool),
  };

  useEffect(() => {
    if (sidebarIsOpen) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [sidebarIsOpen]);

  return (
    <SidebarContext.Provider value={ctx}>{children}</SidebarContext.Provider>
  );
};

export function useSidebarContext() {
  const ctx = useContext(SidebarContext);

  if (!ctx) {
    throw Error('Trying to use Sidebar context outside its Provider.');
  }

  return ctx;
}
