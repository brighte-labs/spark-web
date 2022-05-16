import { css } from '@emotion/css';
import { Box } from '@spark-web/box';
import { Field } from '@spark-web/field';
import { SearchIcon } from '@spark-web/icon';
import { NavLink } from '@spark-web/nav-link';
import { Stack } from '@spark-web/stack';
import { Strong, Text } from '@spark-web/text';
import { InputAdornment, TextInput } from '@spark-web/text-input';
import { useTheme } from '@spark-web/theme';
import { Suspense, useState } from 'react';

import { HEADER_HEIGHT } from './constants';

export function Search() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box
      display={{ mobile: 'none', tablet: 'flex' }}
      flex={1}
      flexDirection="column"
      paddingX="xlarge"
      position="relative"
      width="full"
      className={css({ maxWidth: theme.contentWidth.xsmall })}
    >
      <Field label="Search" labelVisibility="hidden">
        <TextInput
          // TODO: fix types so I don't need the `any`
          onChange={(e: any) => setSearchValue(e.target.value)}
          placeholder="Search..."
          type="search"
        >
          <InputAdornment placement="start">
            <SearchIcon size="xxsmall" tone="muted" />
          </InputAdornment>
        </TextInput>
        {searchValue.length > 2 ? (
          <Suspense
            fallback={<SearchResultsContainer>Loading</SearchResultsContainer>}
          >
            <SearchResults query={searchValue} />
          </Suspense>
        ) : null}
      </Field>
    </Box>
  );
}

let lunrIndex: any;
let searchIndexPromise: Promise<any>;

async function getSearchInstance() {
  if (lunrIndex) {
    return lunrIndex;
  }
  searchIndexPromise =
    searchIndexPromise ??
    //@ts-ignore seach-index generated after build
    Promise.all([import('../cache/search-index.json'), import('lunr')])
      .then(([jsonIndex, lunr]) => {
        return lunr.default.Index.load(jsonIndex);
      })
      .catch(error => {
        console.error(error);
      });

  lunrIndex = await searchIndexPromise;

  return lunrIndex;
}

function useSearch(query: string): any[] {
  if (!lunrIndex) {
    // This will throw a promise, triggering the <Suspense> boundary
    throw getSearchInstance();
  }
  // Search with a post-fix wildcard, and fuzzy search (for minor typos)
  return lunrIndex.search(`${query}*`);
}

function SearchResultsContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      position="absolute"
      background="surface"
      padding="medium"
      shadow="small"
      borderRadius="medium"
      width="full"
      className={css({ top: HEADER_HEIGHT })}
    >
      <Stack gap="xlarge">{children}</Stack>
    </Box>
  );
}

function SearchResults({ query }: { query: string }) {
  const results = useSearch(query) ?? [];

  let content = <Text>No results found</Text>;

  if (results.length > 0) {
    content = (
      <Stack as="ul" gap="small">
        {results.slice(0, 10).map((result: any, index: number) => (
          <SearchItem key={index} result={result} />
        ))}
      </Stack>
    );
  }

  return <SearchResultsContainer>{content}</SearchResultsContainer>;
}

function SearchItem({ result }: { result: any }) {
  const match = Object.entries(result.matchData?.metadata ?? {})[0];
  let children = (
    <>
      Component &gt; {result.ref} &gt; ... <Strong>{match[0]}</Strong>...
    </>
  );
  // @ts-expect-error: Object is of type 'unknown'
  if (match?.[1].title) {
    children = (
      <>
        Component &gt; <Strong>{result.ref}</Strong>
      </>
    );
  }

  if (
    // @ts-expect-error: Argument of type 'unknown' is not assignable to parameter of type 'object'.
    Object.keys(match?.[1] || {}).some(matchKey =>
      // A heading: h1, h2, h3, h4, h5, h6
      /^h[1-6]$/.test(matchKey)
    )
  ) {
    children = (
      <>
        Component &gt; {result.ref} &gt; <Strong>{match[0]}</Strong>
      </>
    );
  }

  // NavLink only accepts a string or icon component so typing as `any` to get around this
  const content: any = (
    <>
      <Text as="span" baseline={false} overflowStrategy="nowrap">
        {children}
      </Text>
    </>
  );

  return (
    <Box as="li">
      <NavLink href={`/package/${result.ref}`}>{content}</NavLink>
    </Box>
  );
}
