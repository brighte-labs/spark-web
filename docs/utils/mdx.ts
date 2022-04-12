import { plugin as rehypeLiveCode } from '@untitled-docs/live-code/rehype';
import { readdirSync, readFileSync } from 'fs';
import parseMarkdown from 'gray-matter';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { normalize } from 'path';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkHint from 'remark-hint';

import type { HeadingData } from './generate-toc';
import { generateToc } from './generate-toc';
import { toSlug } from './to-slug';

type MarkDown = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  data: {
    [key: string]: any;
  };
  toc: HeadingData[];
};

export async function getMarkdown(filePath: string): Promise<MarkDown> {
  const fileContents = readFileSync(filePath, 'utf8');

  const { data, content } = parseMarkdown(fileContents);

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkHint, remarkGfm],
      rehypePlugins: [rehypeLiveCode, rehypeSlug],
    },
    scope: data,
  });

  const toc = generateToc(content);

  return {
    source,
    data,
    toc,
  };
}

type PackageData = {
  slug: string;
  name: string;
  version: string;
} & MarkDown;

const PACKAGE_PATH = normalize(`${process.cwd()}../../packages`);

export async function getPackageBySlug(
  packageSlug: string
): Promise<PackageData> {
  const slug = toSlug(packageSlug).replace(/\.md$/, '');
  const filePath = normalize(`${PACKAGE_PATH}/${slug}/README.md`);
  const { name, version } = JSON.parse(
    readFileSync(normalize(`${PACKAGE_PATH}/${slug}/package.json`), 'utf8')
  );

  const data = await getMarkdown(filePath);

  return {
    ...data,
    slug,
    name,
    version,
  };
}

export async function getMarkdownContentFromPath(
  path: string
): Promise<Omit<PackageData, 'slug' | 'name' | 'version'>> {
  const filePath = normalize(path);

  const data = await getMarkdown(filePath);

  return data;
}

export async function getAllPackages(
  filePath = PACKAGE_PATH,
  limit = 0
): Promise<PackageData[]> {
  const slugs = readdirSync(filePath, { withFileTypes: true });
  const sortedSlugs = slugs.sort(file => (file.name === 'core' ? -1 : 1));
  let files: PackageData[] = [];
  for (const s of sortedSlugs) {
    if (s.name.startsWith('_') || s.name.startsWith('.') || !s.isDirectory()) {
      continue;
    }

    try {
      files = [...files, await getPackageBySlug(s.name)];
    } catch (err) {
      console.warn('spark-web failed package retrieval', { err });
    }
  }

  return limit ? files.slice(0, limit) : files;
}
