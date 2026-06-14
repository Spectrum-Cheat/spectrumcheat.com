"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  "/shop/images/volt.png",
];

const STORAGE_KEY = "spectrum-popup-hide-until";

export function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const hideUntil = localStorage.getItem(STORAGE_KEY);
    if (hideUntil && Date.now() < Number(hideUntil)) return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); }, 250);
  };

  const hideForDay = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + 86400000));
    close();
  };

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);

  if (!visible) return null;

  return (
    <>
      <div className="promo-backdrop" onClick={close} />
      <div className={`promo-popup${closing ? " closing" : ""}`}>
        <div className="promo-slider">
          {SLIDES.map((src, i) => (
            <div key={src} className={`promo-slide${i === current ? " active" : ""}`}>
              <Image src={src} alt={`promo ${i + 1}`} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
          {SLIDES.length > 1 && (
            <>
              <button className="promo-arrow left" onClick={prev}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button className="promo-arrow right" onClick={next}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              <div className="promo-dots">
                {SLIDES.map((_, i) => (
                  <button key={i} className={`promo-dot${i === current ? " active" : ""}`} onClick={() => setCurrent(i)} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="promo-top-bar">
          <button className="promo-close-btn" onClick={close}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            เข้าสู่เว็บไซต์
          </button>
          <button className="promo-hide-btn" onClick={hideForDay}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            ไม่แสดงผลอีกครั้งใน 1 วัน
          </button>
        </div>
      </div>
    </>
  );
}
