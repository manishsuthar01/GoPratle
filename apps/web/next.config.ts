import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@gopratle/shared'],
  reactStrictMode: true,
};

export default nextConfig;

