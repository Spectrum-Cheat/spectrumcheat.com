import type { Metadata } from "next";
import ExecutorsClient from "./executors-client";

interface Exploit {
  title: string; version: string; updatedDate: string; updateStatus: boolean;
  free: boolean; detected: boolean; cost: string; platform: string; extype: string;
  uncPercentage: number; suncPercentage: number; keysystem: boolean;
  websitelink: string; discordlink: string; purchaselink: string;
}

interface VersionsData {
  Windows?: string; WindowsDate?: string; Mac?: string; MacDate?: string;
  Android?: string; AndroidDate?: string;
}

const WEAO_HEADERS = { "User-Agent": "WEAO-3PService" };

async function fetchExploits(): Promise<Exploit[]> {
  try {
    const res = await fetch("https://weao.xyz/api/status/exploits", { headers: WEAO_HEADERS, next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

async function fetchVersions(): Promise<VersionsData | null> {
  try {
    const res = await fetch("https://weao.xyz/api/versions/current", { headers: WEAO_HEADERS, next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export const metadata: Metadata = {
  title: "Executors",
  description: "Browse live executor status, version info, and compatibility data for Roblox script executors — powered by WEAO.",
};

export default async function ExecutorsPage() {
  const [exploits, versions] = await Promise.all([fetchExploits(), fetchVersions()]);
  return <ExecutorsClient exploits={exploits} versions={versions} />;
}
