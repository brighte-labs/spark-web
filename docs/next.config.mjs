import withPreconstruct from '@preconstruct/next';
import withPlugins from 'next-compose-plugins';
import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPlugins([withContentlayer, withPreconstruct], nextConfig);
