"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/router";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease, dur } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

/* ─── Types ──────────────────────────────────────────────────────── */

type Brief = {
  brandName: string;
  industry: string;
  audience: string;
  campaignType: string;
  budget: string;
  timeline: string;
  platforms: string[];
  tier: string;
  quantity: string;
  formats: string[];
  tone: string[];
  notes: string;
};

const INITIAL: Brief = {
  brandName: "", industry: "", audience: "",
  campaignType: "", budget: "", timeline: "",
  platforms: [], tier: "", quantity: "",
  formats: [], tone: [], notes: "",
};

/* ─── Step config ────────────────────────────────────────────────── */

const STEPS = [
  { num: "01", label: "Brand",    badge: "Step 1 of 5",  title: "Tell us about\nyour brand.",       desc: "Who you are, who you're for, and what makes you worth talking about." },
  { num: "02", label: "Goals",    badge: "Step 2 of 5",  title: "What do you\nwant to achieve?",    desc: "Campaign type, budget, and timeline — three levers that shape everything." },
  { num: "03", label: "Creators", badge: "Step 3 of 5",  title: "Who should\nyou work with?",       desc: "We'll filter 10,000+ profiles down to creators who fit your exact brief." },
  { num: "04", label: "Content",  badge: "Step 4 of 5",  title: "Define the\ncreative direction.",  desc: "Formats, tone, and any non-negotiables for the content itself." },
  { num: "05", label: "Review",   badge: "Final step",   title: "Your brief\nis ready.",            desc: "Everything in one place. Submit when you're happy." },
];

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  .bb-layout {
    display: grid;
    grid-template-columns: 1fr;
    min-height: calc(100vh - 64px);
  }
  @media (min-width: 1024px) {
    .bb-layout { grid-template-columns: 360px 1fr; }
  }

  /* Sidebar — dark ink panel */
  .bb-sidebar {
    background: var(--color-fg);
    color: var(--color-bg);
    padding: 3.5rem 2.75rem;
    position: sticky; top: 64px;
    height: calc(100vh - 64px);
    display: flex; flex-direction: column; justify-content: space-between;
    overflow: hidden;
    border-right: 2px solid var(--color-fg);
  }
  @media (max-width: 1023px) { .bb-sidebar { display: none; } }

  /* Main area */
  .bb-main {
    padding: 3.5rem 2.5rem 6rem;
    background-image: radial-gradient(circle, color-mix(in srgb, var(--color-fg) 8%, transparent) 1px, transparent 1px);
    background-size: 22px 22px;
  }
  @media (min-width: 768px) { .bb-main { padding: 4.5rem 5rem 8rem; } }

  /* Progress bar */
  .bb-progress { display: flex; border-bottom: 2px solid var(--color-fg); }
  .bb-prog-step {
    flex: 1; padding: 0.9rem 0.75rem 0.75rem;
    border-top: 3px solid transparent;
    transition: border-color 0.3s, background 0.3s;
    cursor: default;
  }
  .bb-prog-step.done   { border-top-color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 8%, transparent); }
  .bb-prog-step.active { border-top-color: var(--color-fg); }

  /* Option grid layouts */
  .opt-2 { display: grid; grid-template-columns: 1fr; gap: 0.6rem; }
  @media (min-width: 640px) { .opt-2 { grid-template-columns: repeat(2, 1fr); } }
  .opt-3 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  @media (min-width: 768px) { .opt-3 { grid-template-columns: repeat(3, 1fr); } }
  .opt-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  @media (min-width: 768px) { .opt-4 { grid-template-columns: repeat(4, 1fr); } }
  .opt-inline { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  /* Option button — neo-brutalist sticker cards */
  .bb-opt {
    position: relative; padding: 1.25rem 1.5rem;
    background: var(--color-bg); text-align: left; cursor: pointer;
    border: 2px solid var(--color-fg); width: 100%;
    border-radius: var(--radius-md);
    transition: box-shadow 0.18s ease, transform 0.18s ease;
    box-shadow: 3px 3px 0 0 var(--color-fg);
  }
  .bb-opt:hover {
    box-shadow: 5px 5px 0 0 var(--color-fg);
    transform: translate(-1px, -1px);
    background: var(--color-panel);
  }
  .bb-opt:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }
  .bb-opt.sel {
    background: var(--color-fg);
    color: var(--color-bg);
    box-shadow: 4px 4px 0 0 var(--color-accent);
    transform: translate(-1px, -1px);
  }
  .bb-opt.sel .bb-opt-sub { color: color-mix(in srgb, var(--color-bg) 55%, transparent); }

  /* Inline tag option — rounded pill */
  .bb-tag {
    padding: 0.5rem 1.1rem;
    border: 2px solid var(--color-fg);
    border-radius: 999px;
    background: var(--color-bg); cursor: pointer;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
    transition: all 0.18s; white-space: nowrap;
    box-shadow: 2px 2px 0 0 var(--color-fg);
  }
  .bb-tag:hover { box-shadow: 3px 3px 0 0 var(--color-fg); transform: translate(-0.5px, -0.5px); }
  .bb-tag:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
  .bb-tag.sel {
    background: var(--color-fg);
    color: var(--color-bg);
    border-color: var(--color-fg);
    box-shadow: 3px 3px 0 0 var(--color-accent);
  }

  /* Text input */
  .bb-input {
    width: 100%; background: transparent; border: none;
    border-bottom: 2px solid var(--color-border);
    padding: 0.75rem 0; font-size: 1.125rem; color: var(--color-fg);
    outline: none; transition: border-color 0.2s;
    font-family: inherit;
  }
  .bb-input:focus { border-bottom-color: var(--color-fg); }
  .bb-input::placeholder { color: color-mix(in srgb, var(--color-muted-fg) 60%, transparent); }

  .bb-textarea {
    width: 100%; background: var(--color-bg);
    border: 2px solid var(--color-fg);
    border-radius: var(--radius-md);
    padding: 1rem 1.25rem; color: var(--color-fg);
    outline: none; resize: none; transition: box-shadow 0.2s;
    font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.03em; line-height: 1.7;
    min-height: 120px;
    box-shadow: 3px 3px 0 0 var(--color-fg);
  }
  .bb-textarea:focus { box-shadow: 4px 4px 0 0 var(--color-accent); }
  .bb-textarea::placeholder { color: color-mix(in srgb, var(--color-muted-fg) 60%, transparent); }

  /* Review summary */
  .bb-review-grid {
    display: grid; grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  @media (min-width: 640px) { .bb-review-grid { grid-template-columns: repeat(2, 1fr); } }
  .bb-review-cell {
    padding: 1.5rem 1.75rem;
    background: var(--color-bg);
    border: 2px solid var(--color-fg);
    border-radius: var(--radius-md);
    box-shadow: 3px 3px 0 0 var(--color-fg);
  }

  /* Nav */
  .bb-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 3rem; margin-top: 3rem;
    border-top: 2px solid var(--color-fg);
  }

  /* ── Dark mode overrides ──────────────────────────────────────── */
  [data-theme="dark"] .bb-sidebar {
    background: #111111;
    color: var(--color-fg);
    border-right-color: #2a2a2a;
  }
  [data-theme="dark"] .bb-progress {
    border-bottom-color: #2a2a2a;
  }
  [data-theme="dark"] .bb-prog-step.active {
    border-top-color: var(--color-accent);
  }
  [data-theme="dark"] .bb-opt {
    border-color: var(--color-border-soft);
    box-shadow: 3px 3px 0 0 var(--color-border-soft);
  }
  [data-theme="dark"] .bb-opt:hover {
    box-shadow: 5px 5px 0 0 var(--color-border-soft);
  }
  [data-theme="dark"] .bb-opt.sel {
    background: var(--color-accent);
    color: #000;
    border-color: var(--color-accent);
    box-shadow: 4px 4px 0 0 color-mix(in srgb, var(--color-accent) 40%, transparent);
  }
  [data-theme="dark"] .bb-opt.sel .bb-opt-sub {
    color: rgba(0,0,0,0.55);
  }
  [data-theme="dark"] .bb-tag {
    border-color: var(--color-border-soft);
    box-shadow: 2px 2px 0 0 var(--color-border-soft);
  }
  [data-theme="dark"] .bb-tag.sel {
    background: var(--color-accent);
    color: #000;
    border-color: var(--color-accent);
    box-shadow: 3px 3px 0 0 color-mix(in srgb, var(--color-accent) 40%, transparent);
  }
  [data-theme="dark"] .bb-nav {
    border-top-color: #2a2a2a;
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

function OptButton({ label, sub, selected, onToggle, large }: {
  label: string; sub?: string; selected: boolean; onToggle: () => void; large?: boolean;
}) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={selected} className={`bb-opt ${selected ? "sel" : ""}`}>
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center rounded-full"
          style={{ background: "var(--color-accent)" }}>
          <Check className="w-3 h-3" style={{ color: "#000" }} strokeWidth={3} />
        </span>
      )}
      <span className={`font-display italic block ${large ? "text-2xl" : "text-lg"} leading-tight`}>{label}</span>
      {sub && <span className="bb-opt-sub font-mono text-[10px] tracking-[0.12em] block mt-1.5 text-(--color-muted-fg)">{sub}</span>}
    </button>
  );
}

function TagButton({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={selected} className={`bb-tag ${selected ? "sel" : ""}`}>
      {selected && <span className="mr-1.5" aria-hidden>✦</span>}{label}
    </button>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export const BriefBuilderPage = () => {
  const ref     = React.useRef<HTMLDivElement>(null);
  const stepRef = React.useRef<HTMLDivElement>(null);
  const router  = useRouter();
  const [step,       setStep]       = React.useState(0);
  const [dir,        setDir]        = React.useState<1 | -1>(1);
  const [brief,      setBrief]      = React.useState<Brief>(INITIAL);
  const [error,      setError]      = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  // Pre-selected creator from /creators/[handle] CTA
  const creatorHandle = typeof router.query.creator === "string" ? router.query.creator : null;

  // Jump to the Creators step when arriving with a pre-selected creator
  React.useEffect(() => {
    if (creatorHandle) requestAnimationFrame(() => setStep(2));
  }, [creatorHandle]);

  // Animate step in on change
  React.useEffect(() => {
    if (!stepRef.current) return;
    gsap.fromTo(stepRef.current,
      { x: dir * 48, opacity: 0 },
      { x: 0, opacity: 1, duration: dur.base, ease: ease.out },
    );
  }, [step]);

  // Entrance
  useGSAP(() => {
    gsap.fromTo(".bb-entrance",
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: dur.slow, ease: ease.out, stagger: 0.08, delay: 0.1 },
    );
  }, { scope: ref });

  const toggle = (field: keyof Brief, val: string) => {
    setBrief(b => {
      const arr = b[field] as string[];
      return { ...b, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const validate = (): boolean => {
    const checks: Record<number, () => boolean> = {
      0: () => brief.brandName.trim().length > 0 && brief.industry.length > 0,
      1: () => brief.campaignType.length > 0 && brief.budget.length > 0,
      2: () => brief.platforms.length > 0 && brief.tier.length > 0 && brief.quantity.length > 0,
      3: () => brief.formats.length > 0,
    };
    return checks[step]?.() ?? true;
  };

  const goNext = () => {
    if (!validate()) {
      setError("Please fill in the required fields to continue.");
      gsap.fromTo(".bb-error", { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(4,0.3)" });
      return;
    }
    setError("");
    setDir(1);
    gsap.to(stepRef.current, {
      x: -48, opacity: 0, duration: dur.fast, ease: ease.out,
      onComplete: () => setStep(s => s + 1),
    });
  };

  const goPrev = () => {
    setError("");
    setDir(-1);
    gsap.to(stepRef.current, {
      x: 48, opacity: 0, duration: dur.fast, ease: ease.out,
      onComplete: () => setStep(s => s - 1),
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate brief processing round-trip (1.6s)
    await new Promise((r) => setTimeout(r, 1600));
    router.push("/brief-status");
  };

  const current = STEPS[step];

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg) bracket-frame">
      <style>{PAGE_STYLES}</style>

      {/* ── Progress bar ─────────────────────────────────────────── */}
      <div className="bb-progress bb-entrance">
        {STEPS.map((s, i) => (
          <div key={s.num} className={`bb-prog-step ${i < step ? "done" : i === step ? "active" : ""}`}>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] block mb-0.5"
              style={{ color: i <= step ? "var(--color-fg)" : "var(--color-muted-fg)" }}>
              {s.num}
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] hidden md:block"
              style={{ color: i === step ? "var(--color-fg)" : i < step ? "var(--color-accent)" : "var(--color-muted-fg)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="bb-layout">

        {/* ── Sidebar — dark ink panel ──────────────────────────── */}
        <aside className="bb-sidebar">
          {/* Watermark step number */}
          <div aria-hidden className="absolute inset-0 flex items-end justify-end overflow-hidden pointer-events-none select-none">
            <span className="font-display italic leading-none"
              style={{
                fontSize: "clamp(10rem,18vw,16rem)",
                color: "var(--color-bg)",
                opacity: 0.05,
                transform: "translate(15%, 8%)",
                lineHeight: 1,
              }}>
              {current.num}
            </span>
          </div>
          {/* Sparkle accent */}
          <Sparkle size={44} fill="var(--color-accent)" stroke="var(--color-accent)" strokeWidth={0}
            className="absolute top-8 right-8 opacity-60 pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-8 bb-entrance flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent)" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "color-mix(in srgb, var(--color-bg) 55%, transparent)" }}>
                Campaign Brief
              </span>
            </div>

            <div className="font-display italic leading-none mb-4 bb-entrance select-none"
              style={{ fontSize: "clamp(4rem,7vw,6rem)", color: "var(--color-accent)", lineHeight: 0.9 }}>
              {current.num}
            </div>

            <h2 className="font-display italic leading-[1.0] mb-4 bb-entrance"
              style={{ fontSize: "clamp(1.75rem,2.5vw,2.5rem)", color: "var(--color-bg)", whiteSpace: "pre-line" }}>
              {current.title}
            </h2>

            <p className="font-script text-lg bb-entrance"
              style={{ color: "color-mix(in srgb, var(--color-bg) 60%, transparent)" }}>
              — {current.desc}
            </p>
          </div>

          {/* Pre-selected creator chip — always visible when present */}
          {creatorHandle && (
            <div className="relative z-10 pt-6"
              style={{ borderTop: "1px solid color-mix(in srgb, var(--color-bg) 15%, transparent)" }}>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] mb-2"
                style={{ color: "color-mix(in srgb, var(--color-bg) 40%, transparent)" }}>Creator locked</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "var(--color-accent)", color: "#000" }}>
                <Check className="w-3 h-3 flex-shrink-0" strokeWidth={3} />
                <span className="font-mono text-[10px] font-semibold tracking-wide">@{creatorHandle}</span>
              </div>
            </div>
          )}

          {/* Brief summary so far */}
          {step > 0 && (
            <div className="relative z-10 pt-6 space-y-4"
              style={{ borderTop: "1px solid color-mix(in srgb, var(--color-bg) 15%, transparent)" }}>
              {brief.brandName && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] mb-0.5"
                    style={{ color: "color-mix(in srgb, var(--color-bg) 40%, transparent)" }}>Brand</p>
                  <p className="font-display italic text-base" style={{ color: "var(--color-bg)" }}>{brief.brandName}</p>
                </div>
              )}
              {brief.industry && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] mb-0.5"
                    style={{ color: "color-mix(in srgb, var(--color-bg) 40%, transparent)" }}>Industry</p>
                  <p className="font-display italic text-base" style={{ color: "var(--color-bg)" }}>{brief.industry}</p>
                </div>
              )}
              {brief.campaignType && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] mb-0.5"
                    style={{ color: "color-mix(in srgb, var(--color-bg) 40%, transparent)" }}>Goal</p>
                  <p className="font-display italic text-base capitalize" style={{ color: "var(--color-bg)" }}>{brief.campaignType}</p>
                </div>
              )}
              {brief.budget && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] mb-0.5"
                    style={{ color: "color-mix(in srgb, var(--color-bg) 40%, transparent)" }}>Budget</p>
                  <p className="font-display italic text-base" style={{ color: "var(--color-accent)" }}>{brief.budget}</p>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* ── Main form ─────────────────────────────────────────── */}
        <div className="bb-main relative">
          {/* Ambient Sparkle decorations */}
          <Sparkle size={40} fill="var(--accent2)" className="absolute top-8 right-8 opacity-40 pointer-events-none hidden md:block" />
          <Sparkle size={28} fill="var(--accent4)" className="absolute bottom-24 right-20 opacity-35 pointer-events-none hidden lg:block" />

          <div ref={stepRef}>

            {/* ── STEP 0: Brand ──────────────────────────────────── */}
            {step === 0 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase -rotate-1"
                    style={{ borderColor: "var(--color-fg)", background: "var(--color-accent)", color: "rgba(0,0,0,0.85)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 md:hidden">
                  {current.title.replace("\n", " ")}
                </h2>

                <div className="space-y-10">
                  <div>
                    <FieldLabel>Brand name *</FieldLabel>
                    <input
                      className="bb-input"
                      placeholder="e.g. GlowBeauty"
                      value={brief.brandName}
                      onChange={e => setBrief(b => ({ ...b, brandName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <FieldLabel>Industry *</FieldLabel>
                    <div className="opt-4">
                      {["Beauty & Lifestyle", "Fashion & Style", "Fitness & Health", "Food & Beverage",
                        "Home & Living", "Travel & Adventure", "Tech & Gaming", "Finance & Business",
                      ].map(ind => (
                        <OptButton key={ind} label={ind}
                          selected={brief.industry === ind}
                          onToggle={() => setBrief(b => ({ ...b, industry: b.industry === ind ? "" : ind }))} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Target audience <span className="opacity-50">(optional)</span></FieldLabel>
                    <input
                      className="bb-input"
                      placeholder="e.g. Women 25–35 interested in clean beauty"
                      value={brief.audience}
                      onChange={e => setBrief(b => ({ ...b, audience: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 1: Goals ──────────────────────────────────── */}
            {step === 1 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase rotate-1"
                    style={{ borderColor: "var(--color-fg)", background: "var(--color-accent)", color: "rgba(0,0,0,0.85)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 md:hidden">
                  {current.title.replace("\n", " ")}
                </h2>

                <div className="space-y-10">
                  <div>
                    <FieldLabel>Campaign type *</FieldLabel>
                    <div className="opt-2">
                      {[
                        { val: "awareness",  label: "Brand Awareness",     sub: "Get in front of new audiences at scale" },
                        { val: "conversion", label: "Drive Conversions",   sub: "Sales, sign-ups, downloads, installs" },
                        { val: "ugc",        label: "Content Library",     sub: "Build brand-owned assets — video, photo, audio — for ads & organic" },
                        { val: "launch",     label: "Product Launch",      sub: "Generate buzz around something new" },
                      ].map(({ val, label, sub }) => (
                        <OptButton key={val} label={label} sub={sub} large
                          selected={brief.campaignType === val}
                          onToggle={() => setBrief(b => ({ ...b, campaignType: b.campaignType === val ? "" : val }))} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Budget range *</FieldLabel>
                    <div className="opt-4">
                      {["$1K – $5K", "$5K – $15K", "$15K – $50K", "$50K+"].map(b => (
                        <OptButton key={b} label={b}
                          selected={brief.budget === b}
                          onToggle={() => setBrief(br => ({ ...br, budget: br.budget === b ? "" : b }))} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Timeline</FieldLabel>
                    <div className="opt-4">
                      {["2 weeks", "1 month", "3 months", "Ongoing"].map(t => (
                        <OptButton key={t} label={t}
                          selected={brief.timeline === t}
                          onToggle={() => setBrief(b => ({ ...b, timeline: b.timeline === t ? "" : t }))} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Creators ───────────────────────────────── */}
            {step === 2 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase -rotate-1"
                    style={{ borderColor: "var(--color-fg)", background: "var(--color-accent)", color: "rgba(0,0,0,0.85)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 md:hidden">
                  {current.title.replace("\n", " ")}
                </h2>

                {/* Pre-selected creator banner */}
                {creatorHandle && (
                  <div className="mb-8 flex items-center gap-3 px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: "var(--color-accent)", background: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-accent)" }} />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-0.5">Creator pre-selected</p>
                      <p className="text-sm font-medium">@{creatorHandle} · We'll prioritise this creator in your match list.</p>
                    </div>
                    <button
                      className="ml-auto font-mono text-[10px] uppercase tracking-widest opacity-40 hover:opacity-80 transition-opacity"
                      onClick={() => router.replace("/brief-builder", undefined, { shallow: true })}
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="space-y-10">
                  <div>
                    <FieldLabel>Platforms * <span className="opacity-50 normal-case tracking-normal" style={{ fontFamily: "inherit", fontSize: "10px" }}>(select all that apply)</span></FieldLabel>
                    <div className="opt-inline">
                      {["TikTok", "Instagram Reels", "Instagram Feed", "YouTube Shorts", "YouTube", "Pinterest"].map(p => (
                        <TagButton key={p} label={p}
                          selected={brief.platforms.includes(p)}
                          onToggle={() => toggle("platforms", p)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Creator tier *</FieldLabel>
                    <div className="opt-2">
                      {[
                        { val: "micro", label: "Micro",    sub: "10K – 100K · Highest engagement rates" },
                        { val: "mid",   label: "Mid-tier", sub: "100K – 500K · Balanced reach + trust" },
                        { val: "macro", label: "Macro",    sub: "500K – 2M · Broad awareness play" },
                        { val: "mix",   label: "Mixed",    sub: "Let us pick the optimal blend" },
                      ].map(({ val, label, sub }) => (
                        <OptButton key={val} label={label} sub={sub}
                          selected={brief.tier === val}
                          onToggle={() => setBrief(b => ({ ...b, tier: b.tier === val ? "" : val }))} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Number of creators *</FieldLabel>
                    <div className="opt-4">
                      {["1 – 5", "5 – 15", "15 – 30", "30+"].map(q => (
                        <OptButton key={q} label={q}
                          selected={brief.quantity === q}
                          onToggle={() => setBrief(b => ({ ...b, quantity: b.quantity === q ? "" : q }))} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Content ────────────────────────────────── */}
            {step === 3 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase rotate-1"
                    style={{ borderColor: "var(--color-fg)", background: "var(--color-accent)", color: "rgba(0,0,0,0.85)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-10 md:hidden">
                  {current.title.replace("\n", " ")}
                </h2>

                <div className="space-y-10">
                  <div>
                    <FieldLabel>Content formats * <span className="opacity-50 normal-case tracking-normal" style={{ fontFamily: "inherit", fontSize: "10px" }}>(select all that apply)</span></FieldLabel>
                    <div className="opt-inline">
                      {["Short video (≤60s)", "Long video (60s+)", "Photo set", "Stories", "Reels", "Live session", "Podcast mention"].map(f => (
                        <TagButton key={f} label={f}
                          selected={brief.formats.includes(f)}
                          onToggle={() => toggle("formats", f)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Creative tone <span className="opacity-50 normal-case tracking-normal" style={{ fontFamily: "inherit", fontSize: "10px" }}>(select all that apply)</span></FieldLabel>
                    <div className="opt-inline">
                      {["Educational", "Entertaining", "Inspirational", "Authentic / Raw", "Polished", "Testimonial", "Tutorial", "Humorous"].map(t => (
                        <TagButton key={t} label={t}
                          selected={brief.tone.includes(t)}
                          onToggle={() => toggle("tone", t)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Creative notes <span className="opacity-50 normal-case tracking-normal" style={{ fontFamily: "inherit", fontSize: "10px" }}>(optional)</span></FieldLabel>
                    <textarea
                      className="bb-textarea"
                      placeholder="Any specific messaging, references, visual style, things to avoid..."
                      rows={5}
                      value={brief.notes}
                      onChange={e => setBrief(b => ({ ...b, notes: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 4: Review ─────────────────────────────────── */}
            {step === 4 && (
              <div className="max-w-2xl">
                <div className="md:hidden mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border-2 font-mono text-[10px] tracking-[0.25em] uppercase -rotate-1"
                    style={{ borderColor: "var(--color-fg)", background: "var(--color-accent)", color: "rgba(0,0,0,0.85)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                    {current.badge}
                  </span>
                </div>
                <h2 className="font-display italic text-[clamp(2.25rem,7vw,3.5rem)] leading-[0.95] tracking-[-0.02em] mb-3 md:hidden">
                  Review your brief.
                </h2>
                <p className="font-mono text-[12px] tracking-wide text-(--color-muted-fg) leading-relaxed mb-10 md:hidden">
                  {current.desc}
                </p>

                <div className="bb-review-grid mb-8">
                  {[
                    { label: "Brand",        value: brief.brandName },
                    { label: "Industry",     value: brief.industry },
                    { label: "Audience",     value: brief.audience || "Not specified" },
                    { label: "Goal",         value: brief.campaignType ? (
                      { awareness: "Brand Awareness", conversion: "Drive Conversions", ugc: "Content Library", launch: "Product Launch" }
                        [brief.campaignType] || brief.campaignType
                    ) : "—" },
                    { label: "Budget",       value: brief.budget || "—" },
                    { label: "Timeline",     value: brief.timeline || "—" },
                    { label: "Platforms",    value: brief.platforms.join(", ") || "—" },
                    { label: "Creator tier", value: brief.tier ? (
                      { micro: "Micro (10K–100K)", mid: "Mid-tier (100K–500K)", macro: "Macro (500K–2M)", mix: "Mixed blend" }
                        [brief.tier] || brief.tier
                    ) : "—" },
                    { label: "# Creators",  value: brief.quantity || "—" },
                    { label: "Formats",      value: brief.formats.join(", ") || "—" },
                    { label: "Tone",         value: brief.tone.join(", ") || "—" },
                    { label: "Notes",        value: brief.notes || "None" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bb-review-cell">
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-(--color-muted-fg) mb-1.5">{label}</p>
                      <p className="font-display italic text-base leading-snug">{value}</p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[11px] tracking-wide text-(--color-muted-fg) leading-relaxed">
                  By submitting you agree to Icons reviewing your brief and reaching out within 48 hours with creator matches. No commitment required.
                </p>
              </div>
            )}

            {/* ── Error ──────────────────────────────────────────── */}
            {error && (
              <p className="bb-error font-mono text-[11px] tracking-wide mt-6"
                style={{ color: "var(--br-rose-ink, #b02040)" }}>
                {error}
              </p>
            )}

            {/* ── Navigation ─────────────────────────────────────── */}
            <div className="bb-nav">
              <div>
                {step > 0 && (
                  <button type="button" onClick={goPrev}
                    className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors duration-200 cursor-pointer">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
              </div>

              <button type="button"
                onClick={step < STEPS.length - 1 ? goNext : handleSubmit}
                disabled={submitting}
                className="btn-primary group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                {submitting ? (
                  <>
                    <span
                      className="inline-block w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
                      aria-hidden
                    />
                    Submitting…
                  </>
                ) : step < STEPS.length - 1 ? (
                  <>
                    Continue
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                ) : (
                  <>
                    Submit brief
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
