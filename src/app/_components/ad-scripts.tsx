"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Pages where ads should NOT load (kept clean).
const NO_AD_PATHS = ["/about/zpu"];

// Site-wide Adsterra scripts.
const SOCIAL_BAR =
  "https://pl29652067.effectivecpmnetwork.com/4c/44/c6/4c44c62d8a4d29a04afe8743c21b91ae.js";
const POPUNDER =
  "https://pl29652068.effectivecpmnetwork.com/ce/a6/a5/cea6a5388a13ce2632d1b3d9886ee77f.js";

function injectScript(src: string, id: string) {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const s = document.createElement("script");
  s.src = src;
  s.id = id;
  s.async = true;
  document.body.appendChild(s);
}

export function AdScripts() {
  const pathname = usePathname();

  // Site-wide: Social Bar + Popunder on every page, except clean pages (/about/zpu).
  useEffect(() => {
    if (NO_AD_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) return;
    injectScript(SOCIAL_BAR, "adsterra-socialbar");
    const timer = setTimeout(() => {
      injectScript(POPUNDER, "adsterra-popunder");
    }, 25000); // delay 25 วิก่อนโหลด popunder
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
