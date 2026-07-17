import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "26.104.42.5"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
