import type { Metadata } from "next";
import { SecurityClient } from "./security-client";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Read the Spectrum Cheat Security page for platform safety notes, access-flow protections, payment handling guidance, and other security-related details relevant to Spectrum users and account holders.",
  alternates: { canonical: "https://spectrumcheat.com/security" },
  openGraph: {
    title: "Security | Spectrum Cheat",
    description: "Platform safety notes, access-flow protections, and payment handling guidance.",
    url: "https://spectrumcheat.com/security",
  },
};

export default function SecurityPage() {
  return <SecurityClient />;
}
