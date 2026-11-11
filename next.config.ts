import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  /** Deutsch ist die Hauptsprache und bleibt unter „/“ erreichbar (siehe src/config/i18n.ts). */
  async rewrites() {
    return [{ source: "/", destination: "/de" }];
  },
  async redirects() {
    return [{ source: "/de", destination: "/", permanent: true }];
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
