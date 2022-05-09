import { Stack } from '@spark-web/stack';
import { MDXContent } from 'components/mdx-components/mdx-content';
import { home } from 'contentlayer/generated';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { DocsContent } from '../components/content';
import type { HeadingData } from '../utils/generate-toc';

export const getStaticProps: GetStaticProps<{
  code: string;
  toc: HeadingData[];
}> = async () => {
  return {
    props: {
      code: home.body.code,
      toc: home.toc,
    },
  };
};

export default function HomePage({
  code,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <DocsContent pageTitle={'Home'} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <MDXContent code={code} />
      </Stack>
    </DocsContent>
  );
}
