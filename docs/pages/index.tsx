import { Stack } from '@spark-web/stack';
import { home } from 'contentlayer/generated';
import type { MDXComponents } from 'mdx/types';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useMemo } from 'react';

import { DocsContent } from '../components/content';
import { mdxComponents } from '../components/mdx-components';
import type { HeadingData } from '../utils/generate-toc';

export const getStaticProps: GetStaticProps<{
  code: string;
  toc: HeadingData[];
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
        <Component components={mdxComponents as MDXComponents} />
      </Stack>
    </DocsContent>
  );
}
