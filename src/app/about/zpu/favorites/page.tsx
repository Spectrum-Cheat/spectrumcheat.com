import type { Metadata } from "next";
import { ZpuFavorites } from "./favorites-client";

export const metadata: Metadata = {
  title: { absolute: "ZPU's Favorites | Games, Movies, Anime, Books & More" },
  description:
    "Everything ZPU (xZPUHigh) is into — favorite games, movies, series, anime, manga, books, artists, cars and sports, all in one place.",
  keywords: [
    "ZPU favorites",
    "xZPUHigh favorites",
    "ZPU favorite games",
    "ZPU favorite movies",
    "ZPU favorite anime",
    "ZPU favorite manga",
    "ZPU favorite books",
    "ZPU favorite music",
    "ZPU favorite artists",
    "ZPU favorite cars",
    "ZPU favorite sports",
    "ZPU interests",
    "ZPU hobbies",
    "ZPU collections",
    "ZPU ชอบอะไร",
    "ZPU เกมที่ชอบ",
    "ZPU หนังที่ชอบ",
    "ZPU อนิเมะที่ชอบ",
    "Spectrum Cheat founder favorites",
  ],
  alternates: {
    canonical: "https://spectrumcheat.com/about/zpu/favorites",
  },
  openGraph: {
    title: "ZPU's Favorites | Games, Movies, Anime, Books & More",
    description:
      "Everything ZPU (xZPUHigh) is into — games, movies, series, anime, manga, books, artists, cars and sports.",
    url: "https://spectrumcheat.com/about/zpu/favorites",
    type: "profile",
    images: [
      { url: "https://spectrumcheat.com/images/benner_1.png", width: 6144, height: 1015, alt: "ZPU — Favorites" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZPU's Favorites | Games, Movies, Anime, Books & More",
    description: "Everything ZPU (xZPUHigh) is into, in one place.",
    images: ["https://spectrumcheat.com/images/benner_1.png"],
  },
};

// Tells search engines this page belongs to the same person as /about/zpu
// instead of looking like a second, unrelated profile.
const favoritesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ZPU's Favorites",
  url: "https://spectrumcheat.com/about/zpu/favorites",
  about: {
    "@type": "Person",
    name: "ZPU",
    alternateName: ["xZPUHigh", "Chanon", "Non"],
    url: "https://spectrumcheat.com/about/zpu",
  },
  isPartOf: {
    "@type": "ProfilePage",
    url: "https://spectrumcheat.com/about/zpu",
  },
};

export default function ZpuFavoritesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(favoritesJsonLd) }}
      />
      <ZpuFavorites />
    </>
  );
}
