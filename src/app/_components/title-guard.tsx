"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Some ad networks (Adsterra popunder / social bar) hijack document.title
 * with bait like "(1) New Message!" when the tab loses focus. This guard
 * remembers the real per-page title and reverts any change the ad makes.
 */
export function TitleGuard() {
  const pathname = usePathname();
  const realTitle = useRef("");

  // Capture the legit title shortly after each navigation (after Next sets it).
  useEffect(() => {
    const t = setTimeout(() => { realTitle.current = document.title; }, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const titleEl = document.querySelector("title");
    if (!titleEl) return;
    const obs = new MutationObserver(() => {
      if (realTitle.current && document.title !== realTitle.current) {
        document.title = realTitle.current; // revert ad hijack
      }
    });
    obs.observe(titleEl, { childList: true });
    return () => obs.disconnect();
  }, []);

  return null;
}
