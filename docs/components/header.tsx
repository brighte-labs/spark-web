import { css } from '@emotion/css';
import { useFocusRing, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Container } from '@spark-web/container';
import { Hidden } from '@spark-web/hidden';
import { MenuIcon, XIcon } from '@spark-web/icon';
import { Link } from '@spark-web/link';
import { Strong, Text } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';

import { GITHUB_URL, HEADER_HEIGHT, SIDEBAR_WIDTH } from './constants';
import { useSidebarContext } from './sidebar';
import { BrighteLogo, GitHubIcon } from './vectors/fill';

export function Header() {
  const { sidebarIsOpen, toggleSidebar } = useSidebarContext();

  const theme = useTheme();

  const focusRingStyles = useFocusRing();

  const ToggleMenuIcon = sidebarIsOpen ? XIcon : MenuIcon;

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      className={css({
        borderBottom: `1px solid ${theme.border.color.standard}`,
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
            paddingLeft={{ tablet: 'xxlarge' }}
            className={css({
              width: SIDEBAR_WIDTH,
            })}
          >
            <Link
              href="/"
              className={css({
                borderRadius: theme.border.radius.small,
                display: 'inline-block',
                margin: -theme.spacing.xsmall,
                padding: theme.spacing.xsmall,
                ':focus': focusRingStyles,
              })}
            >
              <VisuallyHidden>Home</VisuallyHidden>
              <BrighteLogo tone="primary" />
            </Link>
          </Box>

          <Box
            paddingX="xlarge"
            display={{ mobile: 'none', tablet: 'inline-block' }}
          >
            <Notice />
          </Box>
          <Box
            paddingRight={{ mobile: 'medium', tablet: 'xxlarge' }}
            className={css({ marginLeft: 'auto' })}
          >
            <GitHubLink />
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

const GitHubLink = () => {
  const theme = useTheme();
  const focusRingStyles = useFocusRing();

  return (
    <Link
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={css({
        display: 'inline-block',
        borderRadius: theme.border.radius.full,

        ':focus': focusRingStyles,

        '& > svg': {
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.02, 1.505, 0.745, 1.235)',
          transitionDuration: `${theme.animation.standard.duration}ms`,
        },

        '&:focus > svg': {
          fill: theme.backgroundInteractions.primaryHover,
        },

        '&:hover > svg': {
          fill: theme.backgroundInteractions.primaryHover,
        },

        '&:active > svg': {
          fill: theme.backgroundInteractions.primaryActive,
        },
      })}
    >
      <VisuallyHidden>Spark Web on GitHub</VisuallyHidden>
      <GitHubIcon tone="muted" size="small" />
    </Link>
  );
};
