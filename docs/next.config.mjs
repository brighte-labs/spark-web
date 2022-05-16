import withPreconstruct from '@preconstruct/next';
import withPlugins from 'next-compose-plugins';
import { withContentlayer } from 'next-contentlayer';

import { withSearchIndex } from './utils/with-search-index.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPlugins(
  [
    // Order is important here
    // We need to run our plugin _after_ `withContentlayer` because we depend
    // on contentlayer's output.
    // Because of the order of operations, it has to come earlier in the array
    // to be run later!
    withSearchIndex,
    withContentlayer,
    withPreconstruct,
  ],
  nextConfig
);
