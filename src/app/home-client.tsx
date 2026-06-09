"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MarketingHeader } from "./_components/marketing-header";
import { SiteFooter } from "./_components/site-footer";
import { AdResponsive } from "./_components/ad-banner";
import { useLang } from "./_i18n/context";

const supportedGames = [
  { name: "Blox Fruits",              image: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/256/256/Image/Webp/noFilter", badge: "BF",  href: "https://www.roblox.com/games/2753915549/Blox-Fruits" },
  { name: "King Legacy",              image: "https://tr.rbxcdn.com/180DAY-2b339527dbcd7808790f274f8a9c9aab/256/256/Image/Webp/noFilter", badge: "KL",  href: "https://www.roblox.com/games/4520749081/King-Legacy" },
  { name: "Driving Empire",           image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/256/256/Image/Webp/noFilter", badge: "DE",  href: "https://www.roblox.com/games/3351674303/Driving-Empire-Car-Racing" },
  { name: "Fisch",                    image: "https://tr.rbxcdn.com/180DAY-911933467f0dc8e467cf3e305ea78882/256/256/Image/Webp/noFilter", badge: "FI",  href: "https://www.roblox.com/games/16732694052/Fisch" },
  { name: "Rivals",                   image: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/256/256/Image/Webp/noFilter", badge: "RV",  href: "https://www.roblox.com/games/17625359962/RIVALS" },
  { name: "Sailor Piece",             image: "https://tr.rbxcdn.com/180DAY-af4eed326351cb513869c431e3d88787/256/256/Image/Webp/noFilter", badge: "SP",  href: "https://www.roblox.com/games/77747658251236/Sailor-Piece" },
  { name: "Steal a Brainrot",         image: "https://tr.rbxcdn.com/180DAY-1676319b53fd6fca7765674d84f36f3d/256/256/Image/Webp/noFilter", badge: "SB",  href: "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot" },
  { name: "Pet Simulator 99",         image: "https://tr.rbxcdn.com/180DAY-03854432095bc666d812e935e8aa758f/256/256/Image/Webp/noFilter", badge: "P99", href: "https://www.roblox.com/games/8737899170/Pet-Simulator-99" },
  { name: "The Strongest Battlegrounds", image: "https://tr.rbxcdn.com/180DAY-85755b822cee060522bc974f98924350/256/256/Image/Webp/noFilter", badge: "TSB", href: "https://www.roblox.com/games/10449761463/The-Strongest-Battlegrounds" },
  { name: "Dead Rails",               image: "https://tr.rbxcdn.com/180DAY-f305cb56061e478b368dca1d03dad855/256/256/Image/Webp/noFilter", badge: "DR",  href: "https://www.roblox.com/games/116495829188952/Dead-Rails" },
  { name: "Fish It!",                 image: "https://tr.rbxcdn.com/180DAY-a56d534bcf394a40e11dc1aba795253b/256/256/Image/Webp/noFilter", badge: "F!",  href: "https://www.roblox.com/games/121864768012064/Fish-It" },
  { name: "Anime Rangers X",          image: "https://tr.rbxcdn.com/180DAY-ae109a4f98423482b900aadfa48e32db/256/256/Image/Webp/noFilter", badge: "ARX", href: "https://www.roblox.com/games/111446873000464/Re-Rangers-X" },
  { name: "Bite By Night",            image: "https://tr.rbxcdn.com/180DAY-2b392211182b7171397e09caa3be62de/256/256/Image/Webp/noFilter", badge: "BBN", href: "https://www.roblox.com/games/70845479499574/Bite-By-Night" },
];

const featureIcons = ["shield", "spark", "chip", "bolt", "crown", "headset"] as const;

const executors = [
  { name: "Codex", image: "/executors/codex.png" },
  { name: "Delta", image: "/executors/delta.webp" },
  { name: "Wave", image: "/executors/wave.webp" },
  { name: "Synapse Z", image: "/executors/synapse%20z.webp" },
  { name: "Velocity", image: "/executors/velocity.webp" },
  { name: "Volt", image: "/executors/volt.webp" },
  { name: "Seliware", image: "/executors/seliware.webp" },
  { name: "Potassium", image: "/executors/potassium.webp" },
  { name: "SirHurt", image: "/executors/sirhurt.webp" },
  { name: "Arceus X", image: "/executors/arceus%20x.png" },
];

function ExecutorMarquee() {
  const { t } = useLang();
  return (
    <section className="exec-section">
      <p className="exec-title">{t("supportExecutorsTitle")}</p>
      <div className="exec-marquee">
        <div className="exec-track">
          {[...executors, ...executors].map((e, i) => (
            <Link key={i} href="/executors" className="exec-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.image} alt={e.name} className="exec-logo" loading="lazy" />
              <span className="exec-name">{e.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
  { q: "faqQ4", a: "faqA4" },
  { q: "faqQ5", a: "faqA5" },
  { q: "faqQ6", a: "faqA6" },
  { q: "faqQ7", a: "faqA7" },
  { q: "faqQ8", a: "faqA8" },
] as const;

function FaqAccordion() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="faq-section">
      <div className="faq-inner">
        <h2 className="faq-title" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>
          {t("faqTitle")}
        </h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item${isOpen ? " open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{t(item.q)}</span>
                  <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-a-wrap">
                  <div className="faq-a">{t(item.a)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { quote: "Used Spectrum Hub for years now. Smooth execution, clean updates, and the support team actually replies fast when something breaks (which is rare in this space). Highly recommend for anyone looking for a reliable Roblox cheat.", quoteTH: "ใช้ Spectrum Hub มาหลายปีแล้วตั้งแต่ชื่อว่า ZPU Hub และโฟกัสในแมพ Mad City เป็นหลัก สคริปต์รันได้ลื่น อัปเดตตลอด และทีมซัพพอร์ตตอบเร็วมากเวลาเกิดปัญหา ซึ่งหาได้ยากในวงการนี้ แนะนำอย่างยิ่งสำหรับใครที่มองหาโปรแกรมโกง Roblox ที่เชื่อถือได้", author: "nebulathedragon", role: "Shop owner", avatar: "https://i.pinimg.com/736x/46/aa/72/46aa72f43fff5e080125e9822d0d4699.jpg", tag: "Long-time user", featured: true },
  { quote: "this script is the best fisch script i've used till now. just add a new feature in which we can teleport to megaladon when it spawns and catch it. and also add a feature to catch the megaladon without teleporting to it. rest all are good.", quoteTH: "สคริปต์ Fisch ที่ดีที่สุดที่เคยใช้มา อยากให้เพิ่มฟีเจอร์เทเลพอร์ตไปหา Megaladon ตอนที่มันสปอว์น และจับมันได้โดยไม่ต้องเทเลพอร์ตด้วย นอกนั้นดีมากทุกอย่าง", author: "exoticastral", role: "Community member", avatar: "https://i.pinimg.com/736x/c3/23/f1/c323f1e89ba607b7ee60e4bb5aedd180.jpg", tag: "Daily user" },
  { quote: "The key flow is simple, the scripts feel optimized, and updates land way faster than most hubs I have tried in the past. Really impressive work and it shows that a lot of care went into building this.", quoteTH: "ระบบคีย์ใช้งานง่าย สคริปต์รู้สึก optimize มาดี และอัปเดตเร็วกว่า hub อื่นที่เคยลองมามาก ผลงานน่าประทับใจมาก เห็นชัดว่าใส่ใจในทุกรายละเอียดจริงๆ", author: "mzikks", role: "Verified buyer", avatar: "https://i.pinimg.com/736x/e6/a1/72/e6a172a208ce137525c52a5bfa12955a.jpg", tag: "Fast updates" },
  { quote: "Support is active, responses are quick, and the overall feel of the product is way more polished than average Roblox cheat suites out there — it's clear a lot of care and experience went into building it. Highly recommended.", quoteTH: "ซัพพอร์ตแอคทีฟ ตอบกลับเร็ว และความรู้สึกโดยรวมของตัวโปรแกรมดูพอลิชกว่า cheat suite Roblox ทั่วไปมาก เห็นชัดว่ามีความใส่ใจและประสบการณ์ในการสร้าง แนะนำเลย", author: "feronei", role: "Store owner", avatar: "https://i.pinimg.com/1200x/12/c5/eb/12c5eb5945be954b341425ca00bc0df0.jpg", tag: "Support" },
  { quote: "The best sailor piece script ever. It has a lot of features and it is very stable. The support team is also very responsive and helpful. I highly recommend this script to anyone who wants to play sailor piece.", quoteTH: "สคริปต์ Sailor Piece ที่ดีที่สุดเท่าที่มี มีฟีเจอร์เยอะและเสถียรมาก ทีมซัพพอร์ตก็รับฟังและช่วยเหลือดีเยี่ยม แนะนำสำหรับทุกคนที่อยากเล่น Sailor Piece", author: "solakemi", role: "Premium member", avatar: "https://i.pinimg.com/736x/e2/5f/a3/e25fa3d34c8d9e67b61e0c450acd7af4.jpg", tag: "Cross-platform" },
];

function DiscordLive({ online, members }: { online: number | null; members: number | null }) {
  const { t } = useLang();
  return (
    <section className="discord-live-section">
      <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" className="discord-live-card">
        <svg className="discord-live-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M20.3 4.4A16.7 16.7 0 0 0 16.2 3l-.2.5c1.5.4 2.2 1 2.2 1a13.4 13.4 0 0 0-8.4 0s.8-.7 2.5-1.1L12 3a16.6 16.6 0 0 0-4.1 1.4C5.3 8.2 4.7 11.9 5 15.6a16.9 16.9 0 0 0 5 2.5l1.2-1.9c-.7-.3-1.3-.6-1.9-1 .2.2 1.6 1.4 5.4 1.4s5.2-1.2 5.4-1.4c-.6.4-1.2.7-1.9 1l1.2 1.9a16.9 16.9 0 0 0 5-2.5c.4-4.3-.7-8-2.1-11.2ZM9.8 13.4c-.8 0-1.5-.8-1.5-1.8s.6-1.8 1.5-1.8c.8 0 1.5.8 1.5 1.8s-.7 1.8-1.5 1.8Zm4.4 0c-.8 0-1.5-.8-1.5-1.8s.6-1.8 1.5-1.8c.8 0 1.5.8 1.5 1.8s-.7 1.8-1.5 1.8Z" />
        </svg>
        <div className="discord-live-text">
          <span className="discord-live-name">ZPU Community</span>
          <span className="discord-live-stats">
            <span className="discord-dot" />
            {online != null ? online.toLocaleString("en-US") : "—"} {t("discordOnline")}
            <span className="discord-sep">·</span>
            {members != null ? members.toLocaleString("en-US") : "—"} {t("discordMembers")}
          </span>
        </div>
        <span className="discord-live-btn">{t("discordJoin")}</span>
      </a>
    </section>
  );
}

export default function Home({ discordOnline, discordMembers }: { discordOnline?: number | null; discordMembers?: number | null }) {
  const { t, lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const featureCards = [
    { icon: "shield", titleKey: "feat1Title" as const, descKey: "feat1Desc" as const, delay: "0s" },
    { icon: "spark",  titleKey: "feat2Title" as const, descKey: "feat2Desc" as const, delay: "0.1s" },
    { icon: "chip",   titleKey: "feat3Title" as const, descKey: "feat3Desc" as const, delay: "0.2s" },
    { icon: "bolt",   titleKey: "feat4Title" as const, descKey: "feat4Desc" as const, delay: "0.3s" },
    { icon: "crown",  titleKey: "feat5Title" as const, descKey: "feat5Desc" as const, delay: "0.4s" },
    { icon: "headset",titleKey: "feat6Title" as const, descKey: "feat6Desc" as const, delay: "0.5s" },
  ];

  const serviceBlocks = [
    { titleKey: "serv1Title" as const, descKey: "serv1Desc" as const, image: "/images/Script Library Preview.png",    alt: "Blox Fruits showcase art", wide: true },
    { titleKey: "serv2Title" as const, descKey: "serv2Desc" as const, image: "/images/Webhook Notify Preview.png",    alt: "Rivals artwork" },
    { titleKey: "serv3Title" as const, descKey: "serv3Desc" as const, image: "https://miro.medium.com/v2/resize:fit:1400/0*7VyEZgzwUhQMeBqb", alt: "Sailor Piece key access preview" },
  ];

  const pricingPlans = [
    {
      tierKey: "planWeekly" as const, descKey: "planWeeklyDesc" as const, amountUSD: "$1.79", amountTHB: "59฿", perKey: "planWeeklyPer" as const, ctaKey: "planWeeklyCta" as const,
      href: "https://spectrumcheat.rexzy.xyz/shop/product/Mw==", primary: false, popular: false,
      featureKeys: ["planWeeklyF1","planWeeklyF2","planWeeklyF3","planWeeklyF4","planWeeklyF5","planWeeklyF6","planWeeklyF7"] as const,
    },
    {
      tierKey: "planMonthly" as const, descKey: "planMonthlyDesc" as const, amountUSD: "$4.69", amountTHB: "149฿", perKey: "planMonthlyPer" as const, ctaKey: "planMonthlyCta" as const,
      href: "https://spectrumcheat.rexzy.xyz/shop/product/NA==", primary: true, popular: true,
      featureKeys: ["planMonthlyF1","planMonthlyF2","planMonthlyF3","planMonthlyF4","planMonthlyF5","planMonthlyF6","planMonthlyF7"] as const,
    },
    {
      tierKey: "planQuarterly" as const, descKey: "planQuarterlyDesc" as const, amountUSD: "$9.99", amountTHB: "319฿", perKey: "planQuarterlyPer" as const, ctaKey: "planQuarterlyCta" as const,
      href: "https://spectrumcheat.rexzy.xyz/shop/product/OA==", primary: false, popular: false,
      featureKeys: ["planQuarterlyF1","planQuarterlyF2","planQuarterlyF3","planQuarterlyF4","planQuarterlyF5","planQuarterlyF6","planQuarterlyF7"] as const,
    },
  ];

  useEffect(() => {
    const topbar = document.getElementById("topbar");
    const updateScroll = () => { topbar?.classList.toggle("scrolled", window.scrollY > 30); };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { (entry.target as HTMLElement).style.animationPlayState = "running"; revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => { el.style.animationPlayState = "paused"; revealObserver.observe(el); });

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
          const raw = (el.dataset.value ?? el.textContent ?? "").replace(/[^0-9.]/g, "");
          const target = Number.parseFloat(raw);
          if (Number.isNaN(target)) return;
          let start: number | null = null;
          const isFloat = raw.includes(".");
          const suffix = el.dataset.suffix ?? "";
          const prefix = el.dataset.prefix ?? "";
          const animate = (ts: number) => {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / 1800, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = isFloat ? (ease * target).toFixed(2) : Math.floor(ease * target).toString();
            el.textContent = `${prefix}${current}${suffix}`;
            if (progress < 1) window.requestAnimationFrame(animate);
          };
          window.requestAnimationFrame(animate);
        });
        statsObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector(".hero-stats");
    if (heroStats) statsObserver.observe(heroStats);

    const cursorGlow = document.createElement("div");
    cursorGlow.style.cssText = `position:fixed;pointer-events:none;z-index:9998;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(192,132,252,0.08) 0%,rgba(139,92,246,0.04) 38%,transparent 72%);transform:translate(-50%,-50%);transition:transform 0.15s ease;top:0;left:0;`;
    document.body.appendChild(cursorGlow);
    const onMouseMove = (e: MouseEvent) => { cursorGlow.style.left = `${e.clientX}px`; cursorGlow.style.top = `${e.clientY}px`; };

    const tiltTargets = document.querySelectorAll<HTMLElement>(".feature-card,.price-card,.testi-card");
    const handleTiltMove = (e: Event) => {
      const el = e.currentTarget as HTMLElement; const me = e as MouseEvent;
      const rect = el.getBoundingClientRect();
      const x = (me.clientX - rect.left) / rect.width - 0.5;
      const y = (me.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    };
    const handleTiltLeave = (e: Event) => { (e.currentTarget as HTMLElement).style.transform = ""; };
    tiltTargets.forEach((el) => { el.addEventListener("mousemove", handleTiltMove); el.addEventListener("mouseleave", handleTiltLeave); });

    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("mousemove", onMouseMove);
      revealObserver.disconnect(); statsObserver.disconnect();
      tiltTargets.forEach((el) => { el.removeEventListener("mousemove", handleTiltMove); el.removeEventListener("mouseleave", handleTiltLeave); });
      cursorGlow.remove();
    };
  }, []);

  // Starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { const hero = canvas.parentElement; canvas.width = hero ? hero.offsetWidth : window.innerWidth; canvas.height = hero ? hero.offsetHeight : window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 180 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2 + 0.2, speed: Math.random() * 0.25 + 0.05, opacity: Math.random() * 0.6 + 0.2, twinkleSpeed: Math.random() * 0.008 + 0.003, twinkleDir: Math.random() > 0.5 ? 1 : -1 }));
    let last = performance.now();
    const draw = (now: number) => {
      // delta normalized to a 60fps frame so speed is the same on any refresh rate
      const dt = Math.min((now - last) / 16.667, 3);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed * star.twinkleDir * dt;
        if (star.opacity >= 0.85 || star.opacity <= 0.1) star.twinkleDir *= -1;
        star.y += star.speed * dt;
        if (star.y > canvas.height) { star.y = 0; star.x = Math.random() * canvas.width; }
        ctx.beginPath(); ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <MarketingHeader />

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <canvas ref={canvasRef} className="hero-starfield" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>{t("heroBadge")}</span>
          </div>
          <h1 className="hero-title hero-title-fade-up" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>
            {t("heroTitle1")}<br /><em style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>{t("heroTitleOf")}</em><br />
            <span className="hero-accent">{t("heroTitle2")}</span>
          </h1>
          <p className="hero-subtitle">
            <strong className="hero-sub-highlight">{t("heroSubH1")}</strong>
            {t("heroSubMid")}
            <strong className="hero-sub-highlight">{t("heroSubH2")}</strong>
          </p>
          <div className="hero-actions">
            <a href="/scripts" className="btn-primary btn-large">
              <span>{t("btnExploreScripts")}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
            <a href="https://spectrumcheat.rexzy.xyz" target="_blank" rel="noreferrer" className="btn-outline btn-large">
              <span>{t("btnBuyNow")}</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num" data-value="67" data-suffix="+">67+</span><span className="stat-label">{t("statGames")}</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num" data-value="99.94" data-suffix="%">99.94%</span><span className="stat-label">{t("statStability")}</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num" data-prefix="<" data-value="5" data-suffix="ms">{"<5ms"}</span><span className="stat-label">{t("statPerformance")}</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num" data-value="447" data-suffix="M+">447M+</span><span className="stat-label">{t("statExecutions")}</span></div>
          </div>
        </div>

        <button
          type="button"
          className="hero-scroll-hint"
          aria-label="Scroll down"
          onClick={() => {
            const target = document.querySelector(".trust-section");
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <svg className="hero-scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </section>

      {/* ── Trust ── */}
      <section className="trust-section">
        <p className="trust-label">{t("trustLabel")}</p>
        <div className="supported-games">
          {supportedGames.map((game) => (
            <a key={game.name} href={game.href} className="supported-game-card" target={game.href.startsWith("http") ? "_blank" : undefined} rel={game.href.startsWith("http") ? "noreferrer" : undefined}>
              {game.image ? <img src={game.image} alt={game.name} className="supported-game-image" loading="lazy" /> : <div className="supported-game-fallback" aria-label={game.name}>{game.badge}</div>}
              <span>{game.name}</span>
            </a>
          ))}
          <a href="/scripts" className="supported-game-card">
            <div className="supported-game-fallback" aria-label={t("andMore")}>+</div>
            <span>{t("andMore")}</span>
          </a>
        </div>
        <p className="supported-games-note">{t("trustNote")}</p>
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <div className="section-inner">
          <div className="features-header">
            <p className="eyebrow">{t("featEyebrow")}</p>
            <h2 className="section-title" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>
              {lang === "en" ? (
                <>A <em>stability-first</em><br />Roblox cheat</>
              ) : lang === "zh" ? (
                <>稳定优先的<br /><em>罗布乐思辅助</em></>
              ) : lang === "vi" ? (
                <>Công cụ Roblox<br /><em>ưu tiên sự ổn định</em></>
              ) : lang === "pt" ? (
                <>Um Roblox cheat<br /><em>focado em estabilidade</em></>
              ) : (
                <>โปรแกรมโกง Roblox<br /><em style={{ fontFamily: "var(--font-body)" }}>ที่เน้นความเสถียร</em></>
              )}
            </h2>
            <p className="section-sub">{t("featSub")}</p>
          </div>

          <div className="map-wrapper">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80&auto=format&fit=crop" alt="Global server infrastructure map" className="world-map-img" loading="lazy" />
            <div className="map-gradient" />
            <div className="map-pings">
              {[{l:"18%",t:"38%"},{l:"47%",t:"28%"},{l:"72%",t:"35%"},{l:"82%",t:"55%"},{l:"55%",t:"55%"}].map((p,i) => (
                <div key={i} className="ping" style={{ left: p.l, top: p.t }}><div className="ping-dot" /><div className="ping-ring" /></div>
              ))}
            </div>
            <span className="map-caption">spectrum://global.mesh</span>
          </div>

          <div className="feature-cards">
            {featureCards.map((card) => (
              <div key={card.titleKey} className="feature-card reveal" style={{ animationDelay: card.delay }}>
                <div className="fc-icon" aria-hidden="true">
                  {card.icon === "shield" && <svg viewBox="0 0 24 24"><path d="M12 3l6 2.5v5.8c0 4.2-2.5 8-6 9.7-3.5-1.7-6-5.5-6-9.7V5.5L12 3Z" /><path d="m9.4 12.2 1.8 1.8 3.6-4.1" /></svg>}
                  {card.icon === "spark"  && <svg viewBox="0 0 24 24"><path d="M12 3 9.9 8.1 5 10.2l4.9 2.1L12 17.4l2.1-5.1 4.9-2.1-4.9-2.1L12 3Z" /><path d="M5 4.5 5.8 6.4 7.7 7.2 5.8 8 5 9.9 4.2 8 2.3 7.2 4.2 6.4 5 4.5Z" /></svg>}
                  {card.icon === "chip"   && <svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" /></svg>}
                  {card.icon === "bolt"   && <svg viewBox="0 0 24 24"><path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" /></svg>}
                  {card.icon === "crown"  && <svg viewBox="0 0 24 24"><path d="m4 18 1.5-10 4.5 4 2-5 2 5 4.5-4L20 18H4Z" /><path d="M4 18h16" /></svg>}
                  {card.icon === "headset"&& <svg viewBox="0 0 24 24"><path d="M4 13a8 8 0 1 1 16 0" /><rect x="3" y="12" width="4" height="7" rx="2" /><rect x="17" y="12" width="4" height="7" rx="2" /><path d="M19 19a3 3 0 0 1-3 3h-2" /></svg>}
                </div>
                <h3>{t(card.titleKey)}</h3>
                <p>{t(card.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo ── */}
      <section className="demo-section" id="demo">
        <div className="section-inner">
          <div className="demo-layout">
            <div className="demo-text">
              <p className="eyebrow">Spectrum-Cheat Showcase | Sailor Piece</p>
              <h2 className="section-title" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>
                {lang === "en" ? (
                  <>See how Spectrum<br />performs in<br /><em>real gameplay</em></>
                ) : lang === "zh" ? (
                  <>看看 Spectrum<br />如何在<br /><em>真实游戏中表现</em></>
                ) : lang === "vi" ? (
                  <>Xem Spectrum<br />hoạt động trong<br /><em>gameplay thực</em></>
                ) : lang === "pt" ? (
                  <>Veja como o Spectrum<br />performa em<br /><em>gameplay real</em></>
                ) : (
                  <>ดูว่า Spectrum<br />ทำงานอย่างไรใน<br /><em style={{ fontFamily: "var(--font-body)" }}>เกมจริง</em></>
                )}
              </h2>
              <p className="section-sub">{t("demoSub")}</p>
              <ul className="demo-checklist">
                {(["demoCheck1","demoCheck2","demoCheck3","demoCheck4"] as const).map((k) => (
                  <li key={k}><span className="check">✓</span> {t(k)}</li>
                ))}
              </ul>
              <a href="https://www.youtube.com/watch?v=ixX8GAHZlwM" target="_blank" rel="noreferrer" className="btn-primary">{t("demoWatch")}</a>
            </div>
            <div className="demo-media">
              <div className="video-frame-wrap">
                <iframe src="https://www.youtube.com/embed/ixX8GAHZlwM?rel=0&modestbranding=1&color=white" title="Spectrum Cheat Showcase" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" className="demo-iframe" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services-section">
        <div className="section-inner">
          <p className="eyebrow" style={{ textAlign: "center" }}>{t("servEyebrow")}</p>
          <h2 className="section-title" style={{ textAlign: "center", ...(lang === "th" ? { fontFamily: "var(--font-body)" } : {}) }}>
            {lang === "en" ? (
              <>Everything you need<br /><em>in one premium suite.</em></>
            ) : lang === "zh" ? (
              <>一切你所需要的<br /><em>尽在高端套件中</em></>
            ) : lang === "vi" ? (
              <>Tất cả những gì bạn cần<br /><em>trong một bộ premium.</em></>
            ) : lang === "pt" ? (
              <>Tudo que você precisa<br /><em>em uma suite premium.</em></>
            ) : (
              <>ทุกอย่างที่คุณต้องการ<br /><em style={{ fontFamily: "var(--font-body)" }}>ในสคริปต์พรีเมียมเดียว</em></>
            )}
          </h2>
          <div className="services-grid">
            {serviceBlocks.map((block) => (
              <div key={block.titleKey} className={block.wide ? "service-block wide" : "service-block"}>
                <div className="service-text">
                  <h3>{t(block.titleKey)}</h3>
                  <p>{t(block.descKey)}</p>
                </div>
                <img src={block.image} alt={block.alt} className="service-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Supported executors ── */}
      <ExecutorMarquee />

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="section-inner">
          <p className="eyebrow" style={{ textAlign: "center" }}>{t("testiEyebrow")}</p>
          <h2 className="section-title" style={{ textAlign: "center", ...(lang === "th" ? { fontFamily: "var(--font-body)" } : {}) }}>
            {lang === "en" ? (
              <>Trusted by users<br /><em>who stay.</em></>
            ) : lang === "zh" ? (
              <>深受用户信赖<br /><em>长期坚持使用</em></>
            ) : lang === "vi" ? (
              <>Được tin dùng bởi<br /><em>người dùng trung thành.</em></>
            ) : lang === "pt" ? (
              <>Confiado por usuários<br /><em>que ficam.</em></>
            ) : (
              <>ไว้วางใจโดยผู้ใช้<br /><em style={{ fontFamily: "var(--font-body)" }}>ใช้งานมาโดยตลอด</em></>
            )}
          </h2>
          <p className="section-sub" style={{ textAlign: "center" }}>{t("testiSub")}</p>
          <div className="testimonials-stage">
            {testimonials.filter((item) => item.featured).map((item) => (
              <div key={item.author} className="testi-featured reveal">
                <div className="testi-featured-avatar-wrap"><img src={item.avatar} alt={item.author} className="testi-featured-avatar" /></div>
                <div className="testi-stars testi-stars-featured">★★★★★</div>
                <blockquote className="testi-featured-quote">{lang === "th" ? item.quoteTH : item.quote}</blockquote>
                <div className="testi-featured-meta">
                  <span className="testi-pill">{item.author}</span>
                  <span className="testi-pill">{item.role}</span>
                  <span className="testi-pill">{item.tag}</span>
                </div>
              </div>
            ))}
            <div className="testimonials-grid">
              {testimonials.filter((item) => !item.featured).map((item) => (
                <div key={item.author} className="testi-card reveal">
                  <div className="testi-stars">★★★★★</div>
                  <blockquote>{lang === "th" ? item.quoteTH : item.quote}</blockquote>
                  <div className="testi-author">
                    <img src={item.avatar} alt={item.author} className="testi-avatar" />
                    <div><strong>{item.author}</strong><span>{item.role}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="pricing-section" id="pricing">
        <div className="section-inner">
          <p className="eyebrow" style={{ textAlign: "center" }}>{t("pricingEyebrow")}</p>
          <h2 className="section-title" style={{ textAlign: "center", ...(lang === "th" ? { fontFamily: "var(--font-body)" } : {}) }}>
            {lang === "en" ? (
              <>Choose your<br /><em>Spectrum access.</em></>
            ) : lang === "zh" ? (
              <>选择你的<br /><em>Spectrum 访问方案</em></>
            ) : lang === "vi" ? (
              <>Chọn gói<br /><em>Spectrum của bạn.</em></>
            ) : lang === "pt" ? (
              <>Escolha seu<br /><em>acesso ao Spectrum.</em></>
            ) : (
              <>เลือกการเข้าถึง<br /><em style={{ fontFamily: "var(--font-body)" }}>Spectrum ของคุณ</em></>
            )}
          </h2>
          <p className="section-sub" style={{ textAlign: "center" }}>{t("pricingSub")}</p>
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div key={plan.tierKey} className={plan.popular ? "price-card popular" : "price-card"}>
                {plan.popular && <div className="popular-badge">{t("mostPopular")}</div>}
                <div className="price-tier">{t(plan.tierKey)}</div>
                <p className="price-desc">{t(plan.descKey)}</p>
                <div className="price-amount">
                  <span className="price-num">{lang === "th" ? plan.amountTHB : plan.amountUSD}</span>
                  <span className="price-per">{t(plan.perKey)}</span>
                </div>
                <ul className="price-features">
                  {plan.featureKeys.map((fk) => <li key={fk}>{t(fk)}</li>)}
                </ul>
                <a href={plan.href} target="_blank" rel="noreferrer" className={plan.primary ? "btn-primary w-full" : "btn-outline w-full"}>
                  {t(plan.ctaKey)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqAccordion />

      {/* ── Discord live ── */}
      <DiscordLive online={discordOnline ?? null} members={discordMembers ?? null} />

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-glow" />
          <h2 className="cta-title" style={lang === "th" ? { fontFamily: "var(--font-body)" } : undefined}>{t("ctaTitle")}</h2>
          <p className="cta-sub">{t("ctaSub")}</p>
          <div className="cta-actions">
            <a href="https://spectrumcheat.rexzy.xyz/" target="_blank" rel="noreferrer" className="btn-primary btn-large">{t("btnBuyNow")}</a>
            <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" className="btn-outline btn-large">{t("btnJoinDiscord")}</a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <AdResponsive className="ad-slot" />
      </div>

      <SiteFooter />
    </>
  );
}
