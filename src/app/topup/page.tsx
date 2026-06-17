import type { Metadata } from "next";
import TopupClient from "./topup-client";

export const metadata: Metadata = {
  title: "Top Up",
  description: "Add balance to your Spectrum Cheat account instantly via TrueMoney gift envelope or bank transfer.",
  alternates: { canonical: "https://spectrumcheat.com/topup" },
  openGraph: {
    title: "Top Up | Spectrum Cheat",
    description: "Add balance to your Spectrum Cheat account instantly.",
    url: "https://spectrumcheat.com/topup",
  },
};

export default function TopupPage() {
  return <TopupClient />;
}
