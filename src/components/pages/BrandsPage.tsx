"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { ArrowUpRight, Lock } from "lucide-react";
import { SectionLabel } from "@/components/shared/PagePrimitives";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease, dur, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const trustedBy = [
  "Glow",
  "TrailRunner",
  "NestHome",
  "ARCO",
  "Lumen",
  "Vellum",
  "Halcyon",
  "Kindling",
  "North/South",
  "Origins",
  "Folio",
  "Maven",
];

const results = [
  {
    brand: "GlowBeauty",
    category: "Beauty & Lifestyle",
    metric: "3.2M",
    metricLabel: "Impressions",
    sub: "42% lower CPM vs. paid ads",
    tone: "gradient-warm",
  },
  {
    brand: "TrailRunner",
    category: "Sports & Fitness",
    metric: "18K",
    metricLabel: "New sign-ups",
    sub: "From a 30-creator campaign",
    tone: "gradient-cool",
  },
  {
    brand: "NestHome",
    category: "Home & Living",
    metric: "4×",
    metricLabel: "ROAS",
    sub: "Creator-first product launch",
    tone: "gradient-accent",
  },
];

const process = [
  {
    num: "01",
    title: "Brief us.",
    badge: "Campaign brief",
    body: "A 10-minute form. Your goal, budget, target demo, and formats — we handle everything else.",
    stat: "10 min",
    statLabel: "to submit",
    bg: "var(--br-indigo)",
    ink: "var(--br-indigo-ink)",
    rotate: "-rotate-1",
  },
  {
    num: "02",
    title: "We match.",
    badge: "Creator matching",
    body: "Our team hand-picks creators from 10K+ vetted profiles. Every recommendation is explained.",
    stat: "48 hrs",
    statLabel: "to first match",
    bg: "var(--br-teal)",
    ink: "var(--br-teal-ink)",
    rotate: "rotate-1",
  },
  {
    num: "03",
    title: "Content ships.",
    badge: "Live & tracked",
    body: "Creators go live. Real-time analytics, UTM tracking, and direct attribution from day one.",
    stat: "4 days",
    statLabel: "avg. live time",
    bg: "var(--br-amber)",
    ink: "var(--br-amber-ink)",
    rotate: "-rotate-[0.5deg]",
  },
];

const previewCreators = [
  { name: "Maya R.",  slug: "mayareads",    niche: "Books & culture",    followers: "412K", engagement: "6.8%", platform: "Instagram", available: true,  img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&crop=face&q=80" },
  { name: "Kai L.",   slug: "kaiwalks",     niche: "Travel & food",      followers: "1.2M", engagement: "4.2%", platform: "YouTube",   available: false, img: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=600&h=800&fit=crop&crop=face&q=80" },
  { name: "Priya N.", slug: "priyaedits",   niche: "Beauty & wellness",  followers: "289K", engagement: "8.1%", platform: "Instagram", available: true,  img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face&q=80" },
  { name: "Theo W.",  slug: "theofitness",  niche: "Fitness coaching",   followers: "640K", engagement: "5.3%", platform: "TikTok",    available: true,  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&q=80" },
  { name: "Diego A.", slug: "diegoarchive", niche: "Streetwear & design",followers: "523K", engagement: "7.1%", platform: "Instagram", available: false, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face&q=80" },
  { name: "Linh P.",  slug: "linhcooks",    niche: "Recipes & home",     followers: "1.8M", engagement: "5.7%", platform: "YouTube",   available: true,  img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=face&q=80" },
];


/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  :root, [data-theme="brand"] {
    --br-indigo: #b8c8f8; --br-indigo-ink: #3848bf;
    --br-teal:   #b8f0e8; --br-teal-ink:   #1a7a6a;
    --br-amber:  #f8e0b8; --br-amber-ink:  #9a5a10;
    --br-rose:   #f8b8c8; --br-rose-ink:   #b02040;
    --br-text-on-pastel: rgba(0,0,0,0.85);
    --br-subtext-on-pastel: rgba(0,0,0,0.55);
  }
  html[data-theme="dark"] {
    --br-indigo: #dde4f8; --br-indigo-ink: #2d3aaa;
    --br-teal:   #d4f0ea; --br-teal-ink:   #126656;
    --br-amber:  #f5deb3; --br-amber-ink:  #7a4510;
    --br-rose:   #f5c8d8; --br-rose-ink:   #922040;
    --br-text-on-pastel: rgba(0,0,0,0.88);
    --br-subtext-on-pastel: rgba(0,0,0,0.55);
  }

  /* Hero */
  .br-hero-grid { display: grid; grid-template-columns: 1fr; min-height: 580px; }
  @media (min-width: 1024px) { .br-hero-grid { grid-template-columns: 1fr 420px; } }
  .br-stat-row { display: flex; flex-wrap: wrap; gap: 0.75rem; max-width: 28rem; }
  .br-stat-row > * { flex: 1 1 80px; min-width: 80px; }

  /* Mosaic */
  .br-mosaic-top { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent); }
  .br-mosaic-bottom { display: grid; grid-template-columns: 1fr 1fr; }
  .br-mosaic-cell { display: flex; flex-direction: column; justify-content: space-between; padding: 1.25rem; min-height: 150px; position: relative; overflow: hidden; }

  /* Power strip */
  .br-ps-grid { display: grid; grid-template-columns: 1fr; }
  @media (min-width: 768px) { .br-ps-grid { grid-template-columns: repeat(3, 1fr); } }
  .br-ps-cell { padding: 2.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
  @media (min-width: 768px) { .br-ps-cell { padding: 3rem 3rem; border-bottom: none; border-right: 1px solid rgba(255,255,255,0.1); } }
  .br-ps-cell:last-child { border: none; }

  /* Process steps */
  .br-steps-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
  @media (min-width: 768px) { .br-steps-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; } }

  /* Results rows */
  .br-result-cols { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
  @media (min-width: 768px) { .br-result-cols { grid-template-columns: 2fr 1fr 2fr; align-items: center; } }

  /* Creator preview */
  .br-creators-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: rgba(255,255,255,0.08); }
  @media (min-width: 640px)  { .br-creators-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1024px) { .br-creators-grid { grid-template-columns: repeat(6, 1fr); } }
  .br-creator-card { aspect-ratio: 3 / 4; display: block; position: relative; overflow: hidden; }
  .br-creator-card:hover { outline: 2.5px solid var(--color-accent); outline-offset: -2px; z-index: 2; }
  .br-creator-card[data-locked="true"] img { filter: blur(20px) saturate(0.4) brightness(0.7); }
  .br-creator-card[data-locked="true"]:hover { outline: none; cursor: default; }
  .br-lock-overlay {
    position: absolute; inset: 0; z-index: 5;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.75rem; text-align: center; padding: 1.5rem;
  }
  .br-lock-icon {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.35); backdrop-filter: blur(8px);
  }
  .br-creator-card[data-locked="true"] img { filter: blur(20px) saturate(0.4) brightness(0.7); }
  .br-creator-card[data-locked="true"]:hover { outline: none; cursor: default; }
  .br-lock-overlay {
    position: absolute; inset: 0; z-index: 5;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.75rem; text-align: center; padding: 1.5rem;
  }
  .br-lock-icon {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.35); backdrop-filter: blur(8px);
  }
  .br-platform-badge { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(255,255,255,0.72); backdrop-filter: blur(6px); color: rgba(0,0,0,0.65); }
  .br-avail-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .br-avail-dot.avail { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.7); }
  .br-avail-dot.busy  { background: rgba(255,255,255,0.28); }
`;

/* ─── Custom SVG marks ───────────────────────────────────────────── */

// Document with brief lines + checkmark — "Brief your campaign"
const BriefMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
    <path
      d="M5 2h9l4 4v14H5V2Z"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M14 2v4h4" stroke={color} strokeWidth="1.3" />
    <path
      d="M8 10h6M8 13h4"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M9 16.5l1.5 1.5 3-3"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hub + spokes scatter — "We match your brand to creators"
const NetworkMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
    <circle cx="11" cy="11" r="2.5" fill={color} />
    <circle cx="4" cy="5" r="1.7" fill={color} opacity="0.6" />
    <circle cx="18" cy="4" r="1.7" fill={color} opacity="0.6" />
    <circle cx="3" cy="17" r="1.7" fill={color} opacity="0.6" />
    <circle cx="19" cy="17" r="1.7" fill={color} opacity="0.6" />
    <path
      d="M5.5 6.5L9 9.5M12.8 9.2l4.2-4M5 15.5l4.2-3.2M13 12.5l4.5 3.5"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.45"
    />
  </svg>
);

// Curve arc + arrowhead + dot — "Content launches fast"
const LaunchMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
    <path
      d="M3 19 C5 11, 11 5, 19 3"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M15 3h4v4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="13.5" r="1.6" fill={color} />
  </svg>
);

// Ascending staircase bars — "Real attribution, real ROI"
const ROIMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
    <path
      d="M2.5 19.5h17"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <rect
      x="4"
      y="13"
      width="3.5"
      height="6.5"
      rx="0.5"
      fill={color}
      opacity="0.35"
    />
    <rect
      x="9"
      y="9"
      width="3.5"
      height="10.5"
      rx="0.5"
      fill={color}
      opacity="0.65"
    />
    <rect x="14" y="4" width="3.5" height="15.5" rx="0.5" fill={color} />
  </svg>
);

/* ─── Page ───────────────────────────────────────────────────────── */

export const BrandsPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero words reveal
      gsap.fromTo(
        ".br-word",
        { opacity: 0, y: 48, rotate: 3 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: dur.epic,
          ease: ease.cinematic,
          stagger: stagger.tight,
          delay: 0.1,
          overwrite: "auto",
          clearProps: "transform,opacity",
        },
      );
      gsap.fromTo(
        ".br-hero-in",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: dur.base,
          ease: ease.out,
          stagger: stagger.normal,
          delay: 0.45,
        },
      );

      // Power strip
      gsap.utils.toArray<Element>(".br-ps-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: dur.slow,
            ease: ease.out,
            delay: i * stagger.normal,
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Process steps
      gsap.utils.toArray<Element>(".br-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: dur.slow,
            ease: ease.out,
            delay: i * 0.12,
            scrollTrigger: {
              trigger: ".br-steps-grid",
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Results rows — clip-path wipe
      gsap.utils.toArray<Element>(".br-result-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", y: 16 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: dur.base,
            ease: ease.out,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: ".br-results-list",
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Result metrics pop
      gsap.utils.toArray<Element>(".br-metric").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: dur.base,
            ease: ease.bounce,
            delay: 0.2 + i * 0.1,
            scrollTrigger: {
              trigger: ".br-results-list",
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Creator cards
      gsap.fromTo(
        ".br-creator-card",
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: dur.slow,
          ease: ease.out,
          stagger: stagger.cards,
          scrollTrigger: {
            trigger: ".br-creators-grid",
            start: "top 95%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Benefit rows — clip-path wipe
      gsap.utils.toArray<Element>(".br-benefit-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", y: 16 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: dur.base,
            ease: ease.out,
            delay: i * 0.09,
            scrollTrigger: {
              trigger: ".br-benefits-list",
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Benefit icons pop
      gsap.utils.toArray<Element>(".br-benefit-icon").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: dur.base,
            ease: ease.bounce,
            delay: 0.15 + i * 0.09,
            scrollTrigger: {
              trigger: ".br-benefits-list",
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Generic reveals
      gsap.utils.toArray<Element>(".br-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: dur.slow,
            ease: ease.out,
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Logo marquee
      const track = ref.current?.querySelector<HTMLElement>(".br-logos");
      if (track) {
        const w = track.scrollWidth / 2;
        gsap.to(track, {
          x: -w,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % w) },
        });
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      <style>{PAGE_STYLES}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-(--color-border) dot-grid bracket-frame">
        <div className="br-hero-grid">
          {/* Left */}
          <div className="relative flex flex-col justify-center px-8 md:px-14 py-16 md:py-28 overflow-hidden gap-8">
            {/* Sparkle accents */}
            <Sparkle
              size={52}
              fill="var(--color-accent)"
              className="absolute top-8 right-8 md:right-16 -rotate-12 pointer-events-none opacity-70"
            />
            <Sparkle
              size={36}
              fill="var(--br-teal-ink)"
              className="absolute bottom-10 left-6 rotate-6 pointer-events-none opacity-50"
            />

            <div className="relative z-10 flex flex-col gap-7">
              {/* Badge */}
              <div
                className="br-hero-in inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full"
                style={{
                  background: "var(--color-accent)",
                  color: "rgba(0,0,0,0.85)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">
                  Open for Briefs
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-display italic leading-[0.9]"
                style={{ fontSize: "clamp(3.75rem,9vw,8rem)" }}
                aria-label="Turn creators into revenue."
              >
                {["Turn creators", "into", "revenue."].map((text) => (
                  <span key={text} className="block">
                    <span
                      className="br-word inline-block"
                      style={text === "revenue." ? { color: "oklch(0.7823 0.0488 220.2338)" } : undefined}
                    >
                      {text}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Script subtitle */}
              <p className="br-hero-in font-script text-xl md:text-2xl opacity-65">
                — real creators, real attribution, zero agency
              </p>

              {/* Body */}
              <p className="br-hero-in font-mono text-[13px] tracking-wide text-(--color-muted-fg) leading-relaxed max-w-md">
                Stop guessing which creators will perform. Icons matches your
                brand with vetted creators whose audiences actually convert —
                and tracks every dollar.
              </p>

              {/* CTAs */}
              <div className="br-hero-in flex flex-wrap items-center gap-4">
                <Link href="/brief-builder" className="btn-primary group">
                  Start a campaign
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/pricing" className="btn-ghost group">
                  See pricing
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Stat pills */}
              <div className="br-hero-in br-stat-row">
                {[
                  { value: "500+", label: "Campaigns", tone: "cream"  },
                  { value: "10M+", label: "Reach",     tone: "pink"   },
                  { value: "2×",   label: "Avg. ROAS", tone: "accent" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="sticker flex flex-col items-center justify-center py-4 px-2 text-center"
                    data-tone={s.tone}
                  >
                    <span className="font-display italic text-2xl leading-none mb-1">{s.value}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — live campaign results mosaic */}
          <div className="hidden lg:flex flex-col border-l border-(--color-border)">
            <div className="br-mosaic-top flex-1">
              <div className="br-mosaic-cell gradient-warm border-r border-(--color-border)/40">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Beauty
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      color: "rgba(0,0,0,0.55)",
                    }}
                  >
                    Live ●
                  </span>
                </div>
                <div>
                  <p
                    className="font-display text-4xl leading-none"
                    style={{ color: "rgba(0,0,0,0.75)" }}
                  >
                    3.2M
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.2em] mt-1"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Impressions
                  </p>
                  <p
                    className="font-display text-lg leading-none mt-2"
                    style={{ color: "rgba(0,0,0,0.7)" }}
                  >
                    GlowBeauty
                  </p>
                </div>
              </div>
              <div className="br-mosaic-cell gradient-cool">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Fitness
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      color: "rgba(0,0,0,0.55)",
                    }}
                  >
                    Delivered ✓
                  </span>
                </div>
                <div>
                  <p
                    className="font-display text-4xl leading-none"
                    style={{ color: "rgba(0,0,0,0.75)" }}
                  >
                    18K
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.2em] mt-1"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    New sign-ups
                  </p>
                  <p
                    className="font-display text-lg leading-none mt-2"
                    style={{ color: "rgba(0,0,0,0.7)" }}
                  >
                    TrailRunner
                  </p>
                </div>
              </div>
            </div>
            <div className="br-mosaic-bottom flex-1">
              <div className="br-mosaic-cell gradient-accent border-r border-(--color-border)/40">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Home
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      color: "rgba(0,0,0,0.55)",
                    }}
                  >
                    Delivered ✓
                  </span>
                </div>
                <div>
                  <p
                    className="font-display text-4xl leading-none"
                    style={{ color: "rgba(0,0,0,0.75)" }}
                  >
                    4×
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.2em] mt-1"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    ROAS achieved
                  </p>
                  <p
                    className="font-display text-lg leading-none mt-2"
                    style={{ color: "rgba(0,0,0,0.7)" }}
                  >
                    NestHome
                  </p>
                </div>
              </div>
              <div className="br-mosaic-cell gradient-mono">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.22em]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Design
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Active ●
                  </span>
                </div>
                <div>
                  <p
                    className="font-display text-4xl leading-none"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    $48K
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.2em] mt-1"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Creator fees managed
                  </p>
                  <p
                    className="font-display text-lg leading-none mt-2"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Maven
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo marquee ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-8 border-b border-(--color-border)">
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg), transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--color-bg), transparent)",
          }}
        />
        <div className="br-logos flex items-center gap-14 whitespace-nowrap w-max">
          {[...trustedBy, ...trustedBy].map((brand, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-3xl tracking-tight"
              style={{
                color: "color-mix(in srgb, var(--color-fg) 28%, transparent)",
              }}
            >
              {brand}
            </span>
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg)">
          500+ brand campaigns delivered
        </p>
      </section>

      {/* ── Power strip — KPIs ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-(--color-border)"
        style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
      >
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.05,
            transform: "translate(30%, -40%)",
          }}
        />
        <div className="br-ps-grid max-w-7xl mx-auto px-8 md:px-14 relative">
          {[
            {
              value: "500+",
              label: "Campaigns run",
              sub: "across 40+ verticals",
            },
            {
              value: "10M+",
              label: "Total creator reach",
              sub: "combined audience",
            },
            {
              value: "2×",
              label: "Avg. ROAS delivered",
              sub: "vs. paid ads benchmark",
            },
          ].map(({ value, label, sub }) => (
            <div key={label} className="br-ps-cell br-ps-reveal">
              <p
                className="font-display leading-none mb-3"
                style={{
                  fontSize: "clamp(3.5rem,7vw,6rem)",
                  color: "var(--color-bg)",
                }}
              >
                {value}
              </p>
              <p
                className="font-medium text-base mb-1"
                style={{ color: "var(--color-bg)" }}
              >
                {label}
              </p>
              <p
                className="font-mono text-[11px] tracking-wide"
                style={{
                  color: "color-mix(in srgb, var(--color-bg) 50%, transparent)",
                }}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works — 3-step process ────────────────────────── */}
      <section className="border-b border-(--color-border) px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div>
              <div
                // className="br-reveal"
                className="font-display leading-[0.9] flex flex-row gap-x-4"
                style={{ fontSize: "clamp(3rem,3vw,3rem)" }}
              >
                {[
                  { text: "How", accent: false },
                  { text: "it", accent: true },
                  { text: "works.", accent: false },
                ].map(({ text, accent }) => (
                  <span key={text} className="block">
                    <span
                      className="br-word inline-block"
                      style={
                        accent ? { color: "var(--color-accent-4)" } : undefined
                      }
                    >
                      {text}
                    </span>
                  </span>
                ))}
              </div>
            </div>
            <p className="br-reveal hidden md:block font-mono text-[12px] tracking-wide text-(--color-muted-fg) max-w-xs leading-relaxed self-end">
              From your first conversation to published content — typically
              under a week.
            </p>
          </div>

          <div className="br-steps-grid">
            {process.map(
              ({
                num,
                title,
                badge,
                body,
                stat,
                statLabel,
                bg,
                ink,
                rotate,
              }) => (
                <div
                  key={num}
                  className="br-step relative overflow-hidden rounded-lg border-2 border-(--color-fg)"
                  style={{
                    background: bg,
                    boxShadow: "8px 8px 0 0 var(--color-fg)",
                  }}
                >
                  {/* Watermark number */}
                  <span
                    aria-hidden
                    className="absolute -right-3 -top-3 font-display italic select-none pointer-events-none"
                    style={{
                      fontSize: "clamp(6rem,12vw,9rem)",
                      lineHeight: 1,
                      opacity: 0.13,
                      color: ink,
                    }}
                  >
                    {num}
                  </span>

                  <div className="relative z-10 p-8 md:p-10 flex flex-col justify-between min-h-[300px]">
                    <div>
                      {/* Badge sticker */}
                      <div
                        className={`inline-block px-3 py-1.5 rounded-full border-2 border-(--color-fg) font-mono text-[10px] tracking-[0.22em] uppercase mb-6 ${rotate}`}
                        style={{
                          background: "#ffffff",
                          color: "#0a0a0a",
                          boxShadow: "3px 3px 0 0 #0a0a0a",
                        }}
                      >
                        ✦ {badge}
                      </div>

                      <h3
                        className="font-display italic text-4xl md:text-5xl leading-none mb-4"
                        style={{ color: "var(--br-text-on-pastel)" }}
                      >
                        {title}
                      </h3>
                      <p
                        className="font-mono text-[12px] tracking-wide leading-relaxed"
                        style={{ color: "var(--br-subtext-on-pastel)" }}
                      >
                        {body}
                      </p>
                    </div>

                    {/* Stat at bottom */}
                    <div
                      className="mt-8 pt-5 border-t-2"
                      style={{
                        borderColor: `color-mix(in srgb, ${ink} 30%, transparent)`,
                      }}
                    >
                      <p
                        className="font-display italic text-3xl leading-none"
                        style={{ color: ink }}
                      >
                        {stat}
                      </p>
                      <p
                        className="font-mono text-[10px] uppercase tracking-[0.25em] mt-1.5"
                        style={{ color: "var(--br-subtext-on-pastel)" }}
                      >
                        {statLabel}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Results — editorial rows ──────────────────────────────── */}
      <section className="border-b border-(--color-border)">
        <div className="px-6 md:px-10 py-16 md:py-20 border-b border-(--color-border)">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="br-reveal mb-5 font-display text-4xl md:text-6xl leading-[0.95]">
                <SectionLabel>Results that speak</SectionLabel>
              </div>
            </div>
            <p className="br-reveal hidden md:block font-mono text-[12px] tracking-wide text-(--color-muted-fg) max-w-xs leading-relaxed self-end">
              No projections. No cherry-picked outliers. Three honest campaign
              breakdowns.
            </p>
          </div>
        </div>

        <div className="br-results-list max-w-7xl mx-auto">
          {results.map(
            ({ brand, category, metric, metricLabel, sub, tone }) => (
              <div
                key={brand}
                className="br-result-row group relative border-b border-(--color-border) overflow-hidden"
                style={{ clipPath: "inset(0 0 0% 0)" }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                >
                  <div
                    className={`${tone} absolute inset-0`}
                    style={{ opacity: 0.3 }}
                  />
                </div>

                <div className="relative z-10 br-result-cols px-6 md:px-10 py-9 md:py-11">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-[0.28em] text-(--color-muted-fg) mb-2 uppercase">
                      {category}
                    </span>
                    <span className="font-display text-3xl md:text-5xl lg:text-[3.5rem] leading-none">
                      {brand}
                    </span>
                  </div>

                  <div className="flex flex-col items-start md:items-center">
                    <span
                      className="br-metric font-display leading-none"
                      style={{
                        fontSize: "clamp(2.5rem,5vw,4rem)",
                        color: "var(--color-fg)",
                      }}
                    >
                      {metric}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) mt-1">
                      {metricLabel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[12px] tracking-wide text-(--color-muted-fg) leading-relaxed max-w-xs transition-colors duration-400 group-hover:text-(--color-fg)">
                      {sub}
                    </p>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-(--color-accent) opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ── Creator roster preview ────────────────────────────────── */}
      <section
        className="border-b border-(--color-border) px-6 md:px-10 py-20 md:py-28"
        style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div>
              <div className="br-reveal mb-5">
                <SectionLabel>The talent</SectionLabel>
              </div>
              <h2 className="br-reveal font-display text-4xl md:text-6xl leading-[0.95]" style={{ color: "var(--color-bg)" }}>
                10K+ creators,
                <br />
                ready to brief.
              </h2>
            </div>
            <div className="br-reveal flex items-end gap-6 self-end">
              <p className="font-mono text-[12px] tracking-wide max-w-xs leading-relaxed hidden md:block" style={{ color: "color-mix(in srgb, var(--color-bg) 55%, transparent)" }}>
                Beauty, fitness, food, travel, design — 40+ verticals, all
                audited for audience quality.
              </p>
              <Link href="/talents" className="btn-ghost group shrink-0" style={{ borderColor: "color-mix(in srgb, var(--color-bg) 30%, transparent)", color: "var(--color-bg)" }}>
                Browse roster
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="br-creators-grid rounded-lg">
            {previewCreators.map((c, i) => {
              const locked = i >= 2;
              const anonName = c.name.split(" ")[0].charAt(0) + ".";

              const cardContent = (
                <>
                  {/* Photo */}
                  <img
                    src={c.img}
                    alt={locked ? "Creator" : c.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
            {previewCreators.map((c, i) => {
              const locked = i >= 2;
              const anonName = c.name.split(" ")[0].charAt(0) + ".";

              const cardContent = (
                <>
                  {/* Photo */}
                  <img
                    src={c.img}
                    alt={locked ? "Creator" : c.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Subtle grain overlay */}
                  <div aria-hidden className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  {/* Subtle grain overlay */}
                  <div aria-hidden className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                  {/* Lock overlay */}
                  {locked && (
                    <div className="br-lock-overlay">
                      <div className="br-lock-icon">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
                        Premium creator
                      </p>
                      <Link
                        href="/pricing"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-all"
                        style={{
                          background: "var(--color-accent)",
                          color: "rgba(0,0,0,0.85)",
                          border: "1.5px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        Unlock profile <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {/* Index */}
                  <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: "rgba(0,0,0,0.3)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Lock overlay */}
                  {locked && (
                    <div className="br-lock-overlay">
                      <div className="br-lock-icon">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
                        Premium creator
                      </p>
                      <Link
                        href="/pricing"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-all"
                        style={{
                          background: "var(--color-accent)",
                          color: "rgba(0,0,0,0.85)",
                          border: "1.5px solid rgba(255,255,255,0.2)",
                        }}
                      >
                        Unlock profile <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {/* Index */}
                  <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em]"
                    style={{ color: "rgba(0,0,0,0.3)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Stacked badges — top right */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                    <span className="br-platform-badge">{c.platform}</span>
                    {!locked && (
                      <>
                        <span className="font-mono text-[11px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full"
                          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", color: "rgba(0,0,0,0.8)" }}>
                          {c.followers}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(4px)", color: "rgba(0,0,0,0.55)" }}>
                          {c.engagement} eng.
                        </span>
                      </>
                    )}
                  </div>
                  {/* Stacked badges — top right */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                    <span className="br-platform-badge">{c.platform}</span>
                    {!locked && (
                      <>
                        <span className="font-mono text-[11px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full"
                          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", color: "rgba(0,0,0,0.8)" }}>
                          {c.followers}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(4px)", color: "rgba(0,0,0,0.55)" }}>
                          {c.engagement} eng.
                        </span>
                      </>
                    )}
                  </div>

                  {/* Bottom panel */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)" }}>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-1.5"
                          style={{ color: "rgba(255,255,255,0.7)" }}>{locked ? c.niche.split(" ")[0] : c.niche}</p>
                        <h3 className="font-display text-2xl leading-none text-white flex items-center gap-2">
                          {locked ? anonName : c.name}
                          {!locked && <span className={`br-avail-dot ${c.available ? "avail" : "busy"}`} />}
                        </h3>
                      </div>
                      {!locked && (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{ background: "var(--color-accent)", color: "rgba(0,0,0,0.85)" }}>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );

              if (locked) {
                return (
                  <div key={c.name} className="br-creator-card group rounded-lg" data-locked="true">
                    {cardContent}
                  </div>
                );
              }
              return (
                <Link key={c.name} href={`/creators/${c.slug}`} className="br-creator-card group rounded-lg">
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Icons for Brands — editorial benefit list ─────────── */}
      <section className="border-b border-(--color-border)">
        <div className="px-6 md:px-10 py-16 md:py-20 border-b border-(--color-border)">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="br-reveal mb-5">
                <SectionLabel>Why Icons</SectionLabel>
              </div>
              <h2 className="br-reveal font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-2xl">
                Built around
                <br />
                how brands work.
              </h2>
            </div>
            <p className="br-reveal hidden md:block font-mono text-[12px] tracking-wide text-(--color-muted-fg) max-w-xs leading-relaxed self-end">
              Four things we get right that every other talent platform gets
              wrong.
            </p>
          </div>
        </div>

        <div className="br-benefits-list max-w-7xl mx-auto">
          {[
            {
              Mark: BriefMark,
              num: "01",
              title: "One brief, dozens of creators",
              body: "Write your goals once. We handle talent sourcing, brief distribution, and content QA.",
              iconBg: "var(--br-indigo)",
              iconColor: "var(--br-indigo-ink)",
            },
            {
              Mark: NetworkMark,
              num: "02",
              title: "10K+ vetted, brand-safe creators",
              body: "Every creator audited for engagement quality, audience demographics, and brand safety score.",
              iconBg: "var(--br-teal)",
              iconColor: "var(--br-teal-ink)",
            },
            {
              Mark: LaunchMark,
              num: "03",
              title: "Brief to live in under a week",
              body: "Average delivery is 4 days. No lengthy agency contracts. No production delays.",
              iconBg: "var(--br-amber)",
              iconColor: "var(--br-amber-ink)",
            },
            {
              Mark: ROIMark,
              num: "04",
              title: "Real attribution, not vanity",
              body: "UTM tracking, conversion pixels, and quarterly reports. Every dollar traced to a creator.",
              iconBg: "var(--br-rose)",
              iconColor: "var(--br-rose-ink)",
            },
          ].map(({ Mark, num, title, body, iconBg, iconColor }) => (
            <div
              key={title}
              className="br-benefit-row group relative border-b border-(--color-border) overflow-hidden cursor-default"
              style={{ clipPath: "inset(0 0 0% 0)" }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: iconBg }}
              />

              <div className="relative z-10 flex items-center gap-6 md:gap-10 px-6 md:px-10 py-9 md:py-11">
                <span className="font-mono text-[10px] tracking-[0.32em] text-(--color-muted-fg) w-6 shrink-0">
                  {num}
                </span>
                <div
                  className="br-benefit-icon w-12 h-12 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: iconBg,
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <Mark color={iconColor} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline md:gap-12">
                  <h3 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] leading-none shrink-0">
                    {title}
                  </h3>
                  <p className="font-mono text-[12px] tracking-wide text-(--color-muted-fg) leading-relaxed mt-2 md:mt-0 max-w-sm transition-colors duration-400 group-hover:text-(--color-fg)">
                    {body}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 shrink-0 text-(--color-accent) opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand testimonial — full inverted ────────────────────── */}
      <section
        className="relative overflow-hidden px-8 md:px-14 py-28 md:py-44"
        style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.06,
            transform: "translate(-30%, -40%)",
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <div className="br-reveal flex items-center gap-3 mb-12">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em]"
              style={{
                color: "color-mix(in srgb, var(--color-bg) 50%, transparent)",
              }}
            >
              ✦ Brand story
            </span>
          </div>

          <div
            className="br-reveal font-display leading-none mb-6 select-none"
            style={{
              fontSize: "clamp(5rem,12vw,10rem)",
              color: "var(--color-fg)",
              opacity: 0.15,
              lineHeight: 0.7,
            }}
          >
            "
          </div>

          <blockquote
            className="br-reveal font-display leading-[1.05] mb-14"
            style={{
              fontSize: "clamp(1.75rem,4vw,3.5rem)",
              color: "var(--color-bg)",
            }}
          >
            We tried every influencer platform. Icons was the first where a
            campaign manager actually pushed back on our brief to make it
            better.
          </blockquote>

          <footer className="br-reveal flex items-center gap-5">
            <div
              className="w-14 h-14 rounded-full gradient-warm flex items-center justify-center font-display text-xl"
              style={{ opacity: 0.85 }}
            >
              <span style={{ color: "rgba(0,0,0,0.6)" }}>J</span>
            </div>
            <div>
              <div
                className="font-medium text-base"
                style={{ color: "var(--color-bg)" }}
              >
                Jamie Chen
              </div>
              <div
                className="font-mono text-[11px] tracking-[0.15em] mt-1"
                style={{
                  color: "color-mix(in srgb, var(--color-bg) 50%, transparent)",
                }}
              >
                Head of Growth · GlowBeauty
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* ── CTA card ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-6 md:px-12 dot-grid bracket-frame border-t border-(--color-border)"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-4xl mx-auto relative">
          <Sparkle
            size={56}
            fill="var(--accent2)"
            className="absolute -top-4 -left-4 md:-left-10 -rotate-12 pointer-events-none"
          />
          <Sparkle
            size={44}
            fill="var(--accent4)"
            className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none"
          />

          <div
            className="sticker p-10 md:p-16 text-center flex flex-col items-center gap-8"
            data-tone="ink"
          >
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60 flex items-center gap-2">
              <span>✦</span><span>open for briefs</span><span>✦</span>
            </div>

            <h2 className="font-display italic text-[clamp(2.2rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]">
              Brief us in 10 minutes.
            </h2>

            <p className="font-script text-2xl md:text-3xl opacity-70">
              — hand-picked creators in your inbox within 48 hours
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/brief-builder" className="btn-primary">
                Start a campaign
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="btn-ghost"
                style={{
                  background: "transparent",
                  color: "var(--color-bg)",
                  borderColor: "var(--color-bg)",
                  boxShadow: "4px 4px 0 0 var(--color-accent)",
                }}
              >
                See how it works
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
