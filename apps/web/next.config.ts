import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@gopratle/shared'],
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '',
  },
};

export default nextConfig;

