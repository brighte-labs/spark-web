import { Box } from '@spark-web/box';
import { ButtonLink } from '@spark-web/button';
import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import { plugin as untitledLiveCode } from '@untitled-docs/live-code/rehype';
import { allPackages } from 'contentlayer/generated';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useMemo } from 'react';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { DocsContent } from '../../components/content';
import { StorybookLogo } from '../../components/logo';
import { mdxComponents } from '../../components/mdx-components/mdx-components';
import type { HeadingData } from '../../utils/generate-toc';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPackages.map(pkg => `/package/${pkg.slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  code: string;
  storybookPath: string | null;
  title: string;
  toc: HeadingData[];
}> = async ({ params }) => {
  const pkg = allPackages.find(p => p.slug === params!.slug);
  if (!pkg) {
    return {
      notFound: true,
    };
  }

  const { code } = await bundleMDX({
    source: pkg.body.raw,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        untitledLiveCode,
      ];
      return options;
    },
  });

  return {
    props: {
      code,
      storybookPath: pkg.storybookPath ?? null,
      title: pkg.title,
      toc: pkg.toc,
    },
  };
};

export default function Packages({
  code,
  storybookPath,
  title,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <DocsContent pageTitle={title} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <Heading level="1">{title}</Heading>
        <StorybookLink storybookPath={storybookPath} />
        <Component components={mdxComponents as any} />
      </Stack>
    </DocsContent>
  );
}

function StorybookLink({ storybookPath }: { storybookPath: string | null }) {
  if (!storybookPath) return null;

  return (
    <Box>
      <ButtonLink
        href={`${process.env.NEXT_PUBLIC_STORYBOOK_URL}?path=/story/${storybookPath}`}
        tone="neutral"
      >
        <StorybookLogo />
        Open in Storybook
      </ButtonLink>
    </Box>
  );
}
