import type { NextConfig } from 'next';
import nextra from 'nextra';
import { version } from './package.json';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // mandatory, otherwise won't export
  },
  env: {
    APP_VERSION: version,
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH,
  },
  basePath: process.env.BASE_PATH,
  assetPrefix: process.env.BASE_PATH,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
};

const withNextra = nextra({
  // ... Other Nextra config options
  unstable_shouldAddLocaleToLinks: true,
});

export default withNextra(nextConfig);
