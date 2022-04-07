import { propsWithCssText } from '@spark-web/next-utils';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await NextDocument.getInitialProps(context);
    return propsWithCssText(initialProps);
  }

  render(): JSX.Element {
    return (
      <Html lang="en-AU">
        <Head>
          <link
            rel="stylesheet"
            href="https://spark-web-docs-5at71kbus-brighte.vercel.app/_next/static/css/b1c6707967e86a27.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
