#!/usr/bin/env node
const { writeFileSync, mkdirSync } = require('fs');
const { normalize } = require('path');
const allPackages = require('../.contentlayer/generated/Package/_index.json');
const { Document } = require('flexsearch');

(async () => {
  const MANIFEST_DIR = normalize(`${__dirname}/../cache`);

  const index = new Document({
    document: {
      id: 'slug',
      index: ['content'],
    },
  });

  // const paths = allPackages.map(pkg => `/package/${pkg.slug}`);

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

  // code goes here
})();
