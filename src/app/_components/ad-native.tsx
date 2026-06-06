"use client";

import { useEffect, useRef } from "react";

// Adsterra Native Banner — loads an async script that fills a container div.
const NATIVE_SRC =
  "https://pl29652066.effectivecpmnetwork.com/9bc5503bc01591787cf801ade8d0a437/invoke.js";
const NATIVE_CONTAINER_ID = "container-9bc5503bc01591787cf801ade8d0a437";

export function AdNative({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avoid loading the invoke script more than once.
    if (document.getElementById("adsterra-native-script")) return;
    const s = document.createElement("script");
    s.src = NATIVE_SRC;
    s.async = true;
    s.id = "adsterra-native-script";
    s.setAttribute("data-cfasync", "false");
    document.body.appendChild(s);
  }, []);

  return (
    <div className={`ad-native ${className ?? ""}`} ref={ref}>
      <div id={NATIVE_CONTAINER_ID} />
    </div>
  );
}
