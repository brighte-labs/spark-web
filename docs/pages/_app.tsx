import { SparkProvider } from '@spark-web/core';
import { UniversalNextLink } from '@spark-web/next-utils';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';

import { Layout } from '../components/layout';

function App({ Component, pageProps }: AppProps): JSX.Element {
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SparkProvider>
  );
}

export default App;
