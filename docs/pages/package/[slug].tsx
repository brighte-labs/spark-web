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
import remarkGfm from 'remark-gfm';

import { DocsContent } from '../../components/content';
import { StorybookLogo } from '../../components/logo';
import { mdxComponents } from '../../components/mdx-components/mdx-components';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPackages.map(pkg => `/package/${pkg.slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  code: string;
  storybookPath?: string;
  title: string;
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
        untitledLiveCode,
      ];
      return options;
    },
  });

  return {
    props: {
      code,
      storybookPath: pkg.storybookPath,
      title: pkg.title,
    },
  };
};

export default function Packages({
  code,
  storybookPath,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <DocsContent pageTitle={title} includeNavigation toc={[]}>
      <Stack gap="xlarge">
        <Heading level="1">{title}</Heading>
        <StorybookLink storybookPath={storybookPath} />
        <Component components={mdxComponents as any} />
      </Stack>
    </DocsContent>
  );
}

function StorybookLink({ storybookPath }: { storybookPath?: string }) {
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
