import { AesteticoStylesheet, SparkProvider } from '@spark-web/core';
import { UniversalNextLink } from '@spark-web/next-utils';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import { allPackages } from '../.contentlayer/generated';
import { Layout } from '../components/layout';
import type { SidebarItem } from '../components/sidebar';

function App({
  Component,
  pageProps,
  navigation,
}: AppProps & {
  navigation: SidebarItem[];
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
      <AesteticoStylesheet />
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
      {
        name: 'Guides',
        children: [
          {
            name: 'Demo',
            href: '/guide/demo',
          },
        ],
      },
      {
        name: 'Components',
        children: allPackages
          .filter(({ slug }) => !ignorePackages.includes(slug))
          .map(({ title, slug }) => ({
            name: title,
            href: `/package/${slug}`,
          })),
      },
    ],
  };
};

export default App;
