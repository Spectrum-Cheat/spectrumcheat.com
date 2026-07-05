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
      {
        source: "/zpu",
        destination: "/about/zpu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
