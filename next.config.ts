import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 defaults to qualities: [75] only — other values 400.
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
