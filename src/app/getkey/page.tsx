import type { Metadata } from "next";
import GetKeyClient from "./getkey-client";

export const metadata: Metadata = {
  title: "Get Key",
  description: "Open the Spectrum key page to access the active unlock route, check which key providers are live, and see which extra routes are still waiting for rollout.",
};

export default function GetKeyPage() {
  return <GetKeyClient />;
}
