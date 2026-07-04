"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Waitlist API endpoint
   ─────────────────────────────────────────────────────────────
   Point this at your own backend (the VPS API that writes to the
   waitlist table). It should accept a POST with form fields:
     - audience: "talent" | "brand"
     - name, email, discipline?, handle?   (talent)
     - company, name, email, category?     (brand)
   and return a 2xx on success.

   Override per environment with NEXT_PUBLIC_WAITLIST_ENDPOINT.
   ───────────────────────────────────────────────────────────── */
const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || "/api/waitlist";

/* ─── Styles ───────────────────────────────────────────────── */

const PAGE_STYLES = `
  .wl-root { min-height: 100svh; position: relative; overflow: hidden; background: var(--color-bg); color: var(--color-fg); }
  .wl-shell { position: relative; z-index: 10; max-width: 56rem; margin: 0 auto; padding: 3rem 1.5rem 4rem; display: flex; flex-direction: column; gap: 2.25rem; }
  @media (min-width: 768px) { .wl-shell { padding: 4.5rem 2rem 6rem; gap: 2.75rem; } }

  /* Glow orbs */
  .wl-orb { position: absolute; pointer-events: none; border-radius: 9999px; filter: blur(110px); opacity: 0.22; z-index: 0; }

  /* Form card — big sticker */
  .wl-card { background: var(--fg); color: var(--bg); border: 2px solid var(--fg); border-radius: 28px; box-shadow: 10px 10px 0 0 var(--accent); padding: 1.75rem; }
  @media (min-width: 768px) { .wl-card { padding: 2.5rem; border-radius: 32px; } }

  /* Toggle */
  .wl-toggle { display: inline-flex; padding: 4px; border-radius: 9999px; border: 2px solid var(--bg); background: rgba(255,255,255,0.06); }
  .wl-toggle-btn { padding: 0.55rem 1.25rem; border-radius: 9999px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; cursor: pointer; border: none; background: transparent; color: var(--bg); transition: background 200ms, color 200ms; }
  .wl-toggle-btn[data-active="true"] { background: var(--accent); color: var(--fg); }

  /* Inputs */
  .wl-field { display: flex; flex-direction: column; gap: 0.45rem; }
  .wl-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; opacity: 0.7; }
  .wl-input {
    appearance: none; width: 100%; padding: 0.85rem 1rem;
    background: transparent; color: var(--bg);
    border: 2px solid rgba(245,241,234,0.25); border-radius: 12px;
    font-family: var(--font-sans); font-size: 15px;
    transition: border-color 150ms, background 150ms;
  }
  .wl-input::placeholder { color: rgba(245,241,234,0.4); }
  .wl-input:focus { outline: none; border-color: var(--accent); background: rgba(197,255,61,0.05); }
  .wl-input:invalid:not(:focus):not(:placeholder-shown) { border-color: #ff3d8b; }

  /* Submit */
  .wl-submit {
    display: inline-flex; align-items: center; justify-content: center; gap: 0.65rem;
    padding: 0.95rem 1.5rem; border-radius: 9999px;
    background: var(--accent); color: var(--fg);
    font-family: var(--font-sans); font-weight: 700; font-size: 15px;
    border: 2px solid var(--bg); box-shadow: 4px 4px 0 0 var(--bg);
    transition: transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms;
    cursor: pointer;
  }
  .wl-submit:hover:not(:disabled) { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 0 var(--bg); }
  .wl-submit:active:not(:disabled) { transform: translate(2px,2px); box-shadow: 0 0 0 0 var(--bg); }
  .wl-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Status pill */
  .wl-pill { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.4rem 0.85rem; border-radius: 9999px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; }
`;

/* ─── Audience configs ─────────────────────────────────────── */

type Mode = "talent" | "brand";

const MODES: Record<Mode, {
  label: string;
  eyebrow: string;
  title: string;
  script: string;
  fields: { name: string; label: string; type: string; placeholder: string; required?: boolean }[];
  submitLabel: string;
}> = {
  talent: {
    label: "Talent",
    eyebrow: "Talent waitlist",
    title: "Join the roster.",
    script: "— creators, musicians, dancers, photographers welcome",
    submitLabel: "Reserve my spot",
    fields: [
      { name: "name",     label: "Your name",       type: "text",  placeholder: "e.g. Maya R.",             required: true },
      { name: "email",    label: "Email",           type: "email", placeholder: "you@domain.com",           required: true },
      { name: "discipline", label: "What you do",   type: "text",  placeholder: "Creator · Musician · Dancer · Photographer", required: true },
      { name: "handle",   label: "Main handle (optional)", type: "text", placeholder: "@your.handle" },
    ],
  },
  brand: {
    label: "Brand",
    eyebrow: "Brand waitlist",
    title: "Start your first campaign.",
    script: "— briefs go live in 48h, no agency markup",
    submitLabel: "Request early access",
    fields: [
      { name: "company",  label: "Company",         type: "text",  placeholder: "Your brand",               required: true },
      { name: "name",     label: "Your name",       type: "text",  placeholder: "Contact person",           required: true },
      { name: "email",    label: "Work email",      type: "email", placeholder: "you@brand.com",            required: true },
      { name: "category", label: "Category (optional)", type: "text", placeholder: "Beauty · Tech · Fashion · Food" },
    ],
  },
};

/* ─── Page ─────────────────────────────────────────────────── */

export const WaitlistPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("talent");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(".wl-mark",   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.05 });
      gsap.fromTo(".wl-sub",    { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.25 });
      gsap.fromTo(".wl-card",   { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, ease: "expo.out", delay: 0.4 });
      gsap.fromTo(".wl-tail",   { opacity: 0 },        { opacity: 1, duration: 0.6, ease: "power2.out",     delay: 0.7 });
      gsap.fromTo(".wl-spark",  { scale: 0, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.08, delay: 0.6 });
      gsap.to(".wl-spark", { y: "+=10", rotate: "+=6", duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: { each: 0.3, from: "random" } });
    },
    { scope: rootRef },
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const payload: Record<string, string> = Object.fromEntries(
      new FormData(form).entries() as IterableIterator<[string, string]>,
    );
    payload.audience = mode;

    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(data?.errors?.[0]?.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please retry.");
    }
  }

  const cfg = MODES[mode];

  return (
    <div ref={rootRef} className="wl-root dot-grid">
      <style>{PAGE_STYLES}</style>

      {/* Orbs */}
      <div className="wl-orb" style={{ width: "32rem", height: "32rem", background: "var(--accent)", top: "-8rem", left: "-6rem" }} />
      <div className="wl-orb" style={{ width: "26rem", height: "26rem", background: "var(--accent2)", bottom: "-6rem", right: "-4rem", opacity: 0.18 }} />

      {/* Sparkles */}
      <Sparkle size={48} fill="var(--accent2)" className="wl-spark absolute top-[8%] right-[8%] -rotate-12 pointer-events-none z-0" />
      <Sparkle size={36} fill="var(--accent3)" className="wl-spark absolute top-[18%] left-[6%] rotate-12 pointer-events-none z-0" />
      <Sparkle size={42} fill="var(--accent4)" className="wl-spark absolute bottom-[20%] left-[10%] -rotate-6 pointer-events-none z-0" />
      <Sparkle size={32} fill="var(--accent)"  className="wl-spark absolute bottom-[14%] right-[14%] rotate-6 pointer-events-none z-0" />

      {/* Shell */}
      <div className="wl-shell">

        {/* ─── Wordmark + tagline ─────────────────────────── */}
        <div className="flex flex-col items-center text-center">
          <div className="wl-mark inline-flex items-baseline gap-1 font-display italic leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(4rem,11vw,9rem)" }}>
            <span>IC</span>
            <span style={{ color: "var(--color-accent)" }}>✦</span>
            <span>NS</span>
          </div>
          <p className="wl-sub mt-4 font-script text-2xl md:text-3xl opacity-70">
            — where brands meet talent
          </p>
          <p className="wl-sub mt-6 font-mono text-[11px] tracking-[0.32em] uppercase opacity-55">
            ✦ launching soon · join the waitlist · ✦
          </p>
        </div>

        {/* ─── Form card ───────────────────────────────────── */}
        <div className="wl-card">
          {/* Toggle */}
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <p className="font-mono text-[10px] tracking-[0.32em] uppercase opacity-60">
              {cfg.eyebrow}
            </p>
            <div className="wl-toggle">
              {(Object.keys(MODES) as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  className="wl-toggle-btn"
                  data-active={mode === m}
                  onClick={() => { setMode(m); setStatus("idle"); setErrorMsg(null); }}
                >
                  {MODES[m].label}
                </button>
              ))}
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-display italic leading-[1.02] tracking-[-0.02em] mb-2" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>
            {cfg.title}
          </h2>
          <p className="font-script text-lg md:text-xl opacity-65 mb-6">
            {cfg.script}
          </p>

          {/* Success state */}
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4 py-6">
              <span className="wl-pill" style={{ background: "var(--accent)", color: "var(--fg)" }}>
                <Check className="w-3.5 h-3.5" />
                You&apos;re on the list
              </span>
              <p className="font-display italic text-2xl md:text-3xl leading-tight">
                We&apos;ll be in touch when {mode === "talent" ? "the roster opens" : "early-access seats open"}.
              </p>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-55">
                Check your inbox for confirmation.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase opacity-60 hover:opacity-100 underline underline-offset-4"
              >
                ← Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" key={mode}>
              {cfg.fields.map((f) => (
                <div key={f.name} className="wl-field">
                  <label htmlFor={`wl-${f.name}`} className="wl-label">{f.label}</label>
                  <input
                    id={`wl-${f.name}`}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    autoComplete={f.type === "email" ? "email" : "off"}
                    className="wl-input"
                  />
                </div>
              ))}

              {/* Honeypot — bots fill this; humans don't see it */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

              {/* Status messaging */}
              {status === "error" && errorMsg && (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--accent2)" }}>
                  ⚠ {errorMsg}
                </p>
              )}

              <button type="submit" disabled={status === "submitting"} className={cn("wl-submit mt-2")}>
                {status === "submitting" ? "Sending…" : cfg.submitLabel}
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <p className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-45 mt-1">
                No spam. We email once when we launch.
              </p>
            </form>
          )}
        </div>

        {/* ─── Tail / footer ───────────────────────────────── */}
        <div className="wl-tail flex flex-col items-center text-center gap-3">
          <p className="font-mono text-[10px] tracking-[0.32em] uppercase opacity-50">
            ✦ 0% commission · 48h payouts · built in Tunisia ✦
          </p>
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase opacity-40">
            © {new Date().getFullYear()} Icons · <Link href="/privacy" className="underline underline-offset-2 hover:opacity-100">Privacy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
