import type { Metadata } from "next";
import HistoryClient from "./history-client";

export const metadata: Metadata = {
  title: "History",
  description: "View your purchase and top-up history on Spectrum Cheat.",
  alternates: { canonical: "https://spectrumcheat.com/history" },
  // Personal account page — nothing here is useful to search, and it
  // shouldn't show up when someone searches a user's balance/activity.
  robots: { index: false, follow: false },
  openGraph: {
    title: "History | Spectrum Cheat",
    description: "View your purchase and top-up history on Spectrum Cheat.",
    url: "https://spectrumcheat.com/history",
  },
};

export default function HistoryPage() {
  return <HistoryClient />;
}
