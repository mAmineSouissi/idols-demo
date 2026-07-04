"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/router";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease, dur } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

/* ─── Types ──────────────────────────────────────────────────────── */

type Application = {
  name: string;
  email: string;
  primaryPlatform: string;
  handle: string;
  otherHandles: string;
  niche: string;
  category: string;
  followers: string;
  engagement: string;
  avgViews: string;
  formats: string[];
  tone: string[];
  sampleLinks: string;
  why: string;
};

const INITIAL: Application = {
  name: "",
  email: "",
  primaryPlatform: "",
  handle: "",
  otherHandles: "",
  niche: "",
  category: "",
  followers: "",
  engagement: "",
  avgViews: "",
  formats: [],
  tone: [],
  sampleLinks: "",
  why: "",
};

/* ─── Step config ────────────────────────────────────────────────── */

const STEPS = [
  {
    num: "01",
    label: "You",
    badge: "Step 1 of 4",
    title: "Who are\nyou online?",
    desc: "Your name, email, and the handles we'll actually look at.",
  },
  {
    num: "02",
    label: "Audience",
    badge: "Step 2 of 4",
    title: "Your\naudience.",
    desc: "Follower count, engagement, and the niche you've built trust in.",
  },
  {
    num: "03",
    label: "Content",
    badge: "Step 3 of 4",
    title: "What do\nyou make?",
    desc: "Formats, tone, and a link to your best recent work.",
  },
  {
    num: "04",
    label: "Review",
    badge: "Final step",
    title: "Your\napplication.",
    desc: "Everything in one place. Hit submit — we review within 48 hours.",
  },
];

/* ─── Earnings calculator data ──────────────────────────────────── */

const TIERS = [
  { id: "nano", label: "Nano", sub: "Under 10K", low: 75, high: 200 },
  { id: "micro", label: "Micro", sub: "10K – 50K", low: 200, high: 600 },
  { id: "mid", label: "Mid", sub: "50K – 200K", low: 600, high: 1500 },
  { id: "macro", label: "Macro", sub: "200K – 1M", low: 1500, high: 5000 },
  { id: "mega", label: "Mega", sub: "1M+", low: 5000, high: 15000 },
] as const;

type TierId = (typeof TIERS)[number]["id"];

const ENGAGEMENTS = [
  { id: "high", label: "High", sub: "> 6%", mult: 1.4 },
  { id: "avg", label: "Average", sub: "3–6%", mult: 1.0 },
  { id: "low", label: "Lower", sub: "< 3%", mult: 0.75 },
] as const;

type EngId = (typeof ENGAGEMENTS)[number]["id"];

function fmt(n: number): string {
  return n >= 1000
    ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`
    : `$${n}`;
}

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  .ca-layout {
    display: grid;
    grid-template-columns: 1fr;
    min-height: calc(100vh - 64px);
  }
  @media (min-width: 1024px) {
    .ca-layout { grid-template-columns: 360px 1fr; }
  }

  /* Sidebar */
  .ca-sidebar {
    background: var(--color-fg);
    color: var(--color-bg);
    padding: 3.5rem 2.75rem;
    position: sticky; top: 64px;
    height: calc(100vh - 64px);
    display: flex; flex-direction: column; justify-content: space-between;
    overflow: hidden;
    border-right: 2px solid var(--color-fg);
  }
  @media (max-width: 1023px) { .ca-sidebar { display: none; } }

  /* Main area */
  .ca-main {
    padding: 3.5rem 2.5rem 6rem;
    background-image: radial-gradient(circle, color-mix(in srgb, var(--color-fg) 8%, transparent) 1px, transparent 1px);
    background-size: 22px 22px;
  }
  @media (min-width: 768px) { .ca-main { padding: 4.5rem 5rem 8rem; } }

  /* Progress bar */
  .ca-progress { display: flex; border-bottom: 2px solid var(--color-fg); }
  .ca-prog-step {
    flex: 1; padding: 0.9rem 0.75rem 0.75rem;
    border-top: 3px solid transparent;
    transition: border-color 0.3s, background 0.3s;
    cursor: default;
  }
  .ca-prog-step.done   { border-top-color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 8%, transparent); }
  .ca-prog-step.active { border-top-color: var(--color-fg); }

  /* Option grid layouts */
  .ca-opt-2 { display: grid; grid-template-columns: 1fr; gap: 0.6rem; }
  @media (min-width: 640px) { .ca-opt-2 { grid-template-columns: repeat(2, 1fr); } }
  .ca-opt-3 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  @media (min-width: 768px) { .ca-opt-3 { grid-template-columns: repeat(3, 1fr); } }
  .ca-opt-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  @media (min-width: 768px) { .ca-opt-4 { grid-template-columns: repeat(4, 1fr); } }
  .ca-opt-inline { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  /* Option button */
  .ca-opt {
    position: relative; padding: 1.1rem 1.4rem;
    background: var(--color-bg); text-align: left; cursor: pointer;
    border: 2px solid var(--color-fg); width: 100%;
    border-radius: var(--radius-md);
    transition: box-shadow 0.18s ease, transform 0.18s ease;
    box-shadow: 3px 3px 0 0 var(--color-fg);
  }
  .ca-opt:hover {
    box-shadow: 5px 5px 0 0 var(--color-fg);
    transform: translate(-1px, -1px);
    background: var(--color-panel);
  }
  .ca-opt.sel {
    background: var(--color-fg);
    color: var(--color-bg);
    box-shadow: 4px 4px 0 0 var(--color-accent);
    transform: translate(-1px, -1px);
  }
  .ca-opt.sel .ca-opt-sub { color: color-mix(in srgb, var(--color-bg) 55%, transparent); }

  /* Tag pill */
  .ca-tag {
    padding: 0.5rem 1.1rem;
    border: 2px solid var(--color-fg);
    border-radius: 999px;
    background: var(--color-bg); cursor: pointer;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    transition: all 0.18s; white-space: nowrap;
    box-shadow: 2px 2px 0 0 var(--color-fg);
  }
  .ca-tag:hover { box-shadow: 3px 3px 0 0 var(--color-fg); transform: translate(-0.5px,-0.5px); }
  .ca-tag.sel {
    background: var(--color-accent);
    color: #0a0a0a;
    border-color: var(--color-accent);
    box-shadow: 3px 3px 0 0 var(--color-fg);
  }

  /* Text input */
  .ca-input {
    width: 100%; background: transparent; border: none;
    border-bottom: 2px solid var(--color-border);
    padding: 0.75rem 0; font-size: 1.125rem; color: var(--color-fg);
    outline: none; transition: border-color 0.2s;
    font-family: inherit;
  }
  .ca-input:focus { border-bottom-color: var(--color-fg); }
  .ca-input::placeholder { color: color-mix(in srgb, var(--color-muted-fg) 60%, transparent); }

  .ca-textarea {
    width: 100%; background: var(--color-bg);
    border: 2px solid var(--color-fg);
    border-radius: var(--radius-md);
    padding: 1rem 1.25rem; color: var(--color-fg);
    outline: none; resize: none; transition: box-shadow 0.2s;
    font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.03em; line-height: 1.7;
    min-height: 100px;
    box-shadow: 3px 3px 0 0 var(--color-fg);
  }
  .ca-textarea:focus { box-shadow: 4px 4px 0 0 var(--color-accent); }
  .ca-textarea::placeholder { color: color-mix(in srgb, var(--color-muted-fg) 60%, transparent); }

  /* Review grid */
  .ca-review-grid {
    display: grid; grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  @media (min-width: 640px) { .ca-review-grid { grid-template-columns: repeat(2, 1fr); } }
  .ca-review-cell {
    padding: 1.4rem 1.6rem;
    background: var(--color-bg);
    border: 2px solid var(--color-fg);
    border-radius: var(--radius-md);
    box-shadow: 3px 3px 0 0 var(--color-fg);
  }

  /* Nav */
  .ca-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 3rem; margin-top: 3rem;
    border-top: 2px solid var(--color-fg);
  }

  /* ── Earnings calculator ── */
  .ca-calc {
    border-bottom: 2px solid var(--color-fg);
    padding: 3.5rem 1.5rem;
    background: var(--color-bg);
  }
  @media (min-width: 768px) { .ca-calc { padding: 4rem 2.5rem; } }

  .ca-calc-inner {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .ca-tier-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  @media (min-width: 640px) { .ca-tier-grid { grid-template-columns: repeat(5, 1fr); } }

  .ca-tier-btn {
    padding: 0.75rem 0.5rem;
    border: 2px solid var(--color-border);
    border-radius: 12px;
    background: var(--color-bg);
    cursor: pointer;
    text-align: center;
    transition: all 0.15s;
  }
  .ca-tier-btn:hover { border-color: var(--color-fg); }
  .ca-tier-btn.sel {
    border-color: var(--color-fg);
    background: var(--color-fg);
    color: var(--color-bg);
    box-shadow: 3px 3px 0 0 var(--color-accent);
  }

  .ca-eng-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .ca-eng-btn {
    flex: 1 1 80px;
    padding: 0.6rem 1rem;
    border: 2px solid var(--color-border);
    border-radius: 999px;
    background: var(--color-bg);
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .ca-eng-btn:hover { border-color: var(--color-fg); }
  .ca-eng-btn.sel {
    border-color: var(--color-accent);
    background: var(--color-accent);
    color: #0a0a0a;
    box-shadow: 2px 2px 0 0 var(--color-fg);
  }

  .ca-result {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    border: 2px solid var(--color-fg);
    border-radius: 16px;
    background: var(--color-panel);
    box-shadow: 5px 5px 0 0 var(--color-fg);
  }
`;

/* ─── Small reusables ────────────────────────────────────────────── */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) mb-3">
      {children}
    </p>
  );
}

function OptButton({
  label,
  sub,
  selected,
  onToggle,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`ca-opt ${selected ? "sel" : ""}`}
    >
      {selected && (
        <span
          className="absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center rounded-full"
          style={{ background: "var(--color-accent)" }}
        >
          <Check
            className="w-3 h-3"
            style={{ color: "#000" }}
            strokeWidth={3}
          />
        </span>
      )}
      <span className="font-display italic block text-lg leading-tight">
        {label}
      </span>
      {sub && (
        <span className="ca-opt-sub font-mono text-[10px] tracking-[0.12em] block mt-1 text-(--color-muted-fg)">
          {sub}
        </span>
      )}
    </button>
  );
}

function TagButton({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`ca-tag ${selected ? "sel" : ""}`}
    >
      {selected && <span className="mr-1.5">✦</span>}
      {label}
    </button>
  );
}

/* ─── Stat badge ─────────────────────────────────────────────────── */

const STAT_BADGES = [
  { value: "48h", label: "Application review" },
  { value: "0%", label: "Commission on join" },
  { value: "10K+", label: "Creators already in" },
];

/* ─── Page ───────────────────────────────────────────────────────── */

export const CreatorApplyPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [form, setForm] = useState<Application>(INITIAL);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Earnings calculator state
  const [calcTier, setCalcTier] = useState<TierId>("micro");
  const [calcEng, setCalcEng] = useState<EngId>("avg");

  const tier = TIERS.find((t) => t.id === calcTier)!;
  const eng = ENGAGEMENTS.find((e) => e.id === calcEng)!;
  const earnLow = Math.round((tier.low * eng.mult) / 25) * 25;
  const earnHigh = Math.round((tier.high * eng.mult) / 25) * 25;

  const toggle = (field: keyof Application, val: string) => {
    setForm((f) => {
      const arr = f[field] as string[];
      return {
        ...f,
        [field]: arr.includes(val)
          ? arr.filter((x) => x !== val)
          : [...arr, val],
      };
    });
  };

  // Animate step in on change
  useEffect(() => {
    if (!stepRef.current) return;
    gsap.fromTo(
      stepRef.current,
      { x: dir * 48, opacity: 0 },
      { x: 0, opacity: 1, duration: dur.base, ease: ease.out },
    );
  }, [step]);

  // Entrance
  useGSAP(
    () => {
      gsap.fromTo(
        ".ca-entrance",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: dur.slow,
          ease: ease.out,
          stagger: 0.08,
          delay: 0.1,
        },
      );
    },
    { scope: ref },
  );

  const validate = (): boolean => {
    const checks: Record<number, () => boolean> = {
      0: () =>
        form.name.trim().length > 0 &&
        form.email.trim().length > 0 &&
        form.primaryPlatform.length > 0 &&
        form.handle.trim().length > 0,
      1: () =>
        form.niche.trim().length > 0 &&
        form.followers.length > 0 &&
        form.category.length > 0,
      2: () => form.formats.length > 0,
    };
    return checks[step]?.() ?? true;
  };

  const goNext = () => {
    if (!validate()) {
      setError("Please fill in the required fields to continue.");
      gsap.fromTo(
        ".ca-error",
        { x: -8 },
        { x: 0, duration: 0.4, ease: "elastic.out(4,0.3)" },
      );
      return;
    }
    setError("");
    setDir(1);
    gsap.to(stepRef.current, {
      x: -48,
      opacity: 0,
      duration: dur.fast,
      ease: ease.out,
      onComplete: () => setStep((s) => s + 1),
    });
  };

  const goPrev = () => {
    setError("");
    setDir(-1);
    gsap.to(stepRef.current, {
      x: 48,
      opacity: 0,
      duration: dur.fast,
      ease: ease.out,
      onComplete: () => setStep((s) => s - 1),
    });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/talent-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          errors?: { message?: string }[];
        };
        setError(
          data?.errors?.[0]?.message ??
            "Something went wrong. Please try again.",
        );
        setSubmitting(false);
        return;
      }
      localStorage.setItem(
        "icons-session",
        JSON.stringify({ role: "creator", email: form.email }),
      );
      router.push("/talents/status");
    } catch {
      setError("Network error — please retry.");
      setSubmitting(false);
    }
  };

  const current = STEPS[step];

  return (
    <div
      ref={ref}
      className="min-h-screen bg-(--color-bg) text-(--color-fg) bracket-frame"
    >
      <style>{PAGE_STYLES}</style>

      {/* ── Earnings calculator ──────────────────────────────────── */}
      <div className="ca-calc">
        <div className="ca-calc-inner">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-(--color-muted-fg) flex items-center gap-2">
              <Sparkle size={12} fill="var(--color-accent)" /> Creator earnings
              calculator
            </p>
            <h2
              className="font-display italic leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              See what you could earn.
            </h2>
            <p className="font-mono text-[12px] leading-[1.8] text-(--color-muted-fg) max-w-md mt-1">
              Icons creators set their own rates. These estimates are based on
              real payouts from the past 90 days.
            </p>
          </div>

          {/* Tier selector */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-(--color-muted-fg)">
              Your follower count
            </p>
            <div
              className="ca-tier-grid"
              role="group"
              aria-label="Select your follower tier"
            >
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={calcTier === t.id}
                  onClick={() => setCalcTier(t.id)}
                  className={`ca-tier-btn ${calcTier === t.id ? "sel" : ""}`}
                >
                  <p
                    className="font-display italic text-xl leading-none mb-1"
                    style={{
                      color:
                        calcTier === t.id
                          ? "var(--color-bg)"
                          : "var(--color-fg)",
                    }}
                  >
                    {t.label}
                  </p>
                  <p
                    className="font-mono text-[9px] tracking-[0.1em] uppercase"
                    style={{
                      color:
                        calcTier === t.id
                          ? "color-mix(in srgb, var(--color-bg) 60%, transparent)"
                          : "var(--color-muted-fg)",
                    }}
                  >
                    {t.sub}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Engagement selector */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-(--color-muted-fg)">
              Average engagement rate
            </p>
            <div
              className="ca-eng-row"
              role="group"
              aria-label="Select your engagement rate"
            >
              {ENGAGEMENTS.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  aria-pressed={calcEng === e.id}
                  onClick={() => setCalcEng(e.id)}
                  className={`ca-eng-btn ${calcEng === e.id ? "sel" : ""}`}
                >
                  {e.label} <span style={{ opacity: 0.55 }}>({e.sub})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="ca-result">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-(--color-muted-fg)">
              Estimated earnings per campaign
            </p>
            <p
              className="font-display italic leading-none"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                color: "var(--color-accent)",
              }}
            >
              {fmt(earnLow)}
              <span
                className="text-(--color-muted-fg)"
                style={{ fontSize: "0.55em" }}
              >
                {" "}
                –{" "}
              </span>
              {fmt(earnHigh)}
            </p>
            <p className="font-mono text-[11px] text-(--color-muted-fg) leading-relaxed">
              {tier.label}-tier creators ({tier.sub} followers) with{" "}
              {eng.label.toLowerCase()} engagement ({eng.sub}) typically earn in
              this range. 0% commission — you keep everything.
            </p>
            <a
              href="#apply-form"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] mt-1 text-(--color-fg) hover:text-(--color-accent) transition-colors"
            >
              Apply in 60 seconds <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────── */}
      <div id="apply-form" className="ca-progress ca-entrance">
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            className={`ca-prog-step ${i < step ? "done" : i === step ? "active" : ""}`}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-[0.22em] block mb-0.5"
              style={{
                color: i <= step ? "var(--color-fg)" : "var(--color-muted-fg)",
              }}
            >
              {s.num}
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.1em] hidden md:block"
              style={{
                color:
                  i === step
                    ? "var(--color-fg)"
                    : i < step
                      ? "var(--color-accent)"
                      : "var(--color-muted-fg)",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="ca-layout">
        {/* ── Sidebar ───────────────────────────────────────────── */}
        <aside className="ca-sidebar">
          {/* Watermark */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-end justify-end overflow-hidden pointer-events-none select-none"
          >
            <span
              className="font-display italic leading-none"
              style={{
                fontSize: "clamp(10rem,18vw,16rem)",
                color: "var(--color-bg)",
                opacity: 0.05,
                transform: "translate(15%, 8%)",
                lineHeight: 1,
              }}
            >
              {current.num}
            </span>
          </div>
          <Sparkle
            size={44}
            fill="var(--color-accent)"
            stroke="var(--color-accent)"
            strokeWidth={0}
            className="absolute top-8 right-8 opacity-60 pointer-events-none"
          />

          <div className="relative z-10">
            <div className="mb-8 ca-entrance flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{
                  color: "color-mix(in srgb, var(--color-bg) 55%, transparent)",
                }}
              >
                Creator Application
              </span>
            </div>

            <div
              className="font-display italic leading-none mb-4 ca-entrance select-none"
              style={{
                fontSize: "clamp(4rem,7vw,6rem)",
                color: "var(--color-accent)",
                lineHeight: 0.9,
              }}
            >
              {current.num}
            </div>

            <h2
              className="font-display italic 
              leading-[1.0] mb-4 ca-entrance"
              style={{
                fontSize: "clamp(1.75rem,2.5vw,2.5rem)",
                color: "var(--color-bg)",
                whiteSpace: "pre-line",
              }}
            >
              {current.title}
            </h2>

            <p
              className="font-script text-lg ca-entrance"
              style={{
                color: "color-mix(in srgb, var(--color-bg) 60%, transparent)",
              }}
            >
              — {current.desc}
            </p>
          </div>

          {/* Stat badges */}
          <div
            className="relative z-10 pt-6 space-y-4"
            style={{
              borderTop:
                "1px solid color-mix(in srgb, var(--color-bg) 15%, transparent)",
            }}
          >
            {STAT_BADGES.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <span
                  className="font-display italic text-2xl leading-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  {s.value}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-bg) 45%, transparent)",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Main form ─────────────────────────────────────────── */}
        <div className="ca-main relative">
          <Sparkle
            size={40}
            fill="var(--accent2)"
            className="absolute top-8 right-8 opacity-40 pointer-events-none hidden md:block"
          />
          <Sparkle
            size={28}
            fill="var(--accent4)"
            className="absolute bottom-24 right-20 opacity-35 pointer-events-none hidden lg:block"
          />

          <div ref={stepRef}>
            {/* ── STEP 0: Identity ───────────────────────────────── */}
            {step === 0 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase -rotate-1"
                    style={{
                      borderColor: "var(--color-fg)",
                      background: "var(--color-accent)",
                      color: "rgba(0,0,0,0.85)",
                      boxShadow: "3px 3px 0 0 var(--color-fg)",
                    }}
                  >
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 md:hidden">
                  Who are you online?
                </h2>

                <div className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <FieldLabel>Full name *</FieldLabel>
                      <input
                        className="ca-input"
                        placeholder="e.g. Maya Rodriguez"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <FieldLabel>Email *</FieldLabel>
                      <input
                        className="ca-input"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Primary platform *</FieldLabel>
                    <div className="ca-opt-3">
                      {[
                        { val: "TikTok", sub: "Short-form video" },
                        { val: "Instagram", sub: "Reels + Feed" },
                        { val: "YouTube", sub: "Long + Shorts" },
                        { val: "Pinterest", sub: "Visual content" },
                        { val: "X / Twitter", sub: "Text + media" },
                        { val: "LinkedIn", sub: "Professional" },
                      ].map(({ val, sub }) => (
                        <OptButton
                          key={val}
                          label={val}
                          sub={sub}
                          selected={form.primaryPlatform === val}
                          onToggle={() =>
                            setForm((f) => ({
                              ...f,
                              primaryPlatform:
                                f.primaryPlatform === val ? "" : val,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Your main handle *</FieldLabel>
                    <input
                      className="ca-input"
                      placeholder="@yourhandle"
                      value={form.handle}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, handle: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <FieldLabel>
                      Other handles{" "}
                      <span className="opacity-50">(optional)</span>
                    </FieldLabel>
                    <input
                      className="ca-input"
                      placeholder="e.g. @handle on IG, @handle on YouTube"
                      value={form.otherHandles}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, otherHandles: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 1: Audience ───────────────────────────────── */}
            {step === 1 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase rotate-1"
                    style={{
                      borderColor: "var(--color-fg)",
                      background: "var(--color-accent)",
                      color: "rgba(0,0,0,0.85)",
                      boxShadow: "3px 3px 0 0 var(--color-fg)",
                    }}
                  >
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 md:hidden">
                  Your audience.
                </h2>

                <div className="space-y-10">
                  <div>
                    <FieldLabel>Content category *</FieldLabel>
                    <div className="ca-opt-4">
                      {[
                        "Lifestyle",
                        "Beauty",
                        "Fashion",
                        "Fitness",
                        "Food",
                        "Travel",
                        "Tech",
                        "Gaming",
                        "Finance",
                        "Education",
                        "Comedy",
                        "Music",
                      ].map((c) => (
                        <OptButton
                          key={c}
                          label={c}
                          selected={form.category === c}
                          onToggle={() =>
                            setForm((f) => ({
                              ...f,
                              category: f.category === c ? "" : c,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Your niche *</FieldLabel>
                    <input
                      className="ca-input"
                      placeholder="e.g. Sustainable fashion for Gen Z"
                      value={form.niche}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, niche: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <FieldLabel>Follower count *</FieldLabel>
                    <div className="ca-opt-4">
                      {[
                        { val: "Under 10K", sub: "Nano" },
                        { val: "10K – 100K", sub: "Micro" },
                        { val: "100K – 500K", sub: "Mid-tier" },
                        { val: "500K – 2M", sub: "Macro" },
                        { val: "2M+", sub: "Mega" },
                      ].map(({ val, sub }) => (
                        <OptButton
                          key={val}
                          label={val}
                          sub={sub}
                          selected={form.followers === val}
                          onToggle={() =>
                            setForm((f) => ({
                              ...f,
                              followers: f.followers === val ? "" : val,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Avg. engagement rate</FieldLabel>
                    <div className="ca-opt-3">
                      {[
                        "Under 2%",
                        "2% – 5%",
                        "5% – 10%",
                        "10% – 20%",
                        "20%+",
                        "Not sure",
                      ].map((e) => (
                        <OptButton
                          key={e}
                          label={e}
                          selected={form.engagement === e}
                          onToggle={() =>
                            setForm((f) => ({
                              ...f,
                              engagement: f.engagement === e ? "" : e,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Content ────────────────────────────────── */}
            {step === 2 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase -rotate-1"
                    style={{
                      borderColor: "var(--color-fg)",
                      background: "var(--color-accent)",
                      color: "rgba(0,0,0,0.85)",
                      boxShadow: "3px 3px 0 0 var(--color-fg)",
                    }}
                  >
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 md:hidden">
                  What do you make?
                </h2>

                <div className="space-y-10">
                  <div>
                    <FieldLabel>
                      Content formats ✦{" "}
                      <span
                        className="opacity-50 normal-case tracking-normal"
                        style={{ fontFamily: "inherit", fontSize: "10px" }}
                      >
                        pick all that fit
                      </span>
                    </FieldLabel>
                    <div className="ca-opt-inline">
                      {[
                        "Short video (≤60s)",
                        "Long video (60s+)",
                        "Reels",
                        "Stories",
                        "Photo set",
                        "Podcast / Audio",
                        "Live stream",
                        "Newsletter",
                      ].map((f) => (
                        <TagButton
                          key={f}
                          label={f}
                          selected={form.formats.includes(f)}
                          onToggle={() => toggle("formats", f)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>
                      Vibe / tone ✦{" "}
                      <span
                        className="opacity-50 normal-case tracking-normal"
                        style={{ fontFamily: "inherit", fontSize: "10px" }}
                      >
                        pick all that fit
                      </span>
                    </FieldLabel>
                    <div className="ca-opt-inline">
                      {[
                        "Authentic / Raw",
                        "Educational",
                        "Entertaining",
                        "Inspirational",
                        "Humorous",
                        "Polished",
                        "Storytelling",
                        "Tutorial",
                      ].map((t) => (
                        <TagButton
                          key={t}
                          label={t}
                          selected={form.tone.includes(t)}
                          onToggle={() => toggle("tone", t)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>
                      Sample posts ✦{" "}
                      <span
                        className="opacity-50 normal-case tracking-normal"
                        style={{ fontFamily: "inherit", fontSize: "10px" }}
                      >
                        paste 1–3 links, one per line
                      </span>
                    </FieldLabel>
                    <textarea
                      className="ca-textarea"
                      rows={4}
                      placeholder={
                        "https://www.tiktok.com/@yourhandle/video/...\nhttps://www.instagram.com/p/...\nhttps://www.youtube.com/watch?v=..."
                      }
                      value={form.sampleLinks}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, sampleLinks: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <FieldLabel>
                      Convince us.{" "}
                      <span
                        className="opacity-50 normal-case tracking-normal"
                        style={{ fontFamily: "inherit", fontSize: "10px" }}
                      >
                        optional
                      </span>
                    </FieldLabel>
                    <textarea
                      className="ca-textarea"
                      rows={3}
                      placeholder="What's the brand collab you're most proud of — or most want to land?"
                      value={form.why}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, why: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Review ─────────────────────────────────── */}
            {step === 3 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase rotate-1"
                    style={{
                      borderColor: "var(--color-fg)",
                      background: "var(--color-accent)",
                      color: "rgba(0,0,0,0.85)",
                      boxShadow: "3px 3px 0 0 var(--color-fg)",
                    }}
                  >
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-3 md:hidden">
                  Review your application.
                </h2>
                <p className="font-mono text-[12px] tracking-wide text-(--color-muted-fg) leading-relaxed mb-10 md:hidden">
                  {current.desc}
                </p>

                <div className="ca-review-grid mb-8">
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Platform", value: form.primaryPlatform },
                    { label: "Handle", value: form.handle },
                    { label: "Other handles", value: form.otherHandles || "—" },
                    { label: "Category", value: form.category },
                    { label: "Niche", value: form.niche },
                    { label: "Followers", value: form.followers },
                    { label: "Engagement", value: form.engagement || "—" },
                    { label: "Formats", value: form.formats.join(", ") || "—" },
                    { label: "Tone", value: form.tone.join(", ") || "—" },
                    { label: "Sample links", value: form.sampleLinks || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="ca-review-cell">
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-(--color-muted-fg) mb-1.5">
                        {label}
                      </p>
                      <p className="font-display italic text-base leading-snug break-words">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[11px] tracking-wide text-(--color-muted-fg) leading-relaxed">
                  By submitting you confirm this content is yours and that you
                  meet Icons&apos; creator standards. We review within 48 hours
                  and will reach out at the email above.
                </p>
              </div>
            )}

            {/* ── Error ──────────────────────────────────────────── */}
            {error && (
              <p
                className="ca-error font-mono text-[11px] tracking-wide mt-6"
                style={{ color: "var(--br-rose-ink, #b02040)" }}
              >
                {error}
              </p>
            )}

            {/* ── Navigation ─────────────────────────────────────── */}
            <div className="ca-nav">
              <div>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors duration-200 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={step < STEPS.length - 1 ? goNext : handleSubmit}
                disabled={submitting}
                className="btn-primary group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {step < STEPS.length - 1
                  ? "Continue"
                  : submitting
                    ? "Submitting…"
                    : "Submit application"}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
