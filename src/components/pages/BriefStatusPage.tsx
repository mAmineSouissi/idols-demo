"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Clock, Users, Zap } from "lucide-react";
import { ease, dur, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  .bs-root {
    min-height: 100svh;
    background: var(--color-bg);
    color: var(--color-fg);
  }

  /* Power strip */
  .bs-strip {
    background: var(--color-fg);
    color: var(--color-bg);
  }
  .bs-strip-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid color-mix(in srgb, var(--color-bg) 12%, transparent);
  }
  @media (min-width: 768px) {
    .bs-strip-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .bs-strip-cell {
    padding: 2rem 1.5rem;
    border-right: 1px solid color-mix(in srgb, var(--color-bg) 12%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--color-bg) 12%, transparent);
  }
  .bs-strip-cell:last-child { border-right: none; }

  /* Timeline */
  .bs-timeline-step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
  }
  .bs-timeline-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
    z-index: 10;
    position: relative;
  }
  .bs-timeline-dot.done {
    background: var(--color-accent);
  }
  .bs-timeline-dot.active {
    background: var(--color-fg);
    animation: bs-pulse 2s ease-in-out infinite;
  }
  .bs-timeline-dot.pending {
    background: transparent;
    border: 1.5px solid var(--color-border);
  }
  @keyframes bs-pulse {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-fg) 40%, transparent); }
    50%       { box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-fg) 0%, transparent); }
  }
  .bs-timeline-line {
    position: absolute;
    left: 13px;
    top: 30px;
    bottom: 0;
    width: 1px;
    background: var(--color-border);
  }

  /* Creator match cards — rich layout */
  .bs-creator-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (min-width: 640px)  { .bs-creator-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1280px) { .bs-creator-grid { grid-template-columns: repeat(3, 1fr); } }

  .bs-creator-card {
    background: var(--color-bg);
    border: 2px solid var(--color-fg);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 4px 4px 0 0 var(--color-fg);
    display: flex;
    flex-direction: column;
    transition: transform 0.15s, box-shadow 0.15s;
    text-decoration: none;
    color: inherit;
  }
  .bs-creator-card:hover { transform: translate(-1px, -1px); box-shadow: 5px 5px 0 0 var(--color-fg); }

  /* 3-photo strip */
  .bs-sample-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    height: 110px;
    flex-shrink: 0;
  }
  .bs-sample-strip img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bs-creator-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-fg);
    flex-shrink: 0;
  }
  .bs-match-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 100px;
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    color: var(--color-accent);
    border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  }
  .bs-stat-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 100px;
    border: 1px solid var(--color-border);
    color: var(--color-muted-fg);
  }

  /* ── Dark mode overrides ──────────────────────────────────────── */
  [data-theme="dark"] .bs-creator-grid {
    background: #2a2a2a;
  }
  [data-theme="dark"] .bs-creator-card {
    background: #141414;
  }
  [data-theme="dark"] .bs-creator-card:hover {
    background: #1e1e1e;
  }
  [data-theme="dark"] .bs-strip {
    background: #1a1a1a;
    color: var(--color-fg);
  }
  [data-theme="dark"] .bs-strip-grid {
    border-top-color: color-mix(in srgb, var(--color-fg) 10%, transparent);
  }
  [data-theme="dark"] .bs-strip-cell {
    border-right-color: color-mix(in srgb, var(--color-fg) 10%, transparent);
    border-bottom-color: color-mix(in srgb, var(--color-fg) 10%, transparent);
  }
  [data-theme="dark"] .bs-timeline-dot.active {
    background: var(--color-accent);
    animation: bs-pulse-dark 2s ease-in-out infinite;
  }
  @keyframes bs-pulse-dark {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent) 40%, transparent); }
    50%       { box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-accent) 0%, transparent); }
  }
`;

/* ─── Data ───────────────────────────────────────────────────────── */

const TIMELINE = [
  { label: "Brief received",          sub: "just now",       state: "done"    },
  { label: "Campaign manager review", sub: "within 2 hours", state: "active"  },
  { label: "Creator matches sent",    sub: "within 48 hours",state: "pending" },
  { label: "Content goes live",       sub: "avg. 4 days",    state: "pending" },
] as const;

const STRIP_STATS = [
  { value: "$12M+",  label: "Paid to creators",    sub: "zero agency cut" },
  { value: "10K+",   label: "Vetted creators",      sub: "across every niche" },
  { value: "48h",    label: "Campaign go-live",     sub: "from approved brief" },
  { value: "94",     label: "NPS score",            sub: "from brand partners" },
];

const MATCHED_CREATORS = [
  {
    handle: "mayareads",
    name: "Maya R.",
    title: "Books & Culture",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    match: "98",
    followers: "412K",
    platform: "TikTok",
    engagement: "6.4%",
    why: "Highly engaged literary audience — ideal overlap with your readership demographics.",
    samples: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=400&fit=crop&q=70",
    ],
  },
  {
    handle: "priyaedits",
    name: "Priya N.",
    title: "Beauty & Wellness",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80",
    match: "96",
    followers: "890K",
    platform: "Instagram",
    engagement: "7.8%",
    why: "Beauty-first audience, 91% female, 18–28 — your highest-converting age bracket.",
    samples: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=300&h=400&fit=crop&q=70",
    ],
  },
  {
    handle: "theofitness",
    name: "Theo W.",
    title: "Fitness Coaching",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    match: "94",
    followers: "1.2M",
    platform: "YouTube",
    engagement: "5.2%",
    why: "Long-form reviews drive purchase intent. Gymshark collab hit 1.6M views.",
    samples: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=400&fit=crop&q=70",
    ],
  },
  {
    handle: "niamakes",
    name: "Nia O.",
    title: "Craft & DIY",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    match: "91",
    followers: "620K",
    platform: "TikTok",
    engagement: "9.1%",
    why: "Highest engagement rate in your matched pool — DIY tutorials convert 3× industry avg.",
    samples: [
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=400&fit=crop&q=70",
    ],
  },
  {
    handle: "kaiwalks",
    name: "Kai L.",
    title: "Travel & Food",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    match: "89",
    followers: "380K",
    platform: "Instagram",
    engagement: "4.9%",
    why: "Travel & lifestyle crossover — strong food content that mirrors your brand aesthetic.",
    samples: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=300&h=400&fit=crop&q=70",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=300&h=400&fit=crop&q=70",
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function BriefStatusPage() {
  const ref    = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function goToDashboard() {
    localStorage.setItem("icons-session", JSON.stringify({ role: "brand" }));
    router.push("/dashboard?as=brand");
  }

  useGSAP(() => {
    // Hero entrance
    gsap.fromTo(
      ".bs-hero > *",
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: dur.slow, ease: ease.out, stagger: stagger.tight, delay: 0.1 },
    );

    // Power strip cells
    gsap.fromTo(
      ".bs-strip-cell",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: dur.base, ease: ease.out, stagger: stagger.tight,
        scrollTrigger: { trigger: ".bs-strip", start: "top 95%", once: true },
      },
    );

    // Timeline steps
    gsap.fromTo(
      ".bs-timeline-step",
      { x: -24, opacity: 0 },
      {
        x: 0, opacity: 1, duration: dur.base, ease: ease.out, stagger: 0.1,
        scrollTrigger: { trigger: ".bs-timeline", start: "top 95%", once: true },
      },
    );

    // Creator cards
    gsap.fromTo(
      ".bs-creator-card",
      { y: 32, opacity: 0, scale: 0.96 },
      {
        y: 0, opacity: 1, scale: 1, duration: dur.slow, ease: ease.out, stagger: stagger.tight,
        scrollTrigger: { trigger: ".bs-creator-grid", start: "top 95%", once: true },
      },
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="bs-root">
      <style>{PAGE_STYLES}</style>

      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-(--color-border)"
        style={{ background: "var(--color-bg)" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors group"
        >
          Icons
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Brief live
        </span>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="bs-hero px-6 md:px-10 py-16 md:py-24 max-w-5xl mx-auto w-full flex flex-col gap-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-(--color-muted-fg) flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Campaign status
        </p>
        <h1
          className="font-display italic leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
        >
          Brief received.<br />
          <span style={{ color: "var(--color-muted-fg)" }}>We&apos;re on it.</span>
        </h1>
        <p className="font-mono text-[12px] leading-[1.9] text-(--color-muted-fg) max-w-lg">
          Your brief is live and being reviewed by our team. Creator matches will
          land in your inbox within 48 hours — no agency, no middleman, no markup.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button onClick={goToDashboard} className="btn-primary">
            View dashboard
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <Link href="/brief-builder" className="btn-ghost">
            Start another campaign
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Power strip ───────────────────────────────────────────── */}
      <div className="bs-strip">
        <div className="bs-strip-grid max-w-5xl mx-auto">
          {STRIP_STATS.map((s) => (
            <div key={s.value} className="bs-strip-cell">
              <p
                className="font-display italic leading-none"
                style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--color-bg)" }}
              >
                {s.value}
              </p>
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase mt-1"
                style={{ color: "color-mix(in srgb, var(--color-bg) 80%, transparent)" }}>
                {s.label}
              </p>
              <p className="font-mono text-[10px] mt-0.5"
                style={{ color: "color-mix(in srgb, var(--color-bg) 45%, transparent)" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="px-6 md:px-10 py-16 max-w-5xl mx-auto w-full grid md:grid-cols-[320px_1fr] gap-12 md:gap-16">

        {/* Timeline */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) mb-8 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            What happens next
          </p>
          <div className="bs-timeline flex flex-col">
            {TIMELINE.map((step, i) => (
              <div key={i} className="bs-timeline-step pb-7 last:pb-0">
                {/* Connector */}
                {i < TIMELINE.length - 1 && <div className="bs-timeline-line" />}
                {/* Dot */}
                <div className={`bs-timeline-dot ${step.state}`}>
                  {step.state === "done" && (
                    <Check className="w-3.5 h-3.5" style={{ color: "#000" }} strokeWidth={3} />
                  )}
                  {step.state === "active" && (
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-bg)" }} />
                  )}
                  {step.state === "pending" && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-border)" }} />
                  )}
                </div>
                {/* Text */}
                <div>
                  <p
                    className="font-mono text-[11px] font-semibold tracking-wide"
                    style={{
                      color: step.state === "pending"
                        ? "var(--color-muted-fg)"
                        : "var(--color-fg)",
                    }}
                  >
                    {step.label}
                  </p>
                  <p className="font-mono text-[10px] mt-0.5 text-(--color-muted-fg)">
                    {step.sub}
                  </p>
                  {step.state === "active" && (
                    <span className="inline-flex items-center gap-1 mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
                      style={{ background: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent)", border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)" }}>
                      in progress
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Promise block */}
          <div className="mt-10 p-4 rounded-xl" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-(--color-muted-fg) mb-3 flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              The icons promise
            </p>
            {[
              "Creators are paid within 48h of content approval",
              "Your brand is never charged agency markup",
              "Every creator is manually vetted by our team",
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-(--color-border) last:border-0">
                <Check className="w-3 h-3 shrink-0 mt-0.5 text-(--color-accent)" strokeWidth={2.5} />
                <span className="font-mono text-[10px] tracking-wide text-(--color-fg)">{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Creator matches */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) mb-8 flex items-center gap-2">
            <Users className="w-3 h-3" />
            Your creator matches
          </p>

          <div className="bs-creator-grid">
            {MATCHED_CREATORS.map((c) => (
              <Link key={c.handle} href={`/talents/${c.handle}`} className="bs-creator-card group">
                {/* Sample content strip */}
                <div className="bs-sample-strip">
                  {c.samples.map((src, i) => (
                    <img key={i} src={src} alt="" loading="lazy" />
                  ))}
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  {/* Avatar row */}
                  <div className="flex items-center gap-2.5">
                    <img src={c.photo} alt={c.name} className="bs-creator-avatar" />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[12px] font-semibold leading-tight truncate">{c.name}</p>
                      <p className="font-mono text-[10px] text-(--color-muted-fg) truncate">{c.title}</p>
                    </div>
                    <span className="bs-match-badge shrink-0">{c.match}%</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bs-stat-pill">{c.followers} {c.platform}</span>
                    <span className="bs-stat-pill">{c.engagement} eng.</span>
                  </div>

                  {/* Why matched */}
                  <p className="font-mono text-[10px] leading-relaxed text-(--color-muted-fg) flex-1">
                    {c.why}
                  </p>

                  {/* View CTA */}
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] flex items-center gap-1 transition-colors"
                    style={{ color: "var(--color-accent)" }}>
                    View profile <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="font-mono text-[10px] text-(--color-muted-fg) mt-6 text-center">
            Final matches confirmed by your campaign manager within 48 hours.
          </p>
        </div>
      </div>

      {/* ── Footer strip ──────────────────────────────────────────── */}
      <div className="border-t border-(--color-border) px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10px] text-(--color-muted-fg)">
          Questions? Email <a href="mailto:hello@icons.com" className="underline hover:text-(--color-fg) transition-colors">hello@icons.com</a>
        </p>
        <div className="flex items-center gap-4">
          <button onClick={goToDashboard} className="font-mono text-[10px] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors flex items-center gap-1 cursor-pointer">
            Dashboard <ArrowUpRight className="w-3 h-3" />
          </button>
          <Link href="/talents" className="font-mono text-[10px] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors flex items-center gap-1">
            Browse creators <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
