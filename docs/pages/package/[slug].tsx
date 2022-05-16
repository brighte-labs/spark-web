import { ButtonLink } from '@spark-web/button';
import { Divider } from '@spark-web/divider';
import { Heading } from '@spark-web/heading';
import type { IconProps } from '@spark-web/icon';
import { PencilIcon } from '@spark-web/icon';
import { Inline } from '@spark-web/inline';
import { Link } from '@spark-web/link';
import { Stack } from '@spark-web/stack';
import { Text } from '@spark-web/text';
import { TextLink } from '@spark-web/text-link';
import { GITHUB_URL } from 'components/constants';
import { InlineCode } from 'components/example-helpers';
import { MDXContent } from 'components/mdx-components/mdx-content';
import { allPackages } from 'contentlayer/generated';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { createElement } from 'react';

import { DocsContent } from '../../components/content';
import { StorybookIcon } from '../../components/vectors/fill';
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
  packageName: string;
  packageVersion: string;
  storybookPath: string | null;
  componentMaturityStatus: string;
  title: string;
  toc: HeadingData[];
}> = async ({ params }) => {
  const pkg = allPackages.find(p => p.slug === params!.slug);
  if (!pkg) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      code: pkg.body.code,
      packageName: pkg.packageName,
      packageVersion: pkg.version,
      componentMaturityStatus: pkg.componentMaturityStatus,
      storybookPath: pkg.storybookPath ?? null,
      title: pkg.title,
      toc: pkg.toc,
    },
  };
};

export default function Packages({
  code,
  packageName,
  packageVersion,
  componentMaturityStatus,
  storybookPath,
  title,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const packageSlug = packageName.replace('@spark-web/', '');

  return (
    <DocsContent pageTitle={title} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <Heading level="1">
          {title} - v{packageVersion}
        </Heading>
        <ComponentMaturity componentMaturityStatus={componentMaturityStatus} />
        <Heading level="2" />
        <OpenInLinks packageSlug={packageSlug} storybookPath={storybookPath} />
        <InstallationInstructions
          packageName={packageName}
          packageSlug={packageSlug}
        />
        <Divider />
        <MDXContent code={code} />
      </Stack>
    </DocsContent>
  );
}

function ComponentMaturity({
  componentMaturityStatus,
}: {
  componentMaturityStatus: string;
}) {
  return <div>{componentMaturityStatus}</div>;
}

function OpenInLinks({
  storybookPath,
  packageSlug,
}: {
  storybookPath: string | null;
  packageSlug: string;
}) {
  return (
    <Inline gap="large">
      <StorybookLink storybookPath={storybookPath} />
      <EditThisPageLink packageSlug={packageSlug} />
    </Inline>
  );
}

function ButtonLinkWithIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: (props: IconProps) => JSX.Element | null;
  label: string;
}) {
  return (
    <ButtonLink href={href} tone="neutral">
      {createElement(icon, { size: 'xxsmall' })}
      {label}
    </ButtonLink>
  );
}

function StorybookLink({ storybookPath }: { storybookPath: string | null }) {
  if (!storybookPath) return null;

  return (
    <ButtonLinkWithIcon
      href={`${process.env.NEXT_PUBLIC_STORYBOOK_URL}?path=/story/${storybookPath}`}
      label="Open in Storybook"
      icon={StorybookIcon}
    />
  );
}

function EditThisPageLink({ packageSlug }: { packageSlug: string }) {
  return (
    <ButtonLinkWithIcon
      href={`${GITHUB_URL}/edit/main/packages/${packageSlug}/README.md`}
      label="Edit this page"
      icon={PencilIcon}
    />
  );
}

function InstallationInstructions({
  packageName,
  packageSlug,
}: {
  packageName: string;
  packageSlug: string;
}) {
  return (
    <Stack gap="xlarge">
      <Heading level="2">Installation</Heading>
      <Inline gap="xlarge">
        <Stack gap="xlarge">
          <Text>
            Install <InlineCode>{`yarn add ${packageName}`}</InlineCode>
          </Text>
          <Text>
            npm{' '}
            <Link href={`https://www.npmjs.com/package/${packageName}`}>
              <InlineCode>{packageName}</InlineCode>
            </Link>
          </Text>
        </Stack>
        <Stack gap="xlarge">
          <Inline>
            <Text>
              Source{' '}
              <TextLink
                href={`${GITHUB_URL}/tree/main/packages/${packageSlug}`}
              >
                GitHub.com
              </TextLink>
            </Text>
          </Inline>
          <Text>
            Bundle{' '}
            <TextLink href={`https://unpkg.com/@spark-web/${packageSlug}/`}>
              unpkg.com
            </TextLink>
          </Text>
        </Stack>
      </Inline>
    </Stack>
  );
}
