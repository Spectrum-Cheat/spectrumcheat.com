import type { Metadata } from "next";
import GetKeyClient from "./getkey-client";

export const metadata: Metadata = {
  title: "Get Key Access",
  description:
    "Open the Spectrum key page to access the active unlock route, check which key providers are live, and see which extra routes are still waiting for rollout.",
  keywords: [
    "Spectrum key",
    "Spectrum Cheat key",
    "get key",
    "Roblox script key system",
    "key provider",
  ],
  alternates: { canonical: "https://spectrumcheat.com/getkey" },
  openGraph: {
    type: "website",
    siteName: "Spectrum Cheat",
    title: "Get Key Access | Spectrum Cheat",
    description:
      "Access the active unlock route and check which key providers are live for Spectrum Cheat.",
    url: "https://spectrumcheat.com/getkey",
    images: [{ url: "/images/Spectrum Cheat Banner.png", width: 2000, height: 600, alt: "Spectrum Cheat — Get Key" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Key Access | Spectrum Cheat",
    description: "Access the active unlock route and check which key providers are live.",
    images: ["/images/Spectrum Cheat Banner.png"],
  },
};

export default function GetKeyPage() {
  return <GetKeyClient />;
}
