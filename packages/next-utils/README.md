---
title: Next.js Utils
isExperimentalPackage: true
---

## Universal Next Link

Resolves internal links using the
[Next.js Link component](https://nextjs.org/docs/api-reference/next/link), which
expects `href` to begin with a slash e.g. `href="/page"`. Uses a traditional
anchor element for everything else e.g. external, hash, tel, mailto.

For compatibility with TS + Spark the `href` property may only accept a string,
so URL Objects must be resolved ahead of time. We recommend the
[url package](https://www.npmjs.com/package/url) for complex cases, though most
of the time it's simple to do this manually.

You can pass the `UniversalNextLink` component to the `linkComponent` prop of
the `SparkProvider` and all `Link`, `TextLink`, and `ButtonLink` components will
automatically use the Next.js Link component for client-side transitions.

```jsx
import { SparkProvider } from '@spark-web/core';
import { UniversalNextLink } from '@spark-web/next-utils';

export default function App({ Component, pageProps }) {
  return (
    <SparkProvider linkComponent={UniversalNextLink}>
      <Component {...pageProps} />
    </SparkProvider>
  );
}
```

### Props

| Prop | Type   | Default | Description                                                                             |
| ---- | ------ | ------- | --------------------------------------------------------------------------------------- |
| href | string |         | URL to direct to. Note that the URL needs to be an internal link (i.e. `href='/page'`). |

The `UniversalNextLink` props also includes HTML `a` anchor props and are not
listed above.

## propsWithCssText

Function that takes the `initialProps` from `getInitialProps` and inlines
critical CSS server-side.

```jsx
import { propsWithCssText } from '@spark-web/next-utils';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(context) {
    const initialProps = await NextDocument.getInitialProps(context);
    return propsWithCssText(initialProps);
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Props

| Prop         | Type                 | Default | Description                                                                                           |
| ------------ | -------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| initialProps | DocumentInitialProps |         | Value returned from the `getInitialProps` static method on the `Document` class (in `next/document`). |
