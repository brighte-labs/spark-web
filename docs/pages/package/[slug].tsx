import { Heading } from '@spark-web/heading';
import { Stack } from '@spark-web/stack';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { MDXRemote } from 'next-mdx-remote';

import { DocsContent } from '../../components/content';
import { StorybookLogo } from '../../components/logo';
import { mdxComponents } from '../../components/mdx-components/mdx-components';
import { Box, ButtonLink } from '../../components/spark-components';
import type { Awaited } from '../../types';
import { getAllPackages, getPackageBySlug } from '../../utils/mdx';

export const getStaticPaths: GetStaticPaths = async () => {
  const packages = await getAllPackages();

  return {
    paths: packages.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  packages: Awaited<ReturnType<typeof getAllPackages>>;
  source: Awaited<ReturnType<typeof getPackageBySlug>>['source'];
  data: Awaited<ReturnType<typeof getPackageBySlug>>['data'];
  toc: Awaited<ReturnType<typeof getPackageBySlug>>['toc'];
}> = async ({ params }) => {
  const packages = await getAllPackages();

  if (!params?.slug || typeof params.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  const { data, source, toc /* name, slug, version */ } =
    await getPackageBySlug(params.slug);

  return {
    props: {
      data,
      packages,
      source,
      toc,
    },
  };
};

export default function Packages({
  data,
  source,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <DocsContent pageTitle={data.title} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <Heading level="1">{data.title}</Heading>
        {data?.storybookPath && (
          <Box>
            <ButtonLink
              // TODO: Change this button variant to hollow or outline when it's added
              href={`/storybook/index.html?path=/story/${data.storybookPath}`}
            >
              <StorybookLogo />
              Open in Storybook
            </ButtonLink>
          </Box>
        )}
        <MDXRemote {...source} components={mdxComponents} />
      </Stack>
    </DocsContent>
  );
}
