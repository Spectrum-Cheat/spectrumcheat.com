"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MarketingHeader } from "./_components/marketing-header";

const heroSubtitleText =
  "A premium Roblox cheat built for smooth performance and reliable daily use. Supports multiple games & working on mobile and PC, and trusted for over 5 years!";
const heroSubtitleBreakIndex =
  "A premium Roblox cheat built for smooth performance and reliable daily use.".length;

const featureCards = [
  {
    icon: "shield",
    title: "Undetected",
    description:
      "Scripts are maintained frequently to stay undetected, stable, and safer to use over time.",
    delay: "0s",
  },
  {
    icon: "spark",
    title: "Best Features",
    description:
      "Packed with strong in-game features, auto farming tools, and premium utilities built for real everyday use.",
    delay: "0.1s",
  },
  {
    icon: "chip",
    title: "Optimized Code",
    description:
      "Clean, lightweight scripts engineered to run smoothly without dragging down your game performance.",
    delay: "0.2s",
  },
  {
    icon: "bolt",
    title: "Instant Access",
    description:
      "Our automated flow helps users get started immediately after purchase with no unnecessary waiting around.",
    delay: "0.3s",
  },
  {
    icon: "crown",
    title: "Premium Quality",
    description:
      "Built with years of scripting experience behind it, refined for smoother farming and a cleaner overall feel.",
    delay: "0.4s",
  },
  {
    icon: "headset",
    title: "24/7 Support",
    description:
      "Fast replies, active help, and real support whenever users need answers, updates, or technical assistance.",
    delay: "0.5s",
  },
];

const serviceBlocks = [
  {
    title: "Script Library",
    description:
      "Browse supported games, jump between titles fast, and keep your full Spectrum lineup organized in one clean place.",
    image: "/images/Script Library Preview.png",
    alt: "Blox Fruits showcase art",
    wide: true,
  },
  {
    title: "Status Tracker",
    description:
      "Check which games are currently working or retired without digging through messages or old posts, And automatic Webhook Systems in script!",
    image: "/images/Webhook Notify Preview.png",
    alt: "Rivals artwork",
  },
  {
    title: "Key Access",
    description:
      "Move from purchase to use faster with a cleaner unlock flow, direct key steps, and less friction for new users.",
    image: "https://miro.medium.com/v2/resize:fit:1400/0*7VyEZgzwUhQMeBqb",
    alt: "Sailor Piece key access preview",
  },
];

const testimonials = [
  {
    quote:
      "Used Spectrum Hub for years now. Smooth execution, clean updates, and the support team actually replies fast when something breaks (which is rare in this space). Highly recommend for anyone looking for a reliable Roblox cheat.",
    author: "nebulathedragon",
    role: "Shop owner",
    avatar: "https://cdn.discordapp.com/avatars/1262548755090247814/a5214d109f81b593d96b39f83e1ed68b.png",
    tag: "Long-time user",
    featured: true,
  },
  {
    quote:
      "this script is the best fisch script i've used till now. just add a new feature in which we can teleport to megaladon when it spawns and catch it. and also add a feature to catch the megaladon without teleporting to it. rest all are good.",
    author: "exoticastral",
    role: "Community member",
    avatar: "https://cdn.discordapp.com/avatars/402542751855673344/c5f8b46f8219c8750f2bd90b90099491.png",
    tag: "Daily user",
  },
  {
    quote:
      "The key flow is simple, the scripts feel optimized, and updates land way faster than most hubs I have tried in the past. Really impressive work and it shows that a lot of care went into building this.",
    author: "mzikks",
    role: "Verified buyer",
    avatar: "https://cdn.discordapp.com/avatars/1267240150589767710/a5a99a919f019788a3dbe8a5ff0cb09c.png",
    tag: "Fast updates",
  },
  {
    quote:
      "Support is active, responses are quick, and the overall feel of the product is way more polished than average Roblox cheat suites out there â€” it's clear a lot of care and experience went into building it. Highly recommended.",
    author: "feronei",
    role: "Store owner",
    avatar: "https://cdn.discordapp.com/avatars/921819344307126283/1858074d8d26fc0ca6cb71d39eb9619c.png",
    tag: "Support",
  },
  {
    quote:
      "The best sailor piece script ever. It has a lot of features and it is very stable. The support team is also very responsive and helpful. I highly recommend this script to anyone who wants to play sailor piece.",
    author: "solakemi",
    role: "Premium member",
    avatar: "https://cdn.discordapp.com/avatars/755225346906783754/46ff4b53da2a213783d0249c54fea9ab.png",
    tag: "Cross-platform",
  },
];

const supportedGames = [
  {
    name: "Blox Fruits",
    image: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/256/256/Image/Webp/noFilter",
    badge: "BF",
    href: "https://www.roblox.com/games/2753915549/Blox-Fruits",
  },
  {
    name: "King Legacy",
    image: "https://tr.rbxcdn.com/180DAY-2b339527dbcd7808790f274f8a9c9aab/256/256/Image/Webp/noFilter",
    badge: "KL",
    href: "https://www.roblox.com/games/4520749081/King-Legacy",
  },
  {
    name: "Driving Empire",
    image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/256/256/Image/Webp/noFilter",
    badge: "DE",
    href: "https://www.roblox.com/games/3351674303/Driving-Empire-Car-Racing",
  },
  {
    name: "Fisch",
    image: "https://tr.rbxcdn.com/180DAY-911933467f0dc8e467cf3e305ea78882/256/256/Image/Webp/noFilter",
    badge: "FI",
    href: "https://www.roblox.com/games/16732694052/Fisch",
  },
  {
    name: "Rivals",
    image: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/256/256/Image/Webp/noFilter",
    badge: "RV",
    href: "https://www.roblox.com/games/17625359962/RIVALS",
  },
  {
    name: "Sailor Piece",
    image: "https://tr.rbxcdn.com/180DAY-af4eed326351cb513869c431e3d88787/256/256/Image/Webp/noFilter",
    badge: "SP",
    href: "https://www.roblox.com/games/77747658251236/Sailor-Piece",
  },
  {
    name: "Steal a Brainrot",
    image: "https://tr.rbxcdn.com/180DAY-1676319b53fd6fca7765674d84f36f3d/256/256/Image/Webp/noFilter",
    badge: "SB",
    href: "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot",
  },
  {
    name: "Pet Simulator 99",
    image: "https://tr.rbxcdn.com/180DAY-03854432095bc666d812e935e8aa758f/256/256/Image/Webp/noFilter",
    badge: "P99",
    href: "https://www.roblox.com/games/8737899170/Pet-Simulator-99",
  },
  {
    name: "The Strongest Battlegrounds",
    image: "https://tr.rbxcdn.com/180DAY-85755b822cee060522bc974f98924350/256/256/Image/Webp/noFilter",
    badge: "TSB",
    href: "https://www.roblox.com/games/10449761463/The-Strongest-Battlegrounds",
  },
  {
    name: "Dead Rails",
    image: "https://tr.rbxcdn.com/180DAY-f305cb56061e478b368dca1d03dad855/256/256/Image/Webp/noFilter",
    badge: "DR",
    href: "https://www.roblox.com/games/116495829188952/Dead-Rails",
  },
  {
    name: "Fish It!",
    image: "https://tr.rbxcdn.com/180DAY-a56d534bcf394a40e11dc1aba795253b/256/256/Image/Webp/noFilter",
    badge: "F!",
    href: "https://www.roblox.com/games/121864768012064/Fish-It",
  },
  {
    name: "Anime Rangers X",
    image: "https://tr.rbxcdn.com/180DAY-ae109a4f98423482b900aadfa48e32db/256/256/Image/Webp/noFilter",
    badge: "ARX",
    href: "https://www.roblox.com/games/111446873000464/Re-Rangers-X",
  },
  {
    name: "Bite By Night",
    image: "https://tr.rbxcdn.com/180DAY-2b392211182b7171397e09caa3be62de/256/256/Image/Webp/noFilter",
    badge: "BBN",
    href: "https://www.roblox.com/games/70845479499574/Bite-By-Night",
  },
  {
    name: "And more",
    image: "",
    badge: "+",
    href: "/scripts",
  },
];

const pricingPlans = [
  {
    tier: "Weekly",
    description:
      "Quick access for short sessions, testing, and trying Spectrum before moving into longer plans.",
    amount: "$1.79",
    per: "/week",
    cta: "Buy Weekly Plan",
    href: "https://spectrumcheat.rexzy.xyz/shop/product/Mw==",
    primary: false,
    popular: false,
    features: [
      "Fast one-day access",
      "Works on mobile and PC",
      "Smooth runtime experience",
      "Great for testing and short use",
      "Discord-based support",
      "Instant access after purchase",
      "Perfect for trying Spectrum first",
    ],
  },
  {
    tier: "Monthly",
    description:
      "The main plan for everyday users who want full Spectrum access without constantly renewing.",
    amount: "$4.69",
    per: "/month",
    cta: "Buy Monthly Plan",
    href: "https://spectrumcheat.rexzy.xyz/shop/product/NA==",
    popular: true,
    primary: true,
    features: [
      "Best value for long-term use",
      "67+ supported games catalog",
      "Priority update access",
      "Mobile and PC ready",
      "Cleaner day-to-day workflow",
      "Most popular Spectrum plan",
      "Built for daily use",
    ],
  },
  {
    tier: "Quarterly",
    description:
      "A longer-term plan for committed users who want premium access, fewer renewals, and stronger overall value.",
    amount: "$9.99",
    per: "/3 months",
    cta: "Buy Quarterly Plan",
    href: "https://spectrumcheat.rexzy.xyz/shop/product/OA==",
    popular: false,
    primary: false,
    features: [
      "Extended premium access",
      "Fewer renewals to manage",
      "Premium script experience",
      "Trusted by long-term users",
      "Fast support through Discord",
      "Built for long-term value",
      "Best for committed users",
    ],
  },
];

export default function Home() {
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const typedSubtitleFirstLine = typedSubtitle.slice(0, heroSubtitleBreakIndex);
  const typedSubtitleSecondLine =
    typedSubtitle.length > heroSubtitleBreakIndex
      ? typedSubtitle.slice(heroSubtitleBreakIndex).trimStart()
      : "";

  useEffect(() => {
    const topbar = document.getElementById("topbar");
    const updateScroll = () => {
      topbar?.classList.toggle("scrolled", window.scrollY > 30);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
      element.style.animationPlayState = "paused";
      revealObserver.observe(element);
    });

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.querySelectorAll<HTMLElement>(".stat-num").forEach((element) => {
            const raw = (element.dataset.value ?? element.textContent ?? "").replace(/[^0-9.]/g, "");
            const target = Number.parseFloat(raw);

            if (Number.isNaN(target)) return;

            let start: number | null = null;
            const isFloat = raw.includes(".");
            const suffix = element.dataset.suffix ?? "";
            const prefix = element.dataset.prefix ?? "";

            const animate = (timestamp: number) => {
              if (start === null) start = timestamp;
              const progress = Math.min((timestamp - start) / 1800, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = isFloat ? (ease * target).toFixed(2) : Math.floor(ease * target).toString();
              element.textContent = `${prefix}${current}${suffix}`;
              if (progress < 1) window.requestAnimationFrame(animate);
            };

            window.requestAnimationFrame(animate);
          });

          statsObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    const heroStats = document.querySelector(".hero-stats");
    if (heroStats) statsObserver.observe(heroStats);

    const cursorGlow = document.createElement("div");
    cursorGlow.style.cssText = `
      position:fixed; pointer-events:none; z-index:9998;
      width:300px; height:300px;
      border-radius:50%;
      background: radial-gradient(circle, rgba(192,132,252,0.08) 0%, rgba(139,92,246,0.04) 38%, transparent 72%);
      transform:translate(-50%,-50%);
      transition: transform 0.15s ease;
      top:0; left:0;
    `;
    document.body.appendChild(cursorGlow);

    const onMouseMove = (event: MouseEvent) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    };

    const tiltTargets = document.querySelectorAll<HTMLElement>(".feature-card, .price-card, .testi-card");
    const handleTiltMove = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      const mouseEvent = event as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
      const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    };
    const handleTiltLeave = (event: Event) => {
      (event.currentTarget as HTMLElement).style.transform = "";
    };

    tiltTargets.forEach((element) => {
      element.addEventListener("mousemove", handleTiltMove);
      element.addEventListener("mouseleave", handleTiltLeave);
    });

    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("mousemove", onMouseMove);
      revealObserver.disconnect();
      statsObserver.disconnect();
      tiltTargets.forEach((element) => {
        element.removeEventListener("mousemove", handleTiltMove);
        element.removeEventListener("mouseleave", handleTiltLeave);
      });
      cursorGlow.remove();
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;

    const timer = window.setInterval(() => {
      currentIndex += 1;
      setTypedSubtitle(heroSubtitleText.slice(0, currentIndex));

      if (currentIndex >= heroSubtitleText.length) {
        window.clearInterval(timer);
      }
    }, 15);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="noise-overlay" />

      <MarketingHeader />

      <section className="hero" id="hero">
        <div className="hero-bg">
          <video autoPlay muted loop playsInline className="hero-video">
            <source
              src="https://cdn.pixabay.com/video/2022/09/01/129389-745180337_large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-grid-lines" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>Spectrum Cheat // Premium Roblox Suite</span>
          </div>
          <h1 className="hero-title hero-title-fade-up">
            The next generation
            <br />
            <em>of</em>
            <br />
            <span className="hero-accent">Roblox Cheats</span>
          </h1>
          <p className="hero-subtitle hero-subtitle-typing" aria-label={heroSubtitleText}>
            <span className="typing-line">{typedSubtitleFirstLine}</span>
            <span className="typing-line">{typedSubtitleSecondLine}</span>
          </p>
          <div className="hero-actions">
            <a href="/scripts" className="btn-primary btn-large">
              <span>Explore Scripts</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a
              href="https://spectrumcheat.rexzy.xyz"
              target="_blank"
              rel="noreferrer"
              className="btn-outline btn-large"
            >
              <span>Buy Now</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num" data-value="67" data-suffix="+">
                67+
              </span>
              <span className="stat-label">Supported Games</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-value="99.94" data-suffix="%">
                99.94%
              </span>
              <span className="stat-label">Stability Rate</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-prefix="<" data-value="5" data-suffix="ms">
                {"<5ms"}
              </span>
              <span className="stat-label">Runtime Performance</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" data-value="447" data-suffix="M+">
                447M+
              </span>
              <span className="stat-label">Total Executions</span>
            </div>
          </div>
        </div>

        <div className="hero-mockup" id="platform">
          <div className="mockup-frame">
            <div className="mockup-bar">
              <span className="dot r" />
              <span className="dot y" />
              <span className="dot g" />
              <span className="mockup-url">spectrumcheat.com/console</span>
            </div>
            <img
              src="/images/Spectrum Console Gameplay Pro.png"
              alt="Spectrum Cheat interface shown on a laptop over Roblox gameplay"
              className="mockup-img"
              loading="lazy"
            />
            <div className="mockup-overlay-chip chip-1">
              <span className="chip-dot green" /> Spectrum Active
            </div>
            <div className="mockup-overlay-chip chip-2">
              <span className="chip-dot amber" /> 44K+ Executions/Hr
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <p className="trust-label">Supported games</p>
        <div className="supported-games">
          {supportedGames.map((game) => (
            <a
              key={game.name}
              href={game.href}
              className="supported-game-card"
              target={game.href.startsWith("http") ? "_blank" : undefined}
              rel={game.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {game.image ? (
                <img src={game.image} alt={game.name} className="supported-game-image" loading="lazy" />
              ) : (
                <div className="supported-game-fallback" aria-label={game.name}>
                  {game.badge}
                </div>
              )}
              <span>{game.name}</span>
            </a>
          ))}
        </div>
        <p className="supported-games-note">67+ supported games across the full Spectrum catalog.</p>
      </section>

      <section className="features-section" id="features">
        <div className="section-inner">
          <div className="features-header">
            <p className="eyebrow">Why Choose Spectrum?</p>
            <h2 className="section-title">
              A <em>stability-first</em>
              <br />
              Roblox cheat
            </h2>
            <p className="section-sub">
              A premium Roblox cheat suite focused on smooth performance, reliable updates, and a sharper everyday experience.
            </p>
          </div>

          <div className="map-wrapper">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80&auto=format&fit=crop"
              alt="Global server infrastructure map"
              className="world-map-img"
              loading="lazy"
            />
            <div className="map-gradient" />
            <div className="map-pings">
              <div className="ping" style={{ left: "18%", top: "38%" }}>
                <div className="ping-dot" />
                <div className="ping-ring" />
              </div>
              <div className="ping" style={{ left: "47%", top: "28%" }}>
                <div className="ping-dot" />
                <div className="ping-ring" />
              </div>
              <div className="ping" style={{ left: "72%", top: "35%" }}>
                <div className="ping-dot" />
                <div className="ping-ring" />
              </div>
              <div className="ping" style={{ left: "82%", top: "55%" }}>
                <div className="ping-dot" />
                <div className="ping-ring" />
              </div>
              <div className="ping" style={{ left: "55%", top: "55%" }}>
                <div className="ping-dot" />
                <div className="ping-ring" />
              </div>
            </div>
            <span className="map-caption">spectrum://global.mesh</span>
          </div>

          <div className="feature-cards">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="feature-card reveal"
                style={{ animationDelay: card.delay }}
              >
                <div className="fc-icon" aria-hidden="true">
                  {card.icon === "shield" ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l6 2.5v5.8c0 4.2-2.5 8-6 9.7-3.5-1.7-6-5.5-6-9.7V5.5L12 3Z" />
                      <path d="m9.4 12.2 1.8 1.8 3.6-4.1" />
                    </svg>
                  ) : null}
                  {card.icon === "spark" ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3 9.9 8.1 5 10.2l4.9 2.1L12 17.4l2.1-5.1 4.9-2.1-4.9-2.1L12 3Z" />
                      <path d="M5 4.5 5.8 6.4 7.7 7.2 5.8 8 5 9.9 4.2 8 2.3 7.2 4.2 6.4 5 4.5Z" />
                    </svg>
                  ) : null}
                  {card.icon === "chip" ? (
                    <svg viewBox="0 0 24 24">
                      <rect x="7" y="7" width="10" height="10" rx="2" />
                      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                    </svg>
                  ) : null}
                  {card.icon === "bolt" ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" />
                    </svg>
                  ) : null}
                  {card.icon === "crown" ? (
                    <svg viewBox="0 0 24 24">
                      <path d="m4 18 1.5-10 4.5 4 2-5 2 5 4.5-4L20 18H4Z" />
                      <path d="M4 18h16" />
                    </svg>
                  ) : null}
                  {card.icon === "headset" ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M4 13a8 8 0 1 1 16 0" />
                      <rect x="3" y="12" width="4" height="7" rx="2" />
                      <rect x="17" y="12" width="4" height="7" rx="2" />
                      <path d="M19 19a3 3 0 0 1-3 3h-2" />
                    </svg>
                  ) : null}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="demo-section" id="demo">
        <div className="section-inner">
          <div className="demo-layout">
            <div className="demo-text">
              <p className="eyebrow">Spectrum-Cheat Showcase | Sailor Piece</p>
              <h2 className="section-title">
                See how Spectrum
                <br />
                performs in
                <br />
                <em>real gameplay</em>
              </h2>
              <p className="section-sub">
                Watch Spectrum Hub in live action with smooth execution, clean visuals, and premium features built for real everyday use.
              </p>
              <ul className="demo-checklist">
                <li>
                  <span className="check">✓</span> Smooth execution shown in real gameplay
                </li>
                <li>
                  <span className="check">✓</span> Premium features built for daily use
                </li>
                <li>
                  <span className="check">✓</span> Frequent updates across supported games
                </li>
                <li>
                  <span className="check">✓</span> Mobile and PC ready experience
                </li>
              </ul>
              <a
                href="https://www.youtube.com/watch?v=hAAh27jXunA"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Watch on YouTube →
              </a>
            </div>
            <div className="demo-media">
              <div className="video-frame-wrap">
                <iframe
                  src="https://www.youtube.com/embed/hAAh27jXunA?rel=0&modestbranding=1&color=white"
                  title="Spectrum Cheat Showcase"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="demo-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-inner">
          <p className="eyebrow" style={{ textAlign: "center" }}>
            The Platform
          </p>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Everything you need
            <br />
            <em>in one premium suite.</em>
          </h2>

          <div className="services-grid">
            {serviceBlocks.map((block) => (
              <div
                key={block.title}
                className={block.wide ? "service-block wide" : "service-block"}
              >
                <div className="service-text">
                  <h3>{block.title}</h3>
                  <p>{block.description}</p>
                </div>
                <img src={block.image} alt={block.alt} className="service-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-inner">
          <p className="eyebrow" style={{ textAlign: "center" }}>
            Reviews from real users
          </p>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Trusted by users
            <br />
            <em>who stay.</em>
          </h2>
          <p className="section-sub" style={{ textAlign: "center" }}>
            Real feedback from long-time buyers, shop owners, and everyday users across the Spectrum community.
          </p>
          <div className="testimonials-stage">
            {testimonials
              .filter((item) => item.featured)
              .map((item) => (
                <div key={item.author} className="testi-featured reveal">
                  <div className="testi-featured-avatar-wrap">
                    <img src={item.avatar} alt={item.author} className="testi-featured-avatar" />
                  </div>
                  <div className="testi-stars testi-stars-featured">★★★★★</div>
                  <blockquote className="testi-featured-quote">{item.quote}</blockquote>
                  <div className="testi-featured-meta">
                    <span className="testi-pill">{item.author}</span>
                    <span className="testi-pill">{item.role}</span>
                    <span className="testi-pill">{item.tag}</span>
                  </div>
                </div>
              ))}
            <div className="testimonials-grid">
            {testimonials.filter((item) => !item.featured).map((item) => (
              <div
                key={item.author}
                className="testi-card reveal"
              >
                <div className="testi-stars">★★★★★</div>
                <blockquote>{item.quote}</blockquote>
                <div className="testi-author">
                  <img src={item.avatar} alt={item.author} className="testi-avatar" />
                  <div>
                    <strong>{item.author}</strong>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="section-inner">
          <p className="eyebrow" style={{ textAlign: "center" }}>
            Pricing
          </p>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Choose your
            <br />
            <em>Spectrum access.</em>
          </h2>
          <p className="section-sub" style={{ textAlign: "center" }}>
            Choose the right plan for quick access, daily use, or long-term value.
          </p>

          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div
                key={plan.tier}
                className={plan.popular ? "price-card popular" : "price-card"}
              >
                {plan.popular ? <div className="popular-badge">Most Popular</div> : null}
                <div className="price-tier">{plan.tier}</div>
                <p className="price-desc">{plan.description}</p>
                <div className="price-amount">
                  <span
                    className="price-num"
                    style={plan.amount === "Custom" ? { fontSize: "2rem" } : undefined}
                  >
                    {plan.amount}
                  </span>
                  {plan.per ? <span className="price-per">{plan.per}</span> : null}
                </div>
                <ul className="price-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noreferrer"
                  className={plan.primary ? "btn-primary w-full" : "btn-outline w-full"}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="cta-section">
    <div className="cta-inner">
      <div className="cta-glow" />
      <h2 className="cta-title">Ready to use Spectrum?</h2>
      <p className="cta-sub">
        Get instant access, explore supported games, and join the community behind Spectrum Cheat.
      </p>
      <div className="cta-actions">
        <a
          href="https://spectrumcheat.rexzy.xyz/"
          target="_blank"
          rel="noreferrer"
          className="btn-primary btn-large"
        >
          Buy Now
        </a>
        <a
          href="https://discord.gg/hackerclub"
          target="_blank"
          rel="noreferrer"
          className=" btn-outline btn-large"
        >
          Join Discord
        </a>
      </div>
    </div>
  </section>

      <footer className="footer" id="docs">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo-mark">
                <Image
                  src="/images/Spectrum Cheat Logo.png"
                  alt="Spectrum Cheat logo"
                  width={100}
                  height={100}
                  className="logo-image"
                />
              </div>
              <span className="brand-name">Spectrum Cheat</span>
              <p className="footer-tagline">A premium Roblox cheat built for smooth performance and reliable daily use, and trusted for over 5 years!</p>
            </div>

            <div className="footer-links">
              <div className="link-col">
                <h4>Platform</h4>
                <ul>
                  <li><Link href="/scripts">Scripts</Link></li>
                  <li><Link href="/status">Status</Link></li>
                  <li><Link href="/getkey">Get Key</Link></li>
                  <li><Link href="/#pricing">Pricing</Link></li>
                </ul>
              </div>
              <div className="link-col">
                <h4>Legal</h4>
                <ul>
                  <li><Link href="/terms">Terms of Service</Link></li>
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/security">Security</Link></li>
                  <li><Link href="/refund-policy">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2021–2026 Spectrum Cheat. All rights reserved.</span>
            <div className="footer-socials">
              <a
                href="https://www.youtube.com/@xZPUHigh"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.3 3.7-6.3 3.7Z"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/zpu.mnn2"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.6v2.1H8.6V14H11v7h2.5Z"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zpu.mnn2"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.6 1.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/Spectrum-Trash"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2.1 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.8 1 1.7 1 2.8 0 3.9-2.3 4.7-4.5 5 .4.3.8 1 .8 2v3c0 .3.2.7.7.5A10.2 10.2 0 0 0 22 12.3C22 6.6 17.5 2 12 2Z"
                  />
                </svg>
              </a>
              <a
                href="https://discord.gg/hackerclub"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20.3 4.4A16.7 16.7 0 0 0 16.2 3l-.2.5c1.5.4 2.2 1 2.2 1a13.4 13.4 0 0 0-8.4 0s.8-.7 2.5-1.1L12 3a16.6 16.6 0 0 0-4.1 1.4C5.3 8.2 4.7 11.9 5 15.6a16.9 16.9 0 0 0 5 2.5l1.2-1.9c-.7-.3-1.3-.6-1.9-1 .2.2 1.6 1.4 5.4 1.4s5.2-1.2 5.4-1.4c-.6.4-1.2.7-1.9 1l1.2 1.9a16.9 16.9 0 0 0 5-2.5c.4-4.3-.7-8-2.1-11.2ZM9.8 13.4c-.8 0-1.5-.8-1.5-1.8s.6-1.8 1.5-1.8c.8 0 1.5.8 1.5 1.8s-.7 1.8-1.5 1.8Zm4.4 0c-.8 0-1.5-.8-1.5-1.8s.6-1.8 1.5-1.8c.8 0 1.5.8 1.5 1.8s-.7 1.8-1.5 1.8Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}



