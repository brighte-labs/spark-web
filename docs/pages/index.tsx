import { Stack } from '@spark-web/stack';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';

import { DocsContent } from '../components/content';
import { mdxComponents } from '../components/mdx-components/mdx-components';
import type { Awaited } from '../types';
import type { getPackageBySlug } from '../utils/mdx';
import { getMarkdownContentFromPath } from '../utils/mdx';

export const getStaticProps: GetStaticProps<{
  source: Awaited<ReturnType<typeof getPackageBySlug>>['source'];
  toc: Awaited<ReturnType<typeof getPackageBySlug>>['toc'];
}> = async () => {
  const { source, toc } = await getMarkdownContentFromPath(
    `${process.cwd()}/pages/index.md`
  );

  return {
    props: {
      source,
      toc,
    },
  };
};

export default function HomePage({
  source,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <DocsContent pageTitle={'Home'} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <MDXRemote {...source} components={mdxComponents} />
      </Stack>
    </DocsContent>
  );
}
