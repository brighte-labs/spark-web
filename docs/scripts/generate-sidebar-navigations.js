#!/usr/bin/env node

const { readdirSync, writeFileSync, readFileSync, mkdirSync } = require('fs');
const { normalize } = require('path');

const PACKAGE_PATH = normalize(`${__dirname}/../../packages`);
const MANIFEST_DIR = normalize(`${__dirname}/../cache`);

const toTitleCase = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const toSlug = str => {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const processSlug = packageSlug => {
  const name = toSlug(packageSlug).replace(/\.md$/, '');

  // simple check if package is a legitimate package
  JSON.parse(
    readFileSync(normalize(`${PACKAGE_PATH}/${name}/package.json`), 'utf8')
  );

  return {
    name,
  };
};

const getAllPackages = (filePath = PACKAGE_PATH, limit = 0) => {
  const slugs = readdirSync(filePath, { withFileTypes: true });
  const sortedSlugs = slugs.sort(file => (file.name === 'core' ? -1 : 1));
  let files = [];
  for (const s of sortedSlugs) {
    if (s.name.startsWith('_') || s.name.startsWith('.') || !s.isDirectory()) {
      continue;
    }

    try {
      files = [...files, processSlug(s.name)];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('spark-web failed package retrieval', { err });
    }
  }

  return limit ? files.slice(0, limit) : files;
};

const buildSidebarNavigations = () => {
  let navigations = [{ name: 'Home', href: '/' }];
  const ignorePackages = [
    'control-label',
    'core',
    'theme',
    'utils-spark',
    'utils-ts',
    'utils',
  ];

  for (const pkg of getAllPackages()) {
    if (ignorePackages.includes(pkg.name)) {
      continue;
    }

    let name = toTitleCase(pkg.name.replace('-', ' ')).replace(' ', '');
    navigations = [...navigations, { name, href: `/package/${pkg.name}` }];
  }

  return navigations;
};

const writeSidebarNavigations = navigations => {
  mkdirSync(MANIFEST_DIR, { recursive: true });
  writeFileSync(
    `${MANIFEST_DIR}/navigations.json`,
    JSON.stringify({ navigations })
  );
};

const navigations = buildSidebarNavigations();
writeSidebarNavigations(navigations);
