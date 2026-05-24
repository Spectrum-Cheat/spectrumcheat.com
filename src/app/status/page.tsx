import type { Metadata } from "next";
import StatusClient from "./status-client";

export const metadata: Metadata = {
  title: "Live Status",
  description: "Track the live Spectrum status board to see which Roblox scripts are working right now, which titles are waiting for updates, and which older entries have already left the active lineup.",
};

export default function StatusPage() {
  return <StatusClient />;
}
