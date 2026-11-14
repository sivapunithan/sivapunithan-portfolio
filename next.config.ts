import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: noticeably cleaner on painted gradients than WebP at the same size.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
