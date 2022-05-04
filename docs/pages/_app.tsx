import { SparkProvider } from '@spark-web/core';
import { UniversalNextLink } from '@spark-web/next-utils';
import type { SearchIndexType } from 'components/header';
import { allPackages } from 'contentlayer/generated';
// @ts-expect-error
import { Document as FlexSearchDocument } from 'flexsearch';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import { Layout } from '../components/layout';
import type { SidebarNavItemType } from '../components/sidebar';

function App({
  Component,
  pageProps,
  navigation,
  searchIndex,
}: AppProps & {
  navigation: SidebarNavItemType[];
  searchIndex: SearchIndexType;
}): JSX.Element {
  return (
    <SparkProvider linkComponent={UniversalNextLink}>
      <NextHead>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </NextHead>
      <DefaultSeo
        titleTemplate="%s | Brighte Spark Design System"
        defaultTitle="Brighte Spark Design System"
      />
      <Layout navigation={navigation} searchIndex={searchIndex}>
        <Component {...pageProps} />
      </Layout>
    </SparkProvider>
  );
}

App.getInitialProps = async () => {
  const ignorePackages = ['control-label', 'core', 'theme', 'utils'];
  return {
    navigation: [
      { name: 'Home', href: '/' },
      ...allPackages
        .filter(({ slug }) => !ignorePackages.includes(slug))
        .map(({ title, slug }) => ({ name: title, href: `/package/${slug}` })),
    ],
    searchIndex: (() => {
      // @ts-expect-error
      const flexSearchDocument = new FlexSearchDocument({
        document: {
          id: 'slug',
          index: ['content'],
        },
      });

      allPackages.forEach(pkg => {
        flexSearchDocument.add({
          slug: pkg.slug,
          content: pkg.body.raw,
        });
      });

      const searchIndex: SearchIndexType = [];

      flexSearchDocument.export(function (key: string, data: string) {
        // you need to store both the key and the data!
        // e.g. use the key for the filename and save your data
        searchIndex.push({ key, data });
      });

      return searchIndex;
    })(),
  };
};

export default App;
