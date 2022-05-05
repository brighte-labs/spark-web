import withPreconstruct from '@preconstruct/next';
import chokidar from 'chokidar';
// @ts-ignore
import flexSearch from 'flexsearch';
import withPlugins from 'next-compose-plugins';
import { withContentlayer } from 'next-contentlayer';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const { Document: FlexDocument } = flexSearch;

const generateSearchIndex = () => {
  const MANIFEST_DIR = path.normalize(`${process.cwd()}/cache`);

  const index = new FlexDocument({
    document: {
      id: 'slug',
      index: ['content'],
    },
  });

  // const paths = allPackages.map(pkg => `/package/${pkg.slug}`);

  const allPackages = JSON.parse(
    readFileSync('./.contentlayer/generated/Package/_index.json')
  );

  allPackages.forEach(pkg => {
    index.add({
      slug: pkg.slug,
      content: pkg.body.raw,
    });
  });

  let dataSearchIndex = [];

  index.export(function (key, data) {
    // you need to store both the key and the data!
    // e.g. use the key for the filename and save your data
    dataSearchIndex.push({ key, data });
  });

  mkdirSync(MANIFEST_DIR, { recursive: true });
  writeFileSync(
    `${MANIFEST_DIR}/search-index.json`,
    JSON.stringify(dataSearchIndex)
  );
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPlugins(
  [
    nextConfig => {
      const isBuild = process.argv.includes('build');
      const contentLayerConfig = withContentlayer(nextConfig);
      return {
        ...contentLayerConfig,
        redirects: async () => {
          // Wait for contentlayer to do a build
          const redirects = await contentLayerConfig.redirects?.();

          if (isBuild) {
            // Do a single build of search index
            generateSearchIndex();
          } else {
            // Watch for file changes that content layer outputs to re-build our
            // search index
            chokidar
              .watch(
                path.join(
                  process.cwd(),
                  '.contentlayer',
                  'generated',
                  'Package',
                  '_index.json'
                )
              )
              .on('all', () => {
                generateSearchIndex();
              });
          }
          return redirects;
        },
      };
    },
    withPreconstruct,
  ],
  nextConfig
);
