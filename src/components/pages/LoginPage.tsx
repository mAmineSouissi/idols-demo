import { useState, useRef, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ease } from "@/lib/motion";

/* ────────────────────────────────────────────────────────────── */
/* STYLES                                                         */
/* ────────────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  /* ── Split layout ─────────────── */
  .lg-root {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100svh;
  }
  @media (min-width: 768px) {
    .lg-root {
      grid-template-columns: 420px 1fr;
    }
  }
  @media (min-width: 1024px) {
    .lg-root {
      grid-template-columns: 500px 1fr;
    }
  }
  /* ── Left panel ───────────────── */
  .lg-left {
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
    .lg-left {
      display: flex;
    }
  }
  /* ── Stats cells ──────────────── */
  .lg-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    overflow: hidden;
  }
  .lg-stat-cell {
    background: var(--color-fg);
    padding: 1.25rem;
  }
  /* ── Form field ───────────────── */
  .lg-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .lg-input {
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
  .lg-input::placeholder {
    color: color-mix(in srgb, var(--color-fg) 30%, transparent);
  }
  .lg-input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 15%, transparent);
  }
  .lg-input[aria-invalid="true"] {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
  }
  /* ── Mode toggle ──────────────── */
  .lg-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: var(--color-panel);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 3px;
    overflow: hidden;
  }
  .lg-toggle-btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    border: none;
    background: transparent;
    color: color-mix(in srgb, var(--color-fg) 50%, transparent);
  }
  .lg-toggle-btn[data-active="true"] {
    background: var(--color-fg);
    color: var(--color-bg);
  }
  /* ── Divider ──────────────────── */
  .lg-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .lg-divider::before,
  .lg-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--color-border);
  }
`;

/* ────────────────────────────────────────────────────────────── */
/* DATA                                                           */
/* ────────────────────────────────────────────────────────────── */

const leftStats = [
  { value: "10K+",  label: "Talents" },
  { value: "$12M+", label: "Paid out" },
  { value: "500+",  label: "Campaigns" },
  { value: "0%",    label: "Agency cut" },
];

const modeConfig = {
  creator: {
    headline: "Welcome back.",
    sub: "Log in to view your briefs, earnings, and campaign history.",
    signupLabel: "New to Icons?",
    signupLink: "/talents/apply",
    signupCta: "Apply to join",
    submitLabel: "Log in as talent",
  },
  brand: {
    headline: "Back to work.",
    sub: "Log in to manage campaigns, review talent matches, and track performance.",
    signupLabel: "New brand?",
    signupLink: "/brief",
    signupCta: "Start a campaign",
    submitLabel: "Log in as brand",
  },
};

/* ────────────────────────────────────────────────────────────── */
/* COMPONENT                                                      */
/* ────────────────────────────────────────────────────────────── */

type Mode = "creator" | "brand";
type FormState = { email: string; password: string };
type Errors    = Partial<Record<keyof FormState, string>>;

export default function LoginPage() {
  const ref      = useRef<HTMLDivElement>(null);
  const router   = useRouter();
  const emailId  = useId();
  const passId   = useId();

  const [mode,      setMode]      = useState<Mode>("creator");
  const [form,      setForm]      = useState<FormState>({ email: "", password: "" });
  const [errors,    setErrors]    = useState<Errors>({});
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [done,      setDone]      = useState(false);

  const config = modeConfig[mode];

  /* ── Entrance animation ─────────────────────────────────── */
  useGSAP(() => {
    gsap.fromTo(".lg-in",
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: ease.out, stagger: 0.07, delay: 0.1 },
    );
  }, { scope: ref });

  /* ── Validation ─────────────────────────────────────────── */
  function validate(): boolean {
    const e: Errors = {};
    if (!form.email.trim())                          e.email    = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password)                              e.password = "Password is required.";
    else if (form.password.length < 6)               e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ── Submit ─────────────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate auth round-trip then persist a mock session
    await new Promise((r) => setTimeout(r, 1400));
    localStorage.setItem("icons-session", JSON.stringify({ role: mode }));
    router.push(`/dashboard?as=${mode}`);
  }

  /* ── Success screen ─────────────────────────────────────── */
  if (done) {
    return (
      <div ref={ref} className="min-h-svh bg-(--color-bg) text-(--color-fg) flex items-center justify-center px-6">
        <style>{PAGE_STYLES}</style>
        <div className="flex flex-col items-center text-center gap-6 max-w-sm">
          <Sparkle size={48} fill="var(--color-accent)" className="-rotate-12" />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted-fg) mb-3">✦ Logged in</p>
            <h1 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2.5rem,6vw,4rem)" }}>
              You&apos;re in.
            </h1>
          </div>
          <p className="font-mono text-[12px] leading-[1.8] text-(--color-muted-fg)">
            Redirecting to your {mode === "creator" ? "talent dashboard" : "brand dashboard"}…
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] text-(--color-muted-fg)">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Loading workspace
          </div>
        </div>
      </div>
    );
  }

  /* ── Main form ──────────────────────────────────────────── */
  return (
    <div ref={ref} className="lg-root">
      <style>{PAGE_STYLES}</style>

      {/* ── Left panel — editorial dark ─────────────────── */}
      <div className="lg-left">
        {/* Watermark */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display italic leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem,18vw,16rem)", color: "rgba(255,255,255,0.04)", zIndex: 0 }}
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
          <span className="font-display italic text-2xl leading-none" style={{ color: "var(--color-bg)" }}>Icons</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.35)" }}>Studio</span>
        </div>

        {/* Middle — headline + quote */}
        <div className="relative flex flex-col gap-6" style={{ zIndex: 1 }}>
          <h2
            className="font-display italic leading-[1.0]"
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)", color: "var(--color-bg)" }}
          >
            The platform that<br />works for talent,<br />not against them.
          </h2>
          <div
            className="font-mono text-[11px] leading-[1.8]"
            style={{ color: "color-mix(in srgb, var(--color-bg) 55%, transparent)" }}
          >
            0% commission. Briefs in 48h.<br />Payouts in 48h. No middlemen.
          </div>
          {/* Stats mini-grid */}
          <div className="lg-stats mt-2">
            {leftStats.map((s) => (
              <div key={s.label} className="lg-stat-cell">
                <p
                  className="font-display italic leading-none mb-1"
                  style={{ fontSize: "clamp(1.4rem,2vw,1.9rem)", color: "var(--color-accent)" }}
                >
                  {s.value}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — legal note */}
        <p
          className="relative font-mono text-[10px] leading-[1.7]"
          style={{ color: "rgba(255,255,255,0.28)", zIndex: 1 }}
        >
          © Icons Studio, Inc. · icons.studio<br />
          By logging in you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-white transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">Privacy Policy</Link>.
        </p>
      </div>

      {/* ── Right panel — form ──────────────────────────── */}
      <div className="flex flex-col min-h-svh bg-(--color-bg) dot-grid">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-(--color-border)">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Icons
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
            Log in
          </span>
        </div>

        {/* Center — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-14">
          <div className="w-full max-w-sm flex flex-col gap-8">

            {/* Headline */}
            <div className="lg-in flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted-fg)">
                ✦ Welcome back
              </p>
              <h1 className="font-display italic leading-[0.95]" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)" }}>
                {config.headline}
              </h1>
              <p className="font-mono text-[12px] leading-[1.8] text-(--color-muted-fg)">
                {config.sub}
              </p>
            </div>

            {/* Mode toggle */}
            <div className="lg-in">
              <div className="lg-toggle" role="group" aria-label="Account type">
                <button
                  type="button"
                  className="lg-toggle-btn"
                  data-active={mode === "creator" ? "true" : "false"}
                  onClick={() => { setMode("creator"); setErrors({}); }}
                >
                  Talent
                </button>
                <button
                  type="button"
                  className="lg-toggle-btn"
                  data-active={mode === "brand" ? "true" : "false"}
                  onClick={() => { setMode("brand"); setErrors({}); }}
                >
                  Brand
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="lg-in flex flex-col gap-5">

              {/* Email */}
              <div className="lg-field">
                <label htmlFor={emailId} className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
                  Email
                </label>
                <input
                  id={emailId}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="lg-input"
                  aria-invalid={!!errors.email}
                  value={form.email}
                  onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: undefined })); }}
                />
                {errors.email && (
                  <p className="font-mono text-[10px]" style={{ color: "#ef4444" }}>{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="lg-field">
                <div className="flex items-center justify-between">
                  <label htmlFor={passId} className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg)">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id={passId}
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="lg-input pr-10"
                    aria-invalid={!!errors.password}
                    value={form.password}
                    onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })); setErrors((er) => ({ ...er, password: undefined })); }}
                  />
                  <button
                    type="button"
                    aria-label={showPass ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-muted-fg) hover:text-(--color-fg) transition-colors"
                    onClick={() => setShowPass((v) => !v)}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="font-mono text-[10px]" style={{ color: "#ef4444" }}>{errors.password}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in…
                  </>
                ) : (
                  <>
                    {config.submitLabel}
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="lg-in lg-divider">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--color-muted-fg) whitespace-nowrap">
                No account?
              </span>
            </div>

            {/* Sign up CTA */}
            <div className="lg-in flex flex-col gap-3 -mt-2">
              <p className="font-mono text-[11px] leading-[1.75] text-(--color-muted-fg)">
                {config.signupLabel}
              </p>
              <Link href={config.signupLink} className="btn-ghost w-full justify-center group">
                {config.signupCta}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom — mobile legal */}
        <div className="px-6 py-5 border-t border-(--color-border) md:hidden">
          <p className="font-mono text-[10px] leading-[1.7] text-(--color-muted-fg)">
            By logging in you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-(--color-fg) transition-colors">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-(--color-fg) transition-colors">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
