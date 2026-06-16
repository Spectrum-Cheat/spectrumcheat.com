"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const BEAMS = [
  { left: "8%",  height: 130, duration: 3.2, delay: 0    },
  { left: "18%", height: 90,  duration: 4.5, delay: 1.8, sm: true },
  { left: "30%", height: 110, duration: 2.8, delay: 0.6  },
  { left: "52%", height: 80,  duration: 5.0, delay: 3.0, sm: true },
  { left: "68%", height: 140, duration: 3.6, delay: 1.2  },
  { left: "80%", height: 95,  duration: 4.0, delay: 2.4, sm: true },
  { left: "92%", height: 120, duration: 3.0, delay: 0.9  },
];

export function FallingBeams() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="getkey-beams" aria-hidden="true">
      {BEAMS.map((b, i) => (
        <div
          key={i}
          className={`gk-beam${b.sm ? " gk-beam-sm" : ""}`}
          style={{
            left: b.left,
            height: b.height,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>,
    document.body
  );
}
