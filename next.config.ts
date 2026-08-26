import { spawnSync } from 'node:child_process';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withSerwistInit from '@serwist/next';

const withNextIntl = createNextIntlPlugin();

const revision = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' })
  .stdout?.trim() ?? crypto.randomUUID();

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  // Required for the optional Dockerfile (see README > Docker support).
  // Remove this line if you delete Dockerfile/.dockerignore for this project.
  output: 'standalone',
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: { test?: RegExp }) =>
      rule.test?.test?.('.svg'),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default withSerwist(withNextIntl(nextConfig));