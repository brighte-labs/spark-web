import { css } from '@emotion/css';
import { Box, useFocusRing, useTheme, VisuallyHidden } from '@spark-web/core';
import { MenuIcon, XIcon } from '@spark-web/icon';
import { Container, Hidden } from '@spark-web/layout';
import { Strong, Text } from '@spark-web/text';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants';
import { Logo } from './logo';
import { useSidebarContext } from './sidebar';

export function Header() {
  const { sidebarIsOpen, toggleSidebar } = useSidebarContext();

  const { border, color, sizing } = useTheme();

  const focusRingStyles = useFocusRing();

  const ToggleMenuIcon = sidebarIsOpen ? XIcon : MenuIcon;

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      className={css({
        borderBottom: `1px solid ${border.color.standard}`,
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
      })}
    >
      <Container size="xlarge">
        <Box
          display="flex"
          alignItems="center"
          className={css({ height: HEADER_HEIGHT })}
        >
          <Hidden above="mobile">
            <Box
              as="button"
              type="button"
              onClick={toggleSidebar}
              padding="large"
              className={css({ ':focus': focusRingStyles })}
            >
              <VisuallyHidden>Mobile menu</VisuallyHidden>
              <ToggleMenuIcon size="xsmall" tone="muted" />
            </Box>
          </Hidden>

          <Box
            className={css({
              marginBottom: -4, // visual alignment fix: account for "g" descender in logo
              width: SIDEBAR_WIDTH,
            })}
            paddingLeft={{ tablet: 'xxlarge' }}
          >
            <Logo
              aria-hidden="true"
              className={css({
                color: color.foreground.primary,
                height: sizing.small,
              })}
            />
          </Box>

          <Box
            paddingX="xlarge"
            display={{ mobile: 'none', tablet: 'inline-block' }}
          >
            <Notice />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const Notice = () => (
  <Box
    background="cautionMuted"
    paddingX="large"
    paddingY="medium"
    borderRadius="full"
  >
    <Text tone="caution">
      <Strong>Spark v0</Strong> &middot; Please note: this is a work-in-progress
    </Text>
  </Box>
);
