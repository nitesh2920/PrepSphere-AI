import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 👈 This disables ESLint during production builds (e.g., on Vercel)
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  // Enable standalone output for Docker
  output: 'standalone',
};

export default nextConfig;
