import type { Metadata } from "next";
import { RefundClient } from "./refund-client";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Review the Spectrum Cheat Refund Policy to understand purchase expectations, refund eligibility, dispute handling, and what users should know after completing checkout for Spectrum access.",
  alternates: { canonical: "https://spectrumcheat.com/refund-policy" },
  openGraph: {
    title: "Refund Policy | Spectrum Cheat",
    description: "Purchase expectations, refund eligibility, and dispute handling for Spectrum access.",
    url: "https://spectrumcheat.com/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return <RefundClient />;
}
