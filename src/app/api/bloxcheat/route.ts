import { NextRequest, NextResponse } from "next/server";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json, */*",
};

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q      = sp.get("q") ?? "";
  const page   = sp.get("page") ?? "1";
  const strict = sp.get("strict") === "1";

  let apiUrl: string;
  if (q) {
    const params = new URLSearchParams({ q, page });
    if (strict) params.set("mode", "strict");
    apiUrl = `https://scriptblox.com/api/script/search?${params}`;
  } else {
    const params = new URLSearchParams({ page, max: "20" });
    apiUrl = `https://scriptblox.com/api/script/fetch?${params}`;
  }

  try {
    const res = await fetch(apiUrl, { headers: HEADERS });
    if (!res.ok) return NextResponse.json({ scripts: [], hasMore: false });
    const data = await res.json();
    const scripts = data?.result?.scripts ?? [];
    const hasMore = data?.result?.nextPage != null;
    return NextResponse.json({ scripts, hasMore });
  } catch {
    return NextResponse.json({ scripts: [], hasMore: false });
  }
}
