import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  // Enable SASS/SCSS support
  sassOptions: {
    includePaths: ['./src/app/styles'],
  },
}

export default nextConfig;
