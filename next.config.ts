import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: { test?: RegExp }) =>
      rule.test?.test?.('.svg'),
    );

    if (fileLoaderRule) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/, 
        use: ['@svgr/webpack'],
      });

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default withNextIntl(nextConfig);
