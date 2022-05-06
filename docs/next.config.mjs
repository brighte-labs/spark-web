import withPreconstruct from '@preconstruct/next';
import chokidar from 'chokidar';
// @ts-ignore
import lunr from 'lunr';
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js';
import withPlugins from 'next-compose-plugins';
import { withContentlayer } from 'next-contentlayer';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const generateSearchIndex = () => {
  const MANIFEST_DIR = path.normalize(`${process.cwd()}/cache`);
  const outFile = `${MANIFEST_DIR}/search-index.json`;

  const allPackages = JSON.parse(
    readFileSync('./.contentlayer/generated/Package/_index.json')
  );

  const index = lunr(function () {
    this.ref('slug');
    this.field('title', { boost: 100 });
    this.field('content');

    allPackages.forEach(pkg => {
      this.add({
        slug: pkg.slug,
        content: pkg.body.raw,
        title: pkg.title,
      });
    });
  });

  mkdirSync(MANIFEST_DIR, { recursive: true });
  writeFileSync(outFile, JSON.stringify(index.toJSON()));

  console.log(
    `Generated search index (${path.relative(process.cwd(), outFile)}) from ${
      allPackages.length
    } documents`
  );
};

const withSearchIndex = (nextConfig, { phase }) => {
  return {
    ...nextConfig,
    // We're depending on contentlayer's output (the `.contentlayer` directory)
    // to build our search index.
    // Contentlayer creates that directory in an async way before any next build
    // process is executed.
    // The place they picked to do that was within the async function
    // `redirects`, not because it has anything to do with redirects, but
    // because it's executed before next build, and it's async.
    // Therefore, we have to `await` the `redirects` function that contentlayer
    // creates in order to run _after_ contentlayer.
    redirects: async () => {
      // Wait for contentlayer to do a build
      const redirects = (await nextConfig.redirects?.()) ?? [];

      if ([PHASE_PRODUCTION_BUILD, PHASE_EXPORT].includes(phase)) {
        // In production mode, we need to generate the index before next build
        // occurs so our imports work as expected.
        // We do that once, here.
        generateSearchIndex();
      } else if (phase === PHASE_DEVELOPMENT_SERVER) {
        // In dev mode, we need to setup a process which watches for changes to
        // the `.contentlayer` output, then triggers a re-build of our search
        // index.
        // Beacuse we `import()` the search index file, Webpack will see that
        // the file has changed and trigger a hot-reload of the Next app.
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
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPlugins(
  [
    // Order is important here; we need to run our plugin _after_
    // `withContentlayer` because we depend on contentlayer's output (because of
    // the order of operations, it has to come earlier in the array to be run
    // later... d'oh!)
    withSearchIndex,
    withContentlayer,
    withPreconstruct,
  ],
  nextConfig
);
