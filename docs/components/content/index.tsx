import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Divider } from '@spark-web/divider';
import { Hidden } from '@spark-web/hidden';
import type { LinkProps } from '@spark-web/link';
import { Stack } from '@spark-web/stack';
import { Text, useText } from '@spark-web/text';
import { useTheme } from '@spark-web/theme';
import { DefaultSeo } from 'next-seo';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Fragment, useCallback } from 'react';

import type { HeadingData } from '../../utils/generate-toc';
import { ASIDE_WIDTH, HEADER_HEIGHT, SIDEBAR_WIDTH } from '../constants';
import { TocContextProvider, useIsActive, useTocContext } from './toc-context';

const MAIN_ID = 'spark-docs-main';

export function DocsContent({
  children,
  includeNavigation,
  pageTitle,
  toc,
}: {
  children: ReactNode;
  toc?: HeadingData[];
  includeNavigation?: boolean;
  pageTitle?: string;
}): JSX.Element {
  const { utils } = useTheme();

  const responsiveStyles = utils.responsiveStyles({
    mobile: {
      'h2[id], h3[id]': {
        scrollMarginTop: HEADER_HEIGHT,
        paddingTop: '1em',
      },
    },
    tablet: { paddingLeft: SIDEBAR_WIDTH },
    wide: { paddingRight: includeNavigation ? ASIDE_WIDTH : undefined },
  });

  // TODO: find a better solution for inline styles related to heading offsets
  return (
    <TocContextProvider value={toc || []}>
      <DefaultSeo title={pageTitle} />
      <Stack width="full" gap="large" className={css(responsiveStyles)}>
        <Box display="flex" flex={1}>
          <Main id={MAIN_ID}>{children}</Main>

          {includeNavigation && <Aside />}
        </Box>

        <Box marginX={{ mobile: 'large', tablet: 'xlarge' }}>
          <Divider />

          <Box as="footer" paddingY="xxlarge">
            <Text size="small" tone="muted">
              &copy; {new Date().getFullYear()} Brighte Capital Pty Ltd
            </Text>
          </Box>
        </Box>
      </Stack>
    </TocContextProvider>
  );
}

type ElementProps = HTMLAttributes<HTMLDivElement>;

const Main = (props: ElementProps) => {
  return (
    <Box
      as="main"
      flex={1}
      padding={{ mobile: 'large', tablet: 'xlarge' }}
      paddingY="xxlarge"
      minWidth={0}
      {...props}
    />
  );
};

const Aside = () => {
  return (
    <Hidden below="wide">
      <Box
        as="aside"
        padding="large"
        paddingY="xxlarge"
        position="fixed"
        overflow="auto"
        className={css({ width: ASIDE_WIDTH })}
      >
        <TableOfContents />
      </Box>
    </Hidden>
  );
};

const TableOfContents = () => {
  const headingId = 'spark-toc-heading';

  return (
    <Stack gap="large">
      <Text weight="medium" id={headingId}>
        On this page
      </Text>
      <nav aria-labelledby={headingId}>
        <HeadingList />
      </nav>
    </Stack>
  );
};

const HeadingList = () => {
  const { headings } = useTocContext();
  const makeClickHandler = useCallback(
    ({ id, title }: HeadingData) =>
      (e: MouseEvent<HTMLAnchorElement>) => {
        const target = document.getElementById(id);

        if (target) {
          e.preventDefault();

          // update url so users can copy
          history.replaceState({}, title, replaceHash(id));

          // scroll to heading
          target.scrollIntoView({
            behavior: 'smooth',
          });
        }
      },

    []
  );

  const headingMap = useCallback(
    (heading: HeadingData) => {
      return (
        <Fragment key={heading.title}>
          <HeadingItem
            id={heading.id}
            level={heading.level}
            key={heading.title}
            href={`#${heading.id}`}
            onClick={makeClickHandler(heading)}
          >
            {heading.title}
          </HeadingItem>
          {heading.items.length ? heading.items.map(headingMap) : null}
        </Fragment>
      );
    },
    [makeClickHandler]
  );

  //  TODO: implement observer to highlight current anchor
  return <Box as="ul">{headings.map(heading => headingMap(heading))}</Box>;
};

type HeadingItemProps = LinkProps & Pick<HeadingData, 'id' | 'level'>;
const HeadingItem = ({
  id,
  href,
  onClick,
  children,
  level,
}: HeadingItemProps) => {
  const { color } = useTheme();

  const isActive = useIsActive(id);

  const textStyles = useText({
    tone: 'neutral',
    size: level === 4 ? 'xsmall' : level === 3 ? 'small' : 'standard',
    weight: isActive ? 'strong' : 'regular',
  });

  return (
    <Box as="li">
      <Box
        as="a"
        display="block"
        href={href}
        onClick={onClick}
        paddingY="medium"
        paddingLeft={level === 3 || level === 4 ? 'small' : undefined}
        className={css([
          textStyles,
          { ':hover': { color: color.foreground.primary } },
        ])}
      >
        {children}
      </Box>
    </Box>
  );
};

// Utils
// ------------------------------

function replaceHash(hash: string) {
  return `${location.href.replace(location.hash, '')}#${hash}`;
}
