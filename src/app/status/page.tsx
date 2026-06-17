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
    title: "Script Status | Spectrum Cheat",
    description:
      "See which Roblox scripts are working right now and which are waiting for updates.",
    url: "https://spectrumcheat.com/status",
  },
};

export default function StatusPage() {
  return <StatusClient />;
}
