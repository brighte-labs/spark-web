import { css } from '@emotion/css';
import { useFocusRing, VisuallyHidden } from '@spark-web/a11y';
import { Box } from '@spark-web/box';
import { Container } from '@spark-web/container';
// import { Field } from '@spark-web/field';
import { Hidden } from '@spark-web/hidden';
import { MenuIcon, XIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Link } from '@spark-web/link';
import { Strong, Text } from '@spark-web/text';
// import { TextInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
// @ts-expect-error flexsearch sucks
import { Document as FlexSearchDocument } from 'flexsearch';
import { useEffect } from 'react';

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
            <Inline gap="xlarge">
              <Notice />
              <SearchInputBox />
            </Inline>
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

let flexsearchDoc: any;

const SearchInputBox = () => {
  useEffect(() => {
    const fetchSearchIndex = async () => {
      if (flexsearchDoc) {
        return;
      }
      //@ts-ignore seach-index generated after build
      const flexsearchIndex = await import('../cache/search-index.json');
      //@ts-expect-error
      flexsearchDoc = new FlexSearchDocument({
        document: 'content',
      });
      flexsearchIndex.default.forEach(async (element: any) => {
        await flexsearchDoc.import(element.key, JSON.parse(element.data));
      });
    };

    fetchSearchIndex();
  });

  // const onChange: any = (event: any) => {
  //   const { value } = event.target;
  //   if (!flexsearchDoc) {
  //     console.error('THIS SHOULD BE IMPOSSIBLE!');
  //     return;
  //   }
  //   const results = flexsearchDoc.search(value);
  //   console.log({ results });
  // };

  return null;

  // return (
  //   <>
  //     <Field label="Search" labelVisibility="hidden">
  //       <TextInput placeholder="search" onChange={onChange} />
  //     </Field>
  //   </>
  // );
};
