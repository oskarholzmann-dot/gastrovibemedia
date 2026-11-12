import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  /** Deutsch ist die Hauptsprache und bleibt unter „/“ erreichbar (siehe src/config/i18n.ts). */
  async rewrites() {
    return [
      { source: "/", destination: "/de" },
      { source: "/ueber-uns", destination: "/de/ueber-uns" },
      { source: "/en/about", destination: "/en/ueber-uns" },
    ];
  },
  async redirects() {
    return [
      { source: "/de", destination: "/", permanent: true },
      { source: "/de/ueber-uns", destination: "/ueber-uns", permanent: true },
      { source: "/en/ueber-uns", destination: "/en/about", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
