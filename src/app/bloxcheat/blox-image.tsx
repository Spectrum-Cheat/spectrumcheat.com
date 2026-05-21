"use client";

import { useState } from "react";

function getImageUrl(image: string): string {
  if (image.startsWith("http")) return image;
  // image field starts with "/" e.g. "/images/script/xxx.webp"
  return `https://scriptblox.com${image}`;
}

export function BloxImage({ image, title }: { image?: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div className="blox-thumb-placeholder">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "var(--accent)", opacity: 0.3 }}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getImageUrl(image)}
      alt={title}
      className="blox-thumb-img"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
