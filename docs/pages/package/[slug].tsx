import { Alert } from '@spark-web/alert';
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
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { createElement } from 'react';
import type { ComponentDoc } from 'react-docgen-typescript';

import { allPackages } from '../../.contentlayer/generated';
import { GITHUB_URL } from '../../components/constants';
import { DocsContent } from '../../components/content';
import { InlineCode } from '../../components/example-helpers';
import type { DataContextType } from '../../components/mdx-components/mdx-components';
import { MDXContent } from '../../components/mdx-components/mdx-content';
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
  isExperimentalPackage: boolean;
  title: string;
  toc: HeadingData[];
  propsDoc: any;
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
      isExperimentalPackage: Boolean(pkg.isExperimentalPackage),
      storybookPath: pkg.storybookPath ?? null,
      title: pkg.title,
      toc: pkg.toc,
      propsDoc: formatPropsData(pkg.props),
    },
  };
};

const formatPropsData = (
  originalPropsData: ComponentDoc[]
): Record<string, DataContextType> =>
  originalPropsData
    .map(propsData => ({
      displayName: propsData.displayName,
      props: Object.entries(propsData.props)
        .map(([key, prop]) => {
          let type = prop.type.name;
          if (prop.type.name === 'enum') {
            if (prop.type.raw) {
              if (
                prop.type.raw.includes('|') ||
                ['boolean' /* TODO: more? */].includes(prop.type.raw)
              ) {
                type = prop.type.raw;
              } else {
                type = `${prop.type.raw}: ${prop.type.value
                  .map(({ value }: { value: any }) => value)
                  .join(' | ')}`;
              }
            } else if (prop.type.value) {
              type = prop.type.value
                .map(({ value }: { value: any }) => value)
                .join(' | ');
            }
          }

          return {
            name: key,
            required: prop.required,
            type,
            ...(typeof prop.defaultValue?.value !== 'undefined' && {
              defaultValue: prop.defaultValue.value,
            }),
            description: prop.description,
          };
        })
        // Sort the required props before the non-required props,
        // Then sort alphabetically
        .sort((a, b) => {
          // If they have different required-ness, sort them in different buckets
          if (a.required !== b.required) {
            if (a.required) {
              return -1;
            } else {
              return 1;
            }
          }
          // Alphabetically sort the props if they're in the same required-ness
          // bucket
          return a.name.localeCompare(b.name);
        }),
    }))
    .reduce(
      (memo, { displayName, ...rest }) => ({
        ...memo,
        [displayName]: rest,
      }),
      {}
    );

export default function Packages({
  code,
  packageName,
  packageVersion,
  isExperimentalPackage,
  storybookPath,
  title,
  toc,
  propsDoc,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const packageSlug = packageName.replace('@spark-web/', '');

  return (
    <DocsContent pageTitle={title} includeNavigation toc={toc}>
      <Stack gap="xlarge">
        <Text tone="muted">v{packageVersion}</Text>
        <Heading level="1">{title}</Heading>
        <ComponentMaturity isExperimentalPackage={isExperimentalPackage} />
        <OpenInLinks packageSlug={packageSlug} storybookPath={storybookPath} />
        <InstallationInstructions
          packageName={packageName}
          packageSlug={packageSlug}
        />
        <Divider />
        <MDXContent code={code} data={{ props: propsDoc }} />
      </Stack>
    </DocsContent>
  );
}

function ComponentMaturity({
  isExperimentalPackage,
}: {
  isExperimentalPackage: boolean;
}) {
  return (
    <Alert
      tone={isExperimentalPackage ? 'caution' : 'positive'}
      heading={isExperimentalPackage ? 'Experimental' : 'Stable'}
    >
      <Text>
        This component is considered{' '}
        {isExperimentalPackage ? 'experimental' : 'stable'}. Reach out to the
        Spark team to find out more about what this means.
      </Text>
    </Alert>
  );
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
