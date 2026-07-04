"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Clock, Users, Zap } from "lucide-react";
import { ease, dur, stagger } from "@/lib/motion";
import { usersApi } from "@api/users";
import { collaborationsApi, type Collaboration } from "@api/collaborations";
import type { BackendUser } from "@api/types";

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


/* ─── Component ──────────────────────────────────────────────────── */

export default function BriefStatusPage() {
  const ref    = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Real matches for the brand's latest campaign.
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [collabs, setCollabs] = useState<Collaboration[]>([]);
  const [creators, setCreators] = useState<BackendUser[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const loadCollabs = useCallback((id: string) => {
    collaborationsApi.forCampaign(id).then(setCollabs).catch(() => {});
  }, []);

  useEffect(() => {
    // ponytail: candidate pool = all users (minus already-invited); add a
    // ?role=creator filter once /users returns role.
    usersApi.list().then(setCreators).catch(() => {});
    fetch("/api/campaigns")
      .then((r) => (r.ok ? r.json() : []))
      .then((cs: { id: string }[]) => {
        const id = cs[0]?.id ?? null;
        setCampaignId(id);
        if (id) loadCollabs(id);
      })
      .catch(() => {});
  }, [loadCollabs]);

  const invitedIds = new Set(collabs.map((c) => c.creatorId));
  const candidates = creators.filter((u) => !invitedIds.has(u.id));

  async function invite(creatorId: string) {
    if (!campaignId) return;
    setBusy(creatorId);
    try {
      await collaborationsApi.invite(campaignId, creatorId);
      loadCollabs(campaignId);
    } catch {
      /* ignore */
    } finally {
      setBusy(null);
    }
  }

  function goToDashboard() {
    router.push("/dashboard");
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

          {collabs.length === 0 ? (
            <p className="font-mono text-[11px] text-(--color-muted-fg) mb-8">
              No creators invited yet — pick from the list below.
            </p>
          ) : (
            <div className="bs-creator-grid mb-10">
              {collabs.map((c) => {
                const name =
                  c.creator?.displayName || c.creator?.handle || "Creator";
                return (
                  <div key={c.id} className="bs-creator-card">
                    <div className="p-4 flex items-center gap-3">
                      {c.creator?.avatarUrl ? (
                        <img src={c.creator.avatarUrl} alt={name} className="bs-creator-avatar" />
                      ) : (
                        <div
                          className="bs-creator-avatar grid place-items-center font-mono text-sm"
                          style={{ background: "var(--color-panel)" }}
                        >
                          {name[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[12px] font-semibold truncate">{name}</p>
                        {c.creator?.handle && (
                          <p className="font-mono text-[10px] text-(--color-muted-fg) truncate">@{c.creator.handle}</p>
                        )}
                      </div>
                      <span className="bs-match-badge shrink-0 uppercase">{c.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Invite picker */}
          {campaignId && candidates.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) mb-4">
                Invite creators
              </p>
              <div className="flex flex-col gap-2 max-w-xl">
                {candidates.slice(0, 12).map((u) => {
                  const name = u.displayName || u.handle || u.email;
                  return (
                    <div
                      key={u.id}
                      className="flex items-center justify-between gap-3 border-2 border-(--color-border) rounded-xl px-4 py-2.5"
                    >
                      <span className="font-mono text-[12px] truncate">
                        {name}
                        {u.handle ? ` · @${u.handle}` : ""}
                      </span>
                      <button
                        type="button"
                        disabled={busy === u.id}
                        onClick={() => invite(u.id)}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors disabled:opacity-40 cursor-pointer shrink-0"
                      >
                        Invite
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
