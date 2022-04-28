import { SparkProvider } from '@spark-web/core';
import { UniversalNextLink } from '@spark-web/next-utils';
import { allPackages } from 'contentlayer/generated';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import { Layout } from '../components/layout';
import type { SidebarNavItemType } from '../components/sidebar';

function App({
  Component,
  pageProps,
  navigation,
}: AppProps & {
  navigation: SidebarNavItemType[];
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
      <Layout navigation={navigation}>
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
  };
};

export default App;
