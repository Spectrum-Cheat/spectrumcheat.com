import type { Metadata } from "next";
import { TermsClient } from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Spectrum Cheat Terms of Service to review access rules, service boundaries, payment expectations, and the responsibilities tied to using the Spectrum platform and its related services.",
  alternates: { canonical: "https://spectrumcheat.com/terms" },
  openGraph: {
    title: "Terms of Service | Spectrum Cheat",
    description: "Access rules, service boundaries, and responsibilities for using Spectrum Cheat.",
    url: "https://spectrumcheat.com/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
