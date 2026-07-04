import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ease } from "@/lib/motion";

/* ────────────────────────────────────────────────────────────── */
/* STYLES  (same design system as LoginPage)                      */
/* ────────────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  /* ── Split layout ─────────────── */
  .fp-root {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100svh;
  }
  @media (min-width: 768px) {
    .fp-root { grid-template-columns: 420px 1fr; }
  }
  @media (min-width: 1024px) {
    .fp-root { grid-template-columns: 500px 1fr; }
  }

  /* ── Left panel ───────────────── */
  .fp-left {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    background: var(--color-fg);
    color: var(--color-bg);
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    .fp-left { display: flex; }
  }

  /* ── Form field ───────────────── */
  .fp-input {
    width: 100%;
    background: var(--color-panel);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--color-fg);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .fp-input::placeholder {
    color: color-mix(in srgb, var(--color-fg) 30%, transparent);
  }
  .fp-input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 15%, transparent);
  }
  .fp-input[aria-invalid="true"] {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
  }
`;

/* ────────────────────────────────────────────────────────────── */
/* COMPONENT                                                      */
/* ────────────────────────────────────────────────────────────── */

export default function ForgotPasswordPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const emailId = React.useId();

  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  /* ── Entrance animation ─────────────────────────────────────── */
  useGSAP(
    () => {
      gsap.fromTo(
        ".fp-in",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: ease.out,
          stagger: 0.07,
          delay: 0.1,
        },
      );
    },
    { scope: ref, dependencies: [sent] },
  );

  /* ── Submit ─────────────────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("That doesn't look like a valid email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      // Always show the generic "sent" state — the backend never reveals
      // whether the email is registered.
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Left panel (shared between both states) ─────────────────── */
  const leftPanel = (
    <div className="fp-left">
      {/* Watermark */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display italic leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(8rem,18vw,16rem)",
          color: "rgba(255,255,255,0.04)",
          zIndex: 0,
        }}
      >
        ✦
      </span>

      <Sparkle
        size={32}
        fill="var(--color-accent)"
        className="absolute top-12 right-10 opacity-50 pointer-events-none"
      />

      {/* Top — brand mark */}
      <div className="relative flex items-center gap-2.5" style={{ zIndex: 1 }}>
        <span
          className="font-display italic text-2xl leading-none"
          style={{ color: "var(--color-bg)" }}
        >
          Icons
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Studio
        </span>
      </div>

      {/* Middle — reassurance copy */}
      <div className="relative flex flex-col gap-5" style={{ zIndex: 1 }}>
        <h2
          className="font-display italic leading-[1.0]"
          style={{
            fontSize: "clamp(2rem,3.5vw,3rem)",
            color: "var(--color-bg)",
          }}
        >
          Forgotten passwords happen.
          <br />
          Your account hasn&apos;t
          <br />
          gone anywhere.
        </h2>
        <p
          className="font-mono text-[11px] leading-[1.8]"
          style={{
            color: "color-mix(in srgb, var(--color-bg) 55%, transparent)",
          }}
        >
          We&apos;ll send a secure link to your inbox.
          <br />
          Valid for 15 minutes. No guessing required.
        </p>
        {/* Trust row */}
        <div className="flex flex-col gap-2 mt-2">
          {[
            "No account deletion — ever",
            "Link expires in 15 minutes",
            "Sent from noreply@icons.studio",
          ].map((line) => (
            <div key={line} className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--color-accent)" }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{
                  color: "color-mix(in srgb, var(--color-bg) 50%, transparent)",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom — legal */}
      <p
        className="relative font-mono text-[10px] leading-[1.7]"
        style={{ color: "rgba(255,255,255,0.28)", zIndex: 1 }}
      >
        © Icons Studio, Inc. · icons.studio
        <br />
        Questions?{" "}
        <Link
          href="mailto:help@icons.studio"
          className="underline underline-offset-2 hover:text-white transition-colors"
        >
          help@icons.studio
        </Link>
      </p>
    </div>
  );

  /* ── Success state ──────────────────────────────────────────── */
  if (sent) {
    return (
      <div ref={ref} className="fp-root">
        <style>{PAGE_STYLES}</style>
        {leftPanel}

        <div className="flex flex-col min-h-svh bg-(--color-bg) dot-grid">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-(--color-border)">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to login
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
              Reset sent
            </span>
          </div>

          {/* Center */}
          <div className="flex-1 flex items-center justify-center px-6 py-14">
            <div className="w-full max-w-sm flex flex-col gap-8 text-center">
              <div className="fp-in flex justify-center">
                <Sparkle
                  size={52}
                  fill="var(--color-accent)"
                  className="-rotate-12"
                />
              </div>
              <div className="fp-in flex flex-col gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted-fg)">
                  ✦ Check your inbox
                </p>
                <h1
                  className="font-display italic leading-[0.95]"
                  style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)" }}
                >
                  Link sent.
                </h1>
                <p className="font-mono text-[12px] leading-[1.8] text-(--color-muted-fg)">
                  We sent a password reset link to{" "}
                  <span className="text-(--color-fg) font-semibold">
                    {email.trim()}
                  </span>
                  .
                  <br />
                  It expires in 15 minutes.
                </p>
              </div>
              <div className="fp-in flex flex-col gap-3">
                <p className="font-mono text-[11px] leading-[1.75] text-(--color-muted-fg)">
                  Didn&apos;t get it? Check your spam folder or{" "}
                  <button
                    type="button"
                    className="underline underline-offset-2 hover:text-(--color-fg) transition-colors"
                    onClick={() => {
                      setSent(false);
                      setLoading(false);
                    }}
                  >
                    try a different email
                  </button>
                  .
                </p>
                <Link
                  href="/login"
                  className="btn-ghost w-full justify-center group"
                >
                  Back to login
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form state ─────────────────────────────────────────────── */
  return (
    <div ref={ref} className="fp-root">
      <style>{PAGE_STYLES}</style>
      {leftPanel}

      {/* ── Right panel ─────────────────────────────────────── */}
      <div className="flex flex-col min-h-svh bg-(--color-bg) dot-grid">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-(--color-border)">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to login
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
            Reset password
          </span>
        </div>

        {/* Center — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-14">
          <div className="w-full max-w-sm flex flex-col gap-8">
            {/* Headline */}
            <div className="fp-in flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted-fg)">
                ✦ Password reset
              </p>
              <h1
                className="font-display italic leading-[0.95]"
                style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)" }}
              >
                Forgot your password?
              </h1>
              <p className="font-mono text-[12px] leading-[1.8] text-(--color-muted-fg)">
                No problem. Enter the email tied to your account and we&apos;ll
                send a reset link. Takes 30 seconds.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="fp-in flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={emailId}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)"
                >
                  Email address
                </label>
                <input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="you@example.com"
                  className="fp-input"
                  aria-invalid={!!error}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
                {error && (
                  <p
                    className="font-mono text-[10px]"
                    style={{ color: "#ef4444" }}
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending link…
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Back to login */}
            <div className="fp-in -mt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors group"
              >
                <ArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Return to login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom — mobile legal */}
        <div className="px-6 py-5 border-t border-(--color-border) md:hidden">
          <p className="font-mono text-[10px] leading-[1.7] text-(--color-muted-fg)">
            Questions?{" "}
            <Link
              href="mailto:help@icons.studio"
              className="underline underline-offset-2 hover:text-(--color-fg) transition-colors"
            >
              help@icons.studio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
