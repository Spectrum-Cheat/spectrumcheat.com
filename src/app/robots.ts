import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://spectrumcheat.com/sitemap.xml",
    host: "https://spectrumcheat.com",
  };
}
