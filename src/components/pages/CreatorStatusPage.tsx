"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Clock, LayoutDashboard, Star } from "lucide-react";
import { ease, dur, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  .cs-root {
    min-height: 100svh;
    background: var(--color-bg);
    color: var(--color-fg);
  }

  /* Power strip */
  .cs-strip {
    background: var(--color-fg);
    color: var(--color-bg);
  }
  .cs-strip-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid color-mix(in srgb, var(--color-bg) 12%, transparent);
  }
  @media (min-width: 768px) {
    .cs-strip-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .cs-strip-cell {
    padding: 2rem 1.5rem;
    border-right: 1px solid color-mix(in srgb, var(--color-bg) 12%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--color-bg) 12%, transparent);
  }
  .cs-strip-cell:last-child { border-right: none; }

  /* Timeline */
  .cs-timeline-dot {
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
  .cs-timeline-dot.done   { background: var(--color-accent); }
  .cs-timeline-dot.active {
    background: var(--color-fg);
    animation: cs-pulse 2s ease-in-out infinite;
  }
  .cs-timeline-dot.pending {
    background: transparent;
    border: 1.5px solid var(--color-border);
  }
  @keyframes cs-pulse {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-fg) 40%, transparent); }
    50%       { box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-fg) 0%, transparent); }
  }
  .cs-timeline-line {
    position: absolute;
    left: 13px;
    top: 30px;
    bottom: 0;
    width: 1px;
    background: var(--color-border);
  }

  /* Dashboard preview card */
  .cs-preview {
    border: 1px solid var(--color-border);
    border-radius: 16px;
    overflow: hidden;
    background: var(--color-panel);
  }
  .cs-preview-header {
    background: var(--color-fg);
    color: var(--color-bg);
    padding: 0.875rem 1.25rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .cs-preview-header-title {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-bg) 65%, transparent);
    line-height: 1.5;
  }
  .cs-preview-header-badge {
    flex-shrink: 0;
  }
  .cs-preview-row {
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .cs-preview-row:last-child { border-bottom: none; }
  .cs-preview-row-note {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--color-muted-fg);
    text-align: right;
    flex-shrink: 0;
    max-width: 100px;
    line-height: 1.5;
  }

  /* CTA button — creator accent */
  .cs-cta-creator {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--color-fg);
    color: var(--color-bg);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-radius: var(--radius-md);
    border: 2px solid var(--color-fg);
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.15s;
    font-weight: 600;
  }
  .cs-cta-creator:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #000;
    transform: translateY(-1px);
  }

  /* ── Dark mode overrides ──────────────────────────────────────── */
  [data-theme="dark"] .cs-strip {
    background: #1a1a1a;
    color: var(--color-fg);
  }
  [data-theme="dark"] .cs-strip-grid {
    border-top-color: color-mix(in srgb, var(--color-fg) 10%, transparent);
  }
  [data-theme="dark"] .cs-strip-cell {
    border-right-color: color-mix(in srgb, var(--color-fg) 10%, transparent);
    border-bottom-color: color-mix(in srgb, var(--color-fg) 10%, transparent);
  }
  [data-theme="dark"] .cs-preview-header {
    background: #1a1a1a;
    color: var(--color-fg);
  }
  [data-theme="dark"] .cs-preview-header-title {
    color: color-mix(in srgb, var(--color-fg) 50%, transparent);
  }
  [data-theme="dark"] .cs-cta-creator {
    background: var(--color-accent);
    color: #000;
    border-color: var(--color-accent);
  }
  [data-theme="dark"] .cs-cta-creator:hover {
    background: var(--color-fg);
    color: var(--color-bg);
    border-color: var(--color-fg);
  }
  [data-theme="dark"] .cs-timeline-dot.active {
    background: var(--color-accent);
  }
`;

/* ─── Data ───────────────────────────────────────────────────────── */

const TIMELINE = [
  { label: "Application received",  sub: "just now",              state: "done"    },
  { label: "Team review",           sub: "within 48 hours",       state: "active"  },
  { label: "Approval email sent",   sub: "to your inbox",         state: "pending" },
  { label: "First brief match",     sub: "within 5 days",         state: "pending" },
] as const;

const STRIP_STATS = [
  { value: "48h",   label: "Review time",         sub: "no ghost-reading" },
  { value: "0%",    label: "Commission cut",       sub: "ever, on anything" },
  { value: "$12M+", label: "Paid to creators",     sub: "and counting" },
  { value: "500+",  label: "Brand campaigns",      sub: "ready to match" },
];

const DASHBOARD_PREVIEW = [
  { label: "Earnings this month",   value: "$0.00",    note: "unlocks on approval" },
  { label: "Open campaign invites", value: "—",        note: "matches sent within 5 days" },
  { label: "Profile status",        value: "Pending",  note: "under review" },
  { label: "Response SLA",          value: "48 hours", note: "our commitment to you" },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function CreatorStatusPage() {
  const ref    = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useGSAP(() => {
    gsap.fromTo(
      ".cs-hero > *",
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: dur.slow, ease: ease.out, stagger: stagger.tight, delay: 0.1 },
    );

    gsap.fromTo(
      ".cs-strip-cell",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: dur.base, ease: ease.out, stagger: stagger.tight,
        scrollTrigger: { trigger: ".cs-strip", start: "top 85%" },
      },
    );

    gsap.fromTo(
      ".cs-timeline-step",
      { x: -24, opacity: 0 },
      {
        x: 0, opacity: 1, duration: dur.base, ease: ease.out, stagger: 0.1,
        scrollTrigger: { trigger: ".cs-timeline", start: "top 80%" },
      },
    );

    gsap.fromTo(
      ".cs-preview-row",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: dur.base, ease: ease.out, stagger: stagger.tight,
        scrollTrigger: { trigger: ".cs-preview", start: "top 82%" },
      },
    );
  }, { scope: ref });

  function goToDashboard() {
    localStorage.setItem("icons-session", JSON.stringify({ role: "creator" }));
    router.push("/dashboard?as=creator");
  }

  return (
    <div ref={ref} className="cs-root">
      <style>{PAGE_STYLES}</style>

      {/* ── Top bar ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-(--color-border)">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors">
          Icons
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Under review
        </span>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="cs-hero px-6 md:px-10 py-16 md:py-24 max-w-5xl mx-auto w-full flex flex-col gap-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-(--color-muted-fg) flex items-center gap-2">
          <Star className="w-3 h-3" />
          Creator application
        </p>
        <h1
          className="font-display italic leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
        >
          Application in.<br />
          <span style={{ color: "var(--color-muted-fg)" }}>You&apos;re one of us.</span>
        </h1>
        <p className="font-mono text-[12px] leading-[1.9] text-(--color-muted-fg) max-w-lg">
          Our team reviews every application manually — no bots, no auto-rejects.
          You&apos;ll hear back within 48 hours. In the meantime, preview what
          your creator dashboard looks like.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button onClick={goToDashboard} className="cs-cta-creator">
            <LayoutDashboard className="w-4 h-4" />
            Preview your dashboard
          </button>
          <Link href="/talents" className="btn-ghost">
            Browse creators
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Power strip ───────────────────────────────────────────── */}
      <div className="cs-strip">
        <div className="cs-strip-grid max-w-5xl mx-auto">
          {STRIP_STATS.map((s) => (
            <div key={s.value} className="cs-strip-cell">
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
      <div className="px-6 md:px-10 py-16 max-w-5xl mx-auto w-full grid md:grid-cols-[300px_1fr] gap-12 md:gap-16">

        {/* Timeline */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) mb-8 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            What happens next
          </p>
          <div className="cs-timeline flex flex-col">
            {TIMELINE.map((step, i) => (
              <div key={i} className="cs-timeline-step flex items-start gap-4 relative pb-7 last:pb-0">
                {i < TIMELINE.length - 1 && <div className="cs-timeline-line" />}
                <div className={`cs-timeline-dot ${step.state}`}>
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
                <div>
                  <p className="font-mono text-[11px] font-semibold tracking-wide"
                    style={{ color: step.state === "pending" ? "var(--color-muted-fg)" : "var(--color-fg)" }}>
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

          {/* Creator promise */}
          <div className="mt-10 p-4 rounded-xl" style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-(--color-muted-fg) mb-3">
              The icons promise to creators
            </p>
            {[
              "0% commission — you keep every dollar brands pay",
              "Payouts within 48h of content approval",
              "Creative direction, never creative control",
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-(--color-border) last:border-0">
                <Check className="w-3 h-3 shrink-0 mt-0.5 text-(--color-accent)" strokeWidth={2.5} />
                <span className="font-mono text-[10px] tracking-wide text-(--color-fg)">{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) mb-8 flex items-center gap-2">
            <LayoutDashboard className="w-3 h-3" />
            Your creator dashboard
          </p>

          <div className="cs-preview">
            <div className="cs-preview-header">
              <span className="cs-preview-header-title">
                icons / creator dashboard
              </span>
              <span className="cs-preview-header-badge font-mono text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ background: "color-mix(in srgb, #f59e0b 20%, transparent)", color: "#f59e0b", border: "1px solid color-mix(in srgb, #f59e0b 30%, transparent)" }}>
                pending
              </span>
            </div>

            {DASHBOARD_PREVIEW.map((row) => (
              <div key={row.label} className="cs-preview-row">
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-(--color-muted-fg) mb-0.5">{row.label}</p>
                  <p className="font-display italic text-lg leading-none text-(--color-fg)">{row.value}</p>
                </div>
                <span className="cs-preview-row-note">
                  {row.note}
                </span>
              </div>
            ))}

            <div className="p-4 border-t border-(--color-border)">
              <button onClick={goToDashboard}
                className="w-full cs-cta-creator justify-center">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Enter dashboard
              </button>
            </div>
          </div>

          <p className="font-mono text-[10px] text-(--color-muted-fg) mt-4 text-center">
            Full dashboard unlocks upon approval. Preview is read-only.
          </p>
        </div>
      </div>

      {/* ── Footer strip ──────────────────────────────────────────── */}
      <div className="border-t border-(--color-border) px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10px] text-(--color-muted-fg)">
          Questions? Email{" "}
          <a href="mailto:creators@icons.com" className="underline hover:text-(--color-fg) transition-colors">
            creators@icons.com
          </a>
        </p>
        <div className="flex items-center gap-4">
          <button onClick={goToDashboard}
            className="font-mono text-[10px] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors flex items-center gap-1 cursor-pointer">
            Dashboard <ArrowUpRight className="w-3 h-3" />
          </button>
          <Link href="/talents" className="font-mono text-[10px] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors flex items-center gap-1">
            Creator roster <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
