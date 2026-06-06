"use client";

import { useEffect } from "react";

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
  // Site-wide: Social Bar + Popunder on every page (including script pages).
  useEffect(() => {
    injectScript(SOCIAL_BAR, "adsterra-socialbar");
    injectScript(POPUNDER, "adsterra-popunder");
  }, []);

  return null;
}
