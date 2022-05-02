import untitledLiveCode from '@untitled-docs/live-code/rehype/dist/live-code.cjs.js';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { readFile } from 'node:fs/promises';
import remarkGfm from 'remark-gfm';

import { generateToc } from './utils/generate-toc';

export const Home = defineDocumentType(() => ({
  name: 'Home',
  filePathPattern: 'docs/pages/index.md',
  isSingleton: true,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the package',
      required: true,
    },
  },
  computedFields: {
    toc: {
      type: 'json',
      resolve: async doc => generateToc(doc.body.raw),
    },
  },
}));

export const Package = defineDocumentType(() => ({
  name: 'Package',
  filePathPattern: 'packages/**/README.md',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the package',
      required: true,
    },
    storybookPath: {
      type: 'string',
      description: 'Path for Storybook',
      required: false,
    },
  },
  computedFields: {
    packageName: {
      type: 'string',
      resolve: async pkg => {
        return JSON.parse(
          (
            await readFile(`../${pkg._raw.sourceFileDir}/package.json`)
          ).toString()
        ).name;
      },
    },
    slug: {
      type: 'string',
      resolve: pkg => pkg._raw.sourceFileDir.replace(/^packages\//, ''),
    },
    version: {
      type: 'string',
      resolve: async pkg => {
        return JSON.parse(
          (
            await readFile(`../${pkg._raw.sourceFileDir}/package.json`)
          ).toString()
        ).version;
      },
    },
    toc: {
      type: 'json',
      resolve: async doc => generateToc(doc.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: '../',
  contentDirInclude: ['docs/pages', 'packages'],
  documentTypes: [Package, Home],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [untitledLiveCode.plugin],
  },
});
