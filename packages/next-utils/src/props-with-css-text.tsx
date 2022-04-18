import { renderStatic } from '@spark-web/ssr';
// eslint-disable-next-line @next/next/no-document-import-in-page
import type { DocumentInitialProps } from 'next/document';

export async function propsWithCssText(
  initialProps: DocumentInitialProps
): Promise<DocumentInitialProps> {
  const { css, ids } = await renderStatic(initialProps.html);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style
          data-emotion={`css ${ids.join(' ')}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      </>
    ),
  };
}
