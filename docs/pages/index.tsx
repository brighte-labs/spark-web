import { Stack } from '@spark-web/stack';
import { home } from 'contentlayer/generated';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';

import { DocsContent } from '../components/content';
import { mdxComponents } from '../components/mdx-components/mdx-components';
//import type { Awaited } from '../types';

export const getStaticProps: GetStaticProps<{
  code: string;
  toc: any;
}> = async () => {
  const { code } = await bundleMDX({
    source: home.body.raw,
  });

  return {
    props: {
      code,
      toc: home.toc,
    },
  };
};

export default function HomePage({
  code,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <DocsContent pageTitle={'Home'} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <Component components={mdxComponents as any} />
      </Stack>
    </DocsContent>
  );
}
