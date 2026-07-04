import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/C3MpUNwsDU",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
