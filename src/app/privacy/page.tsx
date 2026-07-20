import type { Metadata } from "next";
import { PrivacyClient } from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review the Spectrum Cheat Privacy Policy to understand what information may be collected, how it is stored, how it is used, and how users can contact Spectrum regarding privacy-related questions or requests.",
  alternates: { canonical: "https://spectrumcheat.com/privacy" },
  openGraph: {
    title: "Privacy Policy | Spectrum Cheat",
    description: "How Spectrum Cheat collects, stores, and uses information.",
    url: "https://spectrumcheat.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
