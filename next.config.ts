import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cs617-final-project",
  assetPrefix: "/cs617-final-project/",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;