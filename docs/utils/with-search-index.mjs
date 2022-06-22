import chokidar from 'chokidar';
import lunr from 'lunr';
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_EXPORT,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants.js';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function tocToHeadingObj(toc, output = {}) {
  if (!toc || !Array.isArray(toc) || !toc.length) {
    return output;
  }

  toc.forEach(({ level, title, items }) => {
    const levelName = `h${level}`;
    output[levelName] = output[levelName] || [];
    output[levelName].push(title);
    tocToHeadingObj(items, output);
  });

  return output;
}

function extractProps(props = []) {
  // Only interested in the prop names, which happen to be the keys
  return props.flatMap(({ props }) => Object.keys(props));
}

function generateSearchIndex() {
  const MANIFEST_DIR = path.normalize(`${process.cwd()}/cache`);
  const outFile = `${MANIFEST_DIR}/search-index.json`;

  const allPackages = readFileSync(
    './.contentlayer/generated/Package/_index.mjs'
  );

  const index = lunr(function () {
    this.ref('slug');
    this.field('title', { boost: 100 });
    this.field('h1', { boost: 80 });
    this.field('h2', { boost: 70 });
    this.field('h3', { boost: 60 });
    this.field('h4', { boost: 50 });
    this.field('h5', { boost: 40 });
    this.field('h6', { boost: 30 });
    this.field('props', { boost: 20 });
    this.field('content');

    allPackages.forEach(pkg => {
      const headings = tocToHeadingObj(pkg.toc);
      const props = extractProps(pkg.props);
      this.add({
        slug: pkg.slug,
        content: pkg.plaintext,
        title: pkg.title,
        props,
        ...headings,
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
}

export function withSearchIndex(nextConfig, { phase }) {
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
        // Because we `import()` the search index file, Webpack will see that
        // the file has changed and trigger a hot-reload of the Next app.
        chokidar
          .watch(
            path.join(
              process.cwd(),
              '.contentlayer',
              'generated',
              'Package',
              '_index.mjs'
            )
          )
          .on('all', () => {
            generateSearchIndex();
          });
      }
      return redirects;
    },
  };
}
