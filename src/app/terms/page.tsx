import type { Metadata } from "next";
import { TermsClient } from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Spectrum Cheat Terms of Service to review access rules, service boundaries, payment expectations, and the responsibilities tied to using the Spectrum platform and its related services.",
  alternates: { canonical: "https://spectrumcheat.com/terms" },
};

export default function TermsPage() {
  return <TermsClient />;
}
