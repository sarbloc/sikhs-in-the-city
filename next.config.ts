import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    // Contentful CDN — allowed so it keeps working if image optimization is
    // ever re-enabled (currently a no-op while `unoptimized` is set).
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
  },
};

export default nextConfig;
