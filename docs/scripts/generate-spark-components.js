#!/usr/bin/env node

const { readdirSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
const { normalize } = require('path');

const PACKAGE_PATH = normalize(`${__dirname}/../../packages`);
const MANIFEST_DIR = normalize(`${__dirname}/../cache`);

const ignoreDirs = ['core', 'theme', 'analytics', 'ssr', 'next-utils'];

const packageNames = readdirSync(PACKAGE_PATH, { withFileTypes: true })
  .filter(
    dirent =>
      !ignoreDirs.includes(dirent.name) &&
      !dirent.name.startsWith('_') &&
      !dirent.name.startsWith('.') &&
      dirent.isDirectory()
  )
  .map(dirent => {
    /* legitimate errors:
     * - package.json doesn't exist
     * - invalid JSON
     * - JSON value is null
     */
    const { name } = JSON.parse(
      readFileSync(
        normalize(`${PACKAGE_PATH}/${dirent.name}/package.json`),
        'utf8'
      )
    );

    if (!name) throw new Error('Package name not defined');

    return name;
  });

mkdirSync(MANIFEST_DIR, { recursive: true });
writeFileSync(
  `${MANIFEST_DIR}/spark-components.ts`,
  ['../components/example-helpers', ...packageNames]
    .map(name => `export * from '${name}';`)
    .join('\n')
);
