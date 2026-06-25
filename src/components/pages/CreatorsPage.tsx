"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Search, X, Lock } from "lucide-react";
import { ArrowUpRight, Sparkles, Search, X, Lock } from "lucide-react";
import { SectionShell, SectionLabel } from "@/components/shared/PagePrimitives";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease, dur, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

type Creator = {
  name: string;
  slug: string;
  niche: string;
  followers: string;
  engagement: string;
  platform: string;
  img: string;
  tier: "micro" | "mid" | "macro";
  category: string;
  available: boolean;
};

const featuredCreators: Creator[] = [
  {
    name: "Maya R.",
    slug: "mayareads",
    niche: "Books & culture",
    followers: "412K",
    engagement: "6.8%",
    platform: "Instagram",
    tier: "mid",
    category: "Lifestyle",
    available: true,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Kai L.",
    slug: "kaiwalks",
    niche: "Travel & food",
    followers: "1.2M",
    engagement: "4.2%",
    platform: "YouTube",
    tier: "macro",
    category: "Travel",
    available: false,
    img: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Priya N.",
    slug: "priyaedits",
    niche: "Beauty & wellness",
    followers: "289K",
    engagement: "8.1%",
    platform: "Instagram",
    tier: "mid",
    category: "Beauty",
    available: true,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Theo W.",
    slug: "theofitness",
    niche: "Fitness coaching",
    followers: "640K",
    engagement: "5.3%",
    platform: "TikTok",
    tier: "macro",
    category: "Fitness",
    available: true,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Nia O.",
    slug: "niamakes",
    niche: "Craft & DIY",
    followers: "186K",
    engagement: "9.4%",
    platform: "YouTube",
    tier: "mid",
    category: "Lifestyle",
    available: true,
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Diego A.",
    slug: "diegoarchive",
    niche: "Streetwear & design",
    followers: "523K",
    engagement: "7.1%",
    platform: "Instagram",
    tier: "macro",
    category: "Fashion",
    available: false,
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Sasha M.",
    slug: "sashabrews",
    niche: "Coffee & rituals",
    followers: "94K",
    engagement: "11.2%",
    platform: "TikTok",
    tier: "micro",
    category: "Food",
    available: true,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Linh P.",
    slug: "linhcooks",
    niche: "Recipes & home",
    followers: "1.8M",
    engagement: "5.7%",
    platform: "YouTube",
    tier: "macro",
    category: "Food",
    available: true,
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Zoe K.",
    slug: "zoekitchen",
    niche: "Home cooking",
    followers: "342K",
    engagement: "7.2%",
    platform: "YouTube",
    tier: "mid",
    category: "Food",
    available: true,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Max V.",
    slug: "maxventures",
    niche: "Tech reviews",
    followers: "1.4M",
    engagement: "3.8%",
    platform: "YouTube",
    tier: "macro",
    category: "Tech",
    available: false,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Asha D.",
    slug: "ashadances",
    niche: "Dance & movement",
    followers: "2.1M",
    engagement: "6.4%",
    platform: "TikTok",
    tier: "macro",
    category: "Fitness",
    available: true,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Finn R.",
    slug: "finnrides",
    niche: "Outdoor & adventure",
    followers: "78K",
    engagement: "12.3%",
    platform: "Instagram",
    tier: "micro",
    category: "Travel",
    available: true,
    img: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Jade L.",
    slug: "jadelivs",
    niche: "Sustainable living",
    followers: "221K",
    engagement: "8.8%",
    platform: "Instagram",
    tier: "mid",
    category: "Lifestyle",
    available: true,
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Omar S.",
    slug: "omarstyle",
    niche: "Menswear & styling",
    followers: "503K",
    engagement: "5.9%",
    platform: "Instagram",
    tier: "macro",
    category: "Fashion",
    available: false,
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Cleo M.",
    slug: "cleomindful",
    niche: "Wellness & mindset",
    followers: "167K",
    engagement: "9.7%",
    platform: "TikTok",
    tier: "mid",
    category: "Wellness",
    available: true,
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop&crop=face&q=80",
  },
  {
    name: "Bex T.",
    slug: "bextravels",
    niche: "Budget travel tips",
    followers: "88K",
    engagement: "10.4%",
    platform: "TikTok",
    tier: "micro",
    category: "Travel",
    available: true,
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face&q=80",
  },
];

const handles = featuredCreators.map((c) => `@${c.slug}`);

const earnings = [
  {
    metric: "Avg. campaign payout",
    icons: "$2,400",
    others: "$680",
    delta: "3.5×",
  },
  {
    metric: "Time to first payment",
    icons: "48 hrs",
    others: "30–90d",
    delta: "Faster",
  },
  {
    metric: "Talent commission",
    icons: "0%",
    others: "20–35%",
    delta: "Yours",
  },
  {
    metric: "Avg. monthly opportunities",
    icons: "12+",
    others: "2–3",
    delta: "5×",
  },
];

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  :root, [data-theme="brand"] {
    --cr-purple: #c8b8f8; --cr-purple-ink: #7c5cbf;
    --cr-green:  #b8f0c8; --cr-green-ink:  #2d7a4a;
    --cr-peach:  #f8c8b8; --cr-peach-ink:  #b04a20;
    --cr-yellow: #f8e8b8; --cr-yellow-ink: #8a6a10;
  }
  [data-theme="dark"] {
    --cr-purple: rgba(200,184,248,0.14); --cr-purple-ink: #c8b8f8;
    --cr-green:  rgba(184,240,200,0.14); --cr-green-ink:  #b8f0c8;
    --cr-peach:  rgba(248,200,184,0.14); --cr-peach-ink:  #f8c8b8;
    --cr-yellow: rgba(248,232,184,0.14); --cr-yellow-ink: #f8e8b8;
  }

  /* Hero */
  .cr-hero-grid { display: grid; grid-template-columns: 1fr; min-height: 580px; }
  @media (min-width: 1024px) { .cr-hero-grid { grid-template-columns: 1fr 400px; } }
  .cr-stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; max-width: 28rem; }

  /* Mosaic panel cells */
  .mosaic-cell { display: flex; align-items: flex-end; padding: 1.25rem; min-height: 150px; position: relative; overflow: hidden; }
  .mosaic-top { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent); }
  .mosaic-bottom { display: grid; grid-template-columns: 1fr 1fr; }

  /* Creator grid */
  .creators-grid { display: grid; grid-template-columns: 1fr; gap: 0; background: var(--color-bg); }
  @media (min-width: 640px)  { .creators-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .creators-grid { grid-template-columns: repeat(4, 1fr); } }
  .creator-card { aspect-ratio: 3 / 4; display: block; position: relative; overflow: hidden; box-shadow: inset -1px -1px 0 0 var(--color-border); }
  .creator-card:hover { outline: 2.5px solid var(--color-accent); outline-offset: -2px; z-index: 2; }

  /* Power strip */
  .ps-grid { display: grid; grid-template-columns: 1fr; }
  @media (min-width: 768px) { .ps-grid { grid-template-columns: repeat(3, 1fr); } }
  .ps-cell { padding: 2.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
  @media (min-width: 768px) { .ps-cell { padding: 3rem 3rem; border-bottom: none; border-right: 1px solid rgba(255,255,255,0.1); } }
  .ps-cell:last-child { border: none; }

  /* Steps */
  .steps-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  @media (min-width: 768px) { .steps-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; } }
  .step-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .step-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

  /* Benefits — hairline grid */
  .benefits-grid { display: grid; grid-template-columns: 1fr; gap: 1px; }
  @media (min-width: 640px)  { .benefits-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .benefits-grid { grid-template-columns: repeat(4, 1fr); } }

  .cr-platform-badge { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(255,255,255,0.72); backdrop-filter: blur(6px); color: rgba(0,0,0,0.65); }
  .cr-avail-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .cr-avail-dot.avail { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.7); }
  .cr-avail-dot.busy  { background: rgba(255,255,255,0.28); }

  /* Search input */
  .cr-search-wrap { position: relative; display: flex; align-items: center; }
  .cr-search-icon { position: absolute; left: 0.875rem; pointer-events: none; color: var(--color-muted-fg); transition: color 0.15s; }
  .cr-search-input {
    width: 100%; padding: 0.5rem 2.25rem 0.5rem 2.5rem;
    border: 1.5px solid var(--color-border); border-radius: 999px;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
    background: var(--color-bg); color: var(--color-fg);
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none; min-width: 200px;
  }
  .cr-search-input::placeholder { color: var(--color-muted-fg); opacity: 0.7; }
  .cr-search-input:focus { border-color: var(--color-fg); box-shadow: 2px 2px 0 0 var(--color-accent); }
  .cr-search-clear { position: absolute; right: 0.6rem; padding: 0.2rem; color: var(--color-muted-fg); opacity: 0.6; cursor: pointer; background: none; border: none; display: flex; align-items: center; justify-content: center; border-radius: 999px; transition: opacity 0.15s; }
  .cr-search-clear:hover { opacity: 1; }

  /* Category filter bar */
  .cr-filter-bar { display: flex; align-items: center; gap: 0.5rem; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; padding-inline-end: 1.5rem; }
  .cr-filter-bar::-webkit-scrollbar { display: none; }
  .cr-filter-pill {
    flex-shrink: 0; padding: 0.4rem 1.1rem; border-radius: 999px;
    border: 1.5px solid var(--color-border);
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    cursor: pointer; background: var(--color-bg); color: var(--color-muted-fg);
    transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s;
    white-space: nowrap; user-select: none;
  }
  .cr-filter-pill:hover { border-color: var(--color-fg); color: var(--color-fg); }
  .cr-filter-pill:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }
  .cr-filter-pill[data-active="true"] {
    background: var(--color-fg); border-color: var(--color-fg); color: var(--color-bg);
    box-shadow: 2px 2px 0 0 var(--color-accent);
  }

  /* Locked / anonymous creator cards */
  .creator-card[data-locked="true"] img { filter: blur(20px) saturate(0.4) brightness(0.7); }
  .creator-card[data-locked="true"]:hover { outline: none; cursor: default; }
  .creator-card[data-locked="true"] .cr-lock-overlay {
    position: absolute; inset: 0; z-index: 5;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.75rem; text-align: center; padding: 1.5rem;
  }
  .cr-lock-icon {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.35); backdrop-filter: blur(8px);
  }

  /* Locked / anonymous creator cards */
  .creator-card[data-locked="true"] img { filter: blur(20px) saturate(0.4) brightness(0.7); }
  .creator-card[data-locked="true"]:hover { outline: none; cursor: default; }
  .creator-card[data-locked="true"] .cr-lock-overlay {
    position: absolute; inset: 0; z-index: 5;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.75rem; text-align: center; padding: 1.5rem;
  }
  .cr-lock-icon {
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.35); backdrop-filter: blur(8px);
  }
`;

/* ─── Creator card ───────────────────────────────────────────────── */

function CreatorCardInner({
function CreatorCardInner({
  c,
  index,
  locked,
  locked,
}: {
  c: (typeof featuredCreators)[0];
  index: number;
  locked: boolean;
  locked: boolean;
}) {
  const anonName = c.name.split(" ")[0].charAt(0) + ".";
  const anonNiche = c.category;

  const anonName = c.name.split(" ")[0].charAt(0) + ".";
  const anonNiche = c.category;

  return (
    <>
    <>
      {/* Photo */}
      <img
        src={c.img}
        alt={locked ? "Creator" : c.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Subtle dot overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Lock overlay — visible only when locked */}
      {locked && (
        <div className="cr-lock-overlay">
          <div className="cr-lock-icon">
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
      <span
        className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em]"
        style={{ color: "rgba(255,255,255,0.6)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Badges */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
        <span className="cr-platform-badge">{c.platform}</span>
        {!locked && (
          <>
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
                color: "rgba(0,0,0,0.8)",
              }}
            >
              {c.followers}
            </span>
            <span
              className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(4px)",
                color: "rgba(0,0,0,0.55)",
              }}
            >
              {c.engagement} eng.
            </span>
          </>
        )}
        {locked && (
          <span
            className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(4px)",
              color: "rgba(0,0,0,0.45)",
            }}
          >
            {c.tier}
          </span>
        )}
        {!locked && (
          <>
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
                color: "rgba(0,0,0,0.8)",
              }}
            >
              {c.followers}
            </span>
            <span
              className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(4px)",
                color: "rgba(0,0,0,0.55)",
              }}
            >
              {c.engagement} eng.
            </span>
          </>
        )}
        {locked && (
          <span
            className="font-mono text-[9px] tracking-[0.15em] px-2.5 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(4px)",
              color: "rgba(0,0,0,0.45)",
            }}
          >
            {c.tier}
          </span>
        )}
      </div>

      {/* Bottom panel */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
        }}
      >
        <div className="flex items-end justify-between gap-3">
          <div>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.25em] mb-1.5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {locked ? anonNiche : c.niche}
              {locked ? anonNiche : c.niche}
            </p>
            <h3 className="font-display text-2xl leading-none text-white flex items-center gap-2">
              {locked ? anonName : c.name}
              {!locked && (
                <span
                  className={`cr-avail-dot ${c.available ? "avail" : "busy"}`}
                />
              )}
              {locked ? anonName : c.name}
              {!locked && (
                <span
                  className={`cr-avail-dot ${c.available ? "avail" : "busy"}`}
                />
              )}
            </h3>
          </div>
          {!locked && (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                background: "var(--color-accent)",
                color: "rgba(0,0,0,0.85)",
              }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          )}
          {!locked && (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                background: "var(--color-accent)",
                color: "rgba(0,0,0,0.85)",
              }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CreatorCard({
  c,
  index,
  locked = false,
}: {
  c: (typeof featuredCreators)[0];
  index: number;
  locked?: boolean;
}) {
  if (locked) {
    return (
      <div className="creator-card group" data-locked="true">
        <CreatorCardInner c={c} index={index} locked />
      </div>
    );
  }
  return (
    <Link href={`/creators/${c.slug}`} className="creator-card group">
      <CreatorCardInner c={c} index={index} locked={false} />
    </Link>
  );
}

/* ─── Benefit icon marks — custom SVGs, not generic Lucide ──────── */

// Clock face with hands — "48hr payment" concept
const PayMark = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 22 22"
    fill="none"
    width="22"
    height="22"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="12" r="8" stroke={color} strokeWidth="1.4" />
    <path d="M11 8v4.5l3 1.8" stroke={color} strokeWidth="1.5" />
    <path d="M8 3h6" stroke={color} strokeWidth="1.4" />
    <path d="M11 3v1.5" stroke={color} strokeWidth="1.4" />
  </svg>
);

// Radar rings + crosshair — "precision matching" concept
const MatchMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
    <circle
      cx="11"
      cy="11"
      r="9"
      stroke={color}
      strokeWidth="1.2"
      strokeDasharray="2.5 2"
    />
    <circle cx="11" cy="11" r="5.5" stroke={color} strokeWidth="1.4" />
    <circle cx="11" cy="11" r="2" fill={color} />
    <path
      d="M11 2v3M11 17v3M2 11h3M17 11h3"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// Flowing brushstroke / signature — "your creative voice" concept
const CreativeMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
    <path
      d="M3 18 C5 10, 9 4, 19 3"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M3 18 C3 15, 5 14, 6.5 15.5 C8 17, 6.5 20, 3 18Z" fill={color} />
    <path
      d="M9 13 C12 9, 15 6, 19 3"
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.45"
    />
  </svg>
);

// Three nodes in triangle with connectors — "network / community" concept
const CommunityMark = ({ color }: { color: string }) => (
  <svg viewBox="0 0 22 22" fill="none" width="22" height="22">
    <circle cx="11" cy="4" r="2.2" fill={color} />
    <circle cx="4" cy="17" r="2.2" fill={color} />
    <circle cx="18" cy="17" r="2.2" fill={color} />
    <path
      d="M11 6.2L4.8 14.8M11 6.2l6.2 8.6M6.2 17h9.6"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Page ───────────────────────────────────────────────────────── */

const PREVIEW_COUNT = 8;
const FREE_PREVIEW = 2; // first N cards shown unlocked, rest are anonymous/blurred
const FREE_PREVIEW = 2; // first N cards shown unlocked, rest are anonymous/blurred
const CATEGORIES = ["All", "Lifestyle", "Travel", "Beauty", "Fitness", "Fashion", "Food", "Tech", "Wellness"];

export const CreatorsPage = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const q = searchQuery.trim().toLowerCase();
  const filteredCreators = featuredCreators
    .filter((c) => {
      const matchCat = activeCategory === "All" || c.category === activeCategory;
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.niche.toLowerCase().includes(q) ||
        c.platform.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tier.toLowerCase().includes(q);
      return matchCat && matchQ;
    })
    .slice(0, q || activeCategory !== "All" ? undefined : PREVIEW_COUNT);

  // Animate cards in whenever the filter or search changes
  React.useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".creator-card");
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.42, ease: "power2.out", stagger: 0.055, overwrite: "auto" },
    );
  }, [activeCategory, searchQuery]);

  useGSAP(
    () => {
      // Hero words
      gsap.fromTo(
        ".cr-word",
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
        ".cr-hero-in",
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

      // Creator cards
      gsap.fromTo(
        ".creator-card",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: dur.slow,
          ease: ease.out,
          stagger: stagger.cards,
          scrollTrigger: {
            trigger: ".creators-grid",
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      // Generic reveals
      gsap.utils.toArray<Element>(".cr-reveal").forEach((el) => {
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

      // Power strip slide up
      gsap.utils.toArray<Element>(".ps-reveal").forEach((el, i) => {
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
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Step numbers
      gsap.utils.toArray<Element>(".step-num").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 0.35,
            scale: 1,
            duration: dur.base,
            ease: ease.bounce,
            delay: i * stagger.normal,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Earnings rows — slide in from right, staggered
      gsap.utils.toArray<Element>(".earnings-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: dur.base,
            ease: ease.out,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: ".earnings-table",
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Earnings values pop
      gsap.utils.toArray<Element>(".earnings-value").forEach((el, i) => {
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
              trigger: ".earnings-table",
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Benefit rows — clip-path wipe + y
      gsap.utils.toArray<Element>(".benefit-row").forEach((el, i) => {
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
              trigger: ".benefits-list",
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Benefit icons pop in
      gsap.utils.toArray<Element>(".benefit-icon").forEach((el, i) => {
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
              trigger: ".benefits-list",
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Marquee
      const track = ref.current?.querySelector<HTMLElement>(".cr-marquee");
      if (track) {
        const w = track.scrollWidth / 2;
        gsap.to(track, {
          x: -w,
          duration: 32,
          ease: ease.scrub,
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
      <section className="relative overflow-hidden border-b border-(--color-border) bracket-frame dot-grid">
        <Sparkle
          size={52}
          fill="var(--accent2)"
          className="absolute top-12 right-[8%] rotate-12 opacity-55 pointer-events-none z-10"
        />
        <Sparkle
          size={38}
          fill="var(--accent4)"
          className="absolute bottom-12 right-[15%] -rotate-6 opacity-50 pointer-events-none z-10"
        />
        <div className="cr-hero-grid">
          {/* Left */}
          <div className="relative flex flex-col justify-center px-8 md:px-14 py-16 md:py-28 overflow-hidden gap-8">
            {/* Ambient blobs */}
            <div
              aria-hidden
              className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--cr-purple) 0%, transparent 65%)",
                opacity: 0.55,
                transform: "translate(-35%, -35%)",
              }}
            />
            <div
              aria-hidden
              className="absolute bottom-0 right-16 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--cr-peach) 0%, transparent 65%)",
                opacity: 0.6,
                transform: "translate(10%, 25%)",
              }}
            />

            <div className="relative z-10 flex flex-col gap-7">
              {/* NOW CASTING badge */}
              <div
                className="cr-hero-in inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full"
                style={{
                  background: "var(--color-accent)",
                  color: "rgba(0,0,0,0.85)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-bold">
                  Now Casting
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-display leading-[0.9]"
                style={{ fontSize: "clamp(3.75rem,9vw,8rem)" }}
                aria-label="Built For Talent."
              >
                {["Built", "For", "Talent."].map((w) => (
                  <span key={w} className="block">
                    <span
                      className="cr-word inline-block"
                      style={w === "For" ? { color: "oklch(0.7823 0.0488 220.2338)" } : undefined}
                    >
                      {w}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Script subtitle */}
              <p className="cr-hero-in font-script text-xl md:text-2xl opacity-65">
                — real deals, fair pay, creative freedom
              </p>

              {/* Body */}
              <p className="cr-hero-in font-mono text-[13px] tracking-wide text-(--color-muted-fg) leading-relaxed max-w-md">
                Icons gives you real brand deals, fair pay, and creative freedom
                — so you can focus on making content that actually moves your
                audience.
              </p>

              {/* CTA buttons */}
              <div className="cr-hero-in flex flex-wrap items-center gap-4">
                <Link href="/talents/apply" className="btn-primary group">
                  Apply as talent
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="#how-it-works" className="btn-ghost group">
                  How it works
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Stat pills */}
              <div className="cr-hero-in cr-stat-row">
                {[
                  { value: "10K+", label: "Talents", tone: "cream" },
                  { value: "$10M+", label: "Earnings", tone: "pink" },
                  { value: "4.8★", label: "Rating", tone: "accent" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="sticker flex flex-col items-center justify-center py-4 px-2 text-center"
                    data-tone={s.tone}
                  >
                    <span className="font-display italic text-2xl leading-none mb-1">
                      {s.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — creator mosaic */}
          <div className="hidden lg:flex flex-col border-l border-(--color-border)">
            <div className="mosaic-top flex-1">
              <div className="mosaic-cell gradient-warm border-r border-(--color-border)/40">
                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.22em] mb-0.5"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Books
                  </p>
                  <p
                    className="font-display text-xl leading-none"
                    style={{ color: "rgba(0,0,0,0.8)" }}
                  >
                    Maya R.
                  </p>
                </div>
                <div
                  className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  412K
                </div>
              </div>
              <div className="mosaic-cell gradient-cool">
                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.22em] mb-0.5"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Travel
                  </p>
                  <p
                    className="font-display text-xl leading-none"
                    style={{ color: "rgba(0,0,0,0.8)" }}
                  >
                    Kai L.
                  </p>
                </div>
                <div
                  className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  1.2M
                </div>
              </div>
            </div>
            <div className="mosaic-bottom flex-1">
              <div className="mosaic-cell gradient-accent border-r border-(--color-border)/40">
                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.22em] mb-0.5"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Beauty
                  </p>
                  <p
                    className="font-display text-xl leading-none"
                    style={{ color: "rgba(0,0,0,0.8)" }}
                  >
                    Priya N.
                  </p>
                </div>
                <div
                  className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  289K
                </div>
              </div>
              <div className="mosaic-cell gradient-mono">
                <div>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.22em] mb-0.5"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    Fitness
                  </p>
                  <p
                    className="font-display text-xl leading-none"
                    style={{ color: "rgba(0,0,0,0.8)" }}
                  >
                    Theo W.
                  </p>
                </div>
                <div
                  className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  640K
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POWER STRIP — dark inverted KPIs ─────────────────────── */}
      <section
        style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
      >
        <div className="ps-grid max-w-7xl mx-auto px-8 md:px-14">
          {[
            {
              value: "$2,400",
              label: "Average campaign payout",
              sub: "vs $680 industry avg",
            },
            {
              value: "48 hrs",
              label: "Time to first payment",
              sub: "not 30 to 90 days",
            },
            {
              value: "0%",
              label: "Commission we ever take",
              sub: "you keep everything",
            },
          ].map(({ value, label, sub }) => (
            <div key={label} className="ps-cell ps-reveal">
              <div
                className="font-display leading-none mb-3"
                style={{
                  fontSize: "clamp(3rem,6vw,5.5rem)",
                  color: "var(--color-bg)",
                }}
              >
                {value}
              </div>
              <div
                className="text-base font-medium mb-1.5"
                style={{ color: "var(--color-bg)" }}
              >
                {label}
              </div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.25em]"
                style={{
                  color: "color-mix(in srgb, var(--color-bg) 45%, transparent)",
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Handles marquee ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-8 border-b border-(--color-border)"
        style={{ background: "var(--color-panel)" }}
      >
        <div className="cr-marquee flex items-center gap-10 whitespace-nowrap w-max">
          {[...handles, ...handles].map((h, i) => (
            <span key={i} className="flex items-center gap-10">
              {i % 3 === 0 ? (
                <span
                  className="font-display text-5xl md:text-6xl leading-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  {h}
                </span>
              ) : (
                <span
                  className="font-display text-5xl md:text-6xl leading-none"
                  style={{
                    WebkitTextStroke: "1px var(--fg)",
                    WebkitTextFillColor: "transparent",
                    opacity: 0.3,
                  }}
                >
                  {h}
                </span>
              )}
              <Sparkles
                className="w-4 h-4 shrink-0 text-(--color-accent)"
                style={{ opacity: i % 3 === 0 ? 0.9 : 0.4 }}
              />
            </span>
          ))}
        </div>
      </section>

      {/* ── Creator showcase ────────────────────────────────────── */}
      <section className="border-t border-(--color-border)">
        {/* Header */}
        <div className="px-6 md:px-10 py-14 md:py-20 border-b border-(--color-border)">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="cr-reveal mb-5">
                <SectionLabel>On the platform</SectionLabel>
              </div>
              <h2 className="cr-reveal font-display text-4xl md:text-6xl leading-[0.95]">
                A roster of voices,
                <br />
                not influencers.
              </h2>
            </div>
            <p className="cr-reveal hidden md:block font-mono text-[12px] tracking-wide text-(--color-muted-fg) max-w-xs leading-relaxed self-end">
              Every talent is verified for audience quality, engagement, and
              brand-safety.
            </p>
          </div>
        </div>

        {/* Search + filter bar */}
        <div className="px-6 md:px-10 py-4 border-b border-(--color-border) flex flex-col gap-3">
          {/* Search row */}
          <div className="max-w-7xl mx-auto w-full">
            <div className="cr-search-wrap max-w-sm">
              <Search className="cr-search-icon w-3.5 h-3.5" aria-hidden />
              <input
                ref={searchRef}
                type="search"
                className="cr-search-input"
                placeholder="Search by name, niche, platform…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search talent"
              />
              {searchQuery && (
                <button
                  className="cr-search-clear"
                  onClick={() => { setSearchQuery(""); searchRef.current?.focus(); }}
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Filter pills */}
          <div className="relative">
            {/* right-fade hint for horizontal scroll on mobile */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:hidden"
              style={{ background: "linear-gradient(to right, transparent, var(--color-bg))" }} />
            <div className="cr-filter-bar max-w-7xl mx-auto" role="group" aria-label="Filter talent by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className="cr-filter-pill"
                  data-active={activeCategory === cat ? "true" : "false"}
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {activeCategory === cat && <span className="mr-1.5" aria-hidden>✦</span>}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef}>
          <div className="creators-grid">
            {filteredCreators.length > 0 ? (
              filteredCreators.map((c, i) => (
                <CreatorCard key={c.slug} c={c} index={i} locked={i >= FREE_PREVIEW} />
                <CreatorCard key={c.slug} c={c} index={i} locked={i >= FREE_PREVIEW} />
              ))
            ) : (
              <div className="col-span-full py-28 flex flex-col items-center gap-6 text-center px-6">
                <Sparkle size={52} fill="var(--color-fg)" className="opacity-10" />
                <div className="flex flex-col gap-2">
                  <p className="font-display italic text-3xl md:text-4xl" style={{ color: "var(--color-fg)", opacity: 0.3 }}>
                    {q ? `No results for "${searchQuery}".` : `No ${activeCategory.toLowerCase()} talent yet.`}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-(--color-muted-fg)">
                    {featuredCreators.length}+ total talents across all categories
                  </p>
                </div>
                <button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="btn-primary"
                >
                  Show all talent
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Unlock CTA banner */}
        <div className="px-6 md:px-10 py-12 border-t-2 border-(--color-fg)" style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">
                <Lock className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />
                {filteredCreators.length - FREE_PREVIEW}+ profiles locked
              </p>
              <h3 className="font-display italic text-2xl md:text-3xl leading-tight">
                Unlock the full roster.
              </h3>
              <p className="font-sans text-[13px] leading-relaxed opacity-60 mt-2 max-w-md">
                Subscribe to access full creator profiles, engagement stats, contact details, and direct booking.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3 rounded-full shrink-0 transition-all"
              style={{ background: "var(--color-accent)", color: "var(--color-fg)", border: "2px solid var(--color-accent)" }}
            >
              View plans <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Show more CTA */}
        <div className="px-6 md:px-10 py-14 border-t border-(--color-border) flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-(--color-muted-fg)">
            {q
              ? `${filteredCreators.length} result${filteredCreators.length !== 1 ? "s" : ""} for "${searchQuery}"`
              : activeCategory === "All"
              ? `Showing ${Math.min(PREVIEW_COUNT, filteredCreators.length)} of ${featuredCreators.length}+ talents`
              : `${filteredCreators.length} talent${filteredCreators.length !== 1 ? "s" : ""} in ${activeCategory}`}
          </p>
          <Link href="/talents/apply" className="btn-primary group cr-reveal">
            Join the roster
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <SectionShell
        eyebrow="How it works"
        title="Three steps. No agency in the middle."
        className="bracket-frame"
      >
        <div className="steps-grid pb-3 pr-3">
          {[
            {
              n: "01",
              title: "Build your profile",
              body: "— showcase your niche, audience, and content style in under 10 minutes.",
              tone: "cream",
            },
            {
              n: "02",
              title: "Get matched",
              body: "— our AI surfaces brands that genuinely align with your values and feed.",
              tone: "pink",
            },
            {
              n: "03",
              title: "Create & get paid",
              body: "— collaborate on your terms. Payouts within 48 hours of delivery.",
              tone: "accent",
            },
          ].map(({ n, title, body, tone }) => (
            <article
              key={n}
              className="step-card sx-reveal sticker flex flex-col gap-5 p-8"
              data-tone={tone}
            >
              <span
                className="step-num font-display italic leading-none opacity-20"
                style={{ fontSize: "clamp(4rem,8vw,6rem)" }}
              >
                {n}
              </span>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-60">
                Step {n}
              </div>
              <h3 className="font-display italic text-xl md:text-2xl leading-tight">
                {title}
              </h3>
              <p className="font-script text-lg leading-snug opacity-70">
                {body}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>

      {/* ── Earnings comparison ─────────────────────────────────── */}
      <section className="border-t border-(--color-border) px-6 md:px-10 py-20 md:py-28 bracket-frame">
        <style>{`
          .earnings-cols { display: grid; grid-template-columns: 1fr; gap: 0; }
          @media (min-width: 768px) { .earnings-cols { grid-template-columns: 3fr 1.6fr 1.6fr 1.4fr; } }
        `}</style>
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div>
              <div className="cr-reveal mb-5">
                <SectionLabel>The numbers</SectionLabel>
              </div>
              <h2 className="cr-reveal font-display text-4xl md:text-6xl leading-[0.95] max-w-xl">
                Icons vs.
                <br />
                the market.
              </h2>
            </div>
            <p className="cr-reveal hidden md:block font-mono text-[12px] tracking-wide text-(--color-muted-fg) max-w-xs leading-relaxed self-end">
              An honest side-by-side against typical influencer agencies and
              brand marketplaces.
            </p>
          </div>

          {/* Table */}
          <div className="earnings-table">
            {/* Column headers */}
            <div
              className="earnings-cols items-center border-b-2 pb-4 mb-0"
              style={{ borderColor: "var(--color-fg)" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) hidden md:block">
                Metric
              </div>
              {/* Icons column — highlighted */}
              <div className="hidden md:flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] font-bold"
                  style={{
                    background: "var(--color-accent)",
                    color: "rgba(0,0,0,0.85)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  ✦ Icons
                </span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) hidden md:block">
                Typical
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) text-right hidden md:block">
                Difference
              </div>
            </div>

            {/* Rows */}
            {earnings.map((e, i) => (
              <div
                key={e.metric}
                className="earnings-row earnings-cols items-center border-b border-(--color-border) py-7 group transition-colors duration-300 hover:bg-(--color-panel) -mx-6 md:-mx-0 px-6 md:px-0"
              >
                {/* Metric */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) mb-1 md:hidden">
                    Metric
                  </p>
                  <span className="text-base md:text-lg font-medium">
                    {e.metric}
                  </span>
                </div>

                {/* Icons value */}
                <div className="flex flex-row md:flex-col gap-3 md:gap-0 items-baseline md:items-start mt-4 md:mt-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) md:hidden">
                    Icons
                  </p>
                  <span
                    className="earnings-value font-display leading-none"
                    style={{
                      fontSize: "clamp(2rem,4vw,3rem)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {e.icons}
                  </span>
                </div>

                {/* Typical value */}
                <div className="flex flex-row md:flex-col gap-3 md:gap-0 items-baseline md:items-start mt-2 md:mt-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) md:hidden">
                    Typical
                  </p>
                  <span className="font-mono text-sm md:text-base text-(--color-muted-fg) line-through decoration-1">
                    {e.others}
                  </span>
                </div>

                {/* Delta */}
                <div className="flex justify-start md:justify-end mt-3 md:mt-0">
                  <span
                    className="inline-flex items-center px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] font-bold"
                    style={{
                      background: "var(--color-accent)",
                      color: "rgba(0,0,0,0.85)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {e.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Icons — editorial horizontal list ───────────────── */}
      <section className="border-t border-(--color-border) bracket-frame">
        {/* Section header */}
        <div className="px-6 md:px-10 py-16 md:py-20 border-b border-(--color-border)">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="cr-reveal mb-5">
                <SectionLabel>Why Icons</SectionLabel>
              </div>
              <h2 className="cr-reveal font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-2xl">
                Built around how
                <br />
                you actually work.
              </h2>
            </div>
            <p className="cr-reveal hidden md:block font-mono text-[12px] tracking-wide text-(--color-muted-fg) max-w-xs leading-relaxed self-end">
              Four things we got right that every talent platform gets wrong.
            </p>
          </div>
        </div>

        {/* Benefit rows */}
        <div className="benefits-list max-w-7xl mx-auto">
          {[
            {
              Mark: PayMark,
              num: "01",
              title: "Fair, fast pay",
              body: "No chasing invoices. Direct deposit within 48 hours of delivery.",
              iconBg: "var(--cr-purple)",
              iconColor: "var(--cr-purple-ink)",
            },
            {
              Mark: MatchMark,
              num: "02",
              title: "Matched opportunities",
              body: "Stop cold-pitching. We surface deals relevant to your niche.",
              iconBg: "var(--cr-green)",
              iconColor: "var(--cr-green-ink)",
            },
            {
              Mark: CreativeMark,
              num: "03",
              title: "Creative control",
              body: "Your voice, your style. Brands respect your creative process.",
              iconBg: "var(--cr-peach)",
              iconColor: "var(--cr-peach-ink)",
            },
            {
              Mark: CommunityMark,
              num: "04",
              title: "A real community",
              body: "Workshops, peer groups, and direct access to a team in your corner.",
              iconBg: "var(--cr-yellow)",
              iconColor: "var(--cr-yellow-ink)",
            },
          ].map(({ Mark, num, title, body, iconBg, iconColor }) => (
            <div
              key={title}
              className="benefit-row group relative border-b border-(--color-border) overflow-hidden cursor-default"
              style={{ clipPath: "inset(0 0 0% 0)" }}
            >
              {/* Hover fill */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: iconBg }}
              />

              <div className="relative z-10 flex items-center gap-6 md:gap-10 px-6 md:px-10 py-9 md:py-11">
                {/* Number */}
                <span className="font-mono text-[10px] tracking-[0.32em] text-(--color-muted-fg) w-6 shrink-0">
                  {num}
                </span>

                {/* Custom mark */}
                <div
                  className="benefit-icon w-12 h-12 shrink-0 flex items-center justify-center transition-transform duration-400 group-hover:scale-110"
                  style={{
                    background: iconBg,
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <Mark color={iconColor} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline md:gap-12">
                  <h3 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] leading-none shrink-0">
                    {title}
                  </h3>
                  <p className="font-mono text-[12px] tracking-wide text-(--color-muted-fg) leading-relaxed mt-2 md:mt-0 max-w-sm transition-colors duration-400 group-hover:text-(--color-fg)">
                    {body}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="w-5 h-5 shrink-0 text-(--color-accent) opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quote — full inverted editorial ─────────────────────── */}
      <section
        className="relative overflow-hidden px-8 md:px-14 py-28 md:py-44"
        style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
      >
        {/* Accent glow */}
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
          <div className="cr-reveal flex items-center gap-3 mb-12">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.35em]"
              style={{
                color: "color-mix(in srgb, var(--color-bg) 50%, transparent)",
              }}
            >
              ✦ Talent story
            </span>
          </div>

          {/* Giant quote mark */}
          <div
            className="cr-reveal font-display leading-none mb-6 select-none"
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
            className="cr-reveal font-display leading-[1.05] mb-14"
            style={{
              fontSize: "clamp(1.75rem,4vw,3.5rem)",
              color: "var(--color-bg)",
            }}
          >
            The first platform that paid me on time, every time — and let me say
            no to a brand that didn&apos;t fit. That alone changed everything.
          </blockquote>

          <footer className="cr-reveal flex items-center gap-5">
            <div
              className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center font-display text-xl"
              style={{ opacity: 0.85 }}
            >
              <span style={{ color: "rgba(0,0,0,0.6)" }}>M</span>
            </div>
            <div>
              <div
                className="font-medium text-base"
                style={{ color: "var(--color-bg)" }}
              >
                Maya R.
              </div>
              <div
                className="font-mono text-[11px] tracking-[0.15em] mt-1"
                style={{
                  color: "color-mix(in srgb, var(--color-bg) 50%, transparent)",
                }}
              >
                @mayareads · 412K followers · Books &amp; culture
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* ── Final CTA — PricingPage-style dark sticker ──────────── */}
      <section
        className="relative py-24 px-6 md:px-12 dot-grid bracket-frame"
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
            fill="var(--accent3)"
            className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none"
          />

          <div
            className="cr-reveal sticker p-10 md:p-16 text-center flex flex-col items-center gap-8"
            data-tone="ink"
          >
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60 flex items-center gap-2">
              <span>✦</span>
              <span>ready when you are</span>
              <span>✦</span>
            </div>

            <h2 className="font-display italic text-[clamp(2.2rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]">
              Apply in 5 minutes.
              <br />
              Get paid in 48.
            </h2>

            <p className="font-script text-2xl md:text-3xl opacity-70">
              — we review every application within 48 hours
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/talents/apply" className="btn-primary">
                Apply as talent
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
                How payouts work
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
