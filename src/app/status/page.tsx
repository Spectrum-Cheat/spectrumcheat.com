import type { Metadata } from "next";
import StatusClient from "./status-client";

export const metadata: Metadata = {
  title: "Script Status",
  description:
    "Track the live Spectrum status board to see which Roblox scripts are working right now, which titles are waiting for updates, and which older entries have already left the active lineup.",
  keywords: [
    "Roblox script status",
    "working Roblox scripts",
    "Spectrum status",
    "script update status",
    "Spectrum Cheat",
  ],
  alternates: { canonical: "https://spectrumcheat.com/status" },
  openGraph: {
    type: "website",
    siteName: "Spectrum Cheat",
    title: "Script Status | Spectrum Cheat",
    description:
      "See which Roblox scripts are working right now and which are waiting for updates.",
    url: "https://spectrumcheat.com/status",
    images: [{ url: "/images/Spectrum Cheat Banner.png", width: 2000, height: 600, alt: "Spectrum Cheat — Script Status" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Script Status | Spectrum Cheat",
    description: "See which Roblox scripts are working right now and which are waiting for updates.",
    images: ["/images/Spectrum Cheat Banner.png"],
  },
};

export default function StatusPage() {
  return <StatusClient />;
}
