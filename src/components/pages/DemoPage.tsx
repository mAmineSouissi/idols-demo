"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowUpRight, Zap, Star, BookOpen, Users, FileText, LayoutDashboard } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { IconsLogo } from "@/components/shared/IconsLogo";

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  .demo-root {
    min-height: 100svh;
    background: var(--color-bg);
    color: var(--color-fg);
    display: flex;
    flex-direction: column;
  }

  /* Two-path cards grid */
  .demo-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  @media (min-width: 768px) {
    .demo-cards { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  }

  /* Each path card */
  .demo-card {
    position: relative;
    border-radius: 20px;
    border: 2px solid var(--color-fg);
    padding: 2.5rem 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    box-shadow: 6px 6px 0 0 var(--color-fg);
  }
  .demo-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 0 var(--color-fg);
  }
  .demo-card:active {
    transform: translate(0, 0);
    box-shadow: 4px 4px 0 0 var(--color-fg);
  }
  .demo-card-brand { background: var(--color-accent); }
  .demo-card-creator { background: var(--color-fg); color: var(--color-bg); }

  /* Explore links */
  .demo-explore-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  @media (min-width: 640px) {
    .demo-explore-grid { grid-template-columns: repeat(4, 1fr); }
  }

  .demo-explore-link {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.25rem;
    border: 1.5px solid var(--color-border);
    border-radius: 14px;
    transition: border-color 0.15s, background 0.15s;
    text-decoration: none;
    color: var(--color-fg);
  }
  .demo-explore-link:hover {
    border-color: var(--color-fg);
    background: var(--color-panel);
  }
`;

/* ─── Explore links data ─────────────────────────────────────────── */

const exploreLinks = [
  { href: "/talents",     Icon: Users,          label: "Creator roster",   sub: "Browse 10K+ profiles"    },
  { href: "/brief-builder",Icon: FileText,        label: "Brief builder",    sub: "Build a campaign"        },
  { href: "/blog",         Icon: BookOpen,        label: "The journal",      sub: "Creator & brand reads"   },
  { href: "/brands",       Icon: LayoutDashboard, label: "For brands",       sub: "How Icons works"         },
];

/* ─── Component ─────────────────────────────────────────────────── */

export default function DemoPage() {
  const router = useRouter();

  function enter(role: "brand" | "creator") {
    localStorage.setItem("icons-session", JSON.stringify({ role }));
    router.push("/dashboard");
  }

  return (
    <div className="demo-root dot-grid">
      <style>{PAGE_STYLES}</style>

      {/* ── Top bar ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-(--color-border)"
        style={{ background: "var(--color-bg)" }}>
        <Link href="/" className="inline-flex items-center gap-2 group">
          <IconsLogo size={28} />
        </Link>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full"
          style={{ background: "var(--color-accent)", color: "rgba(0,0,0,0.75)", border: "1.5px solid var(--color-fg)" }}
        >
          ✦ Demo mode
        </span>
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 md:py-20">
        <div className="w-full max-w-3xl flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-(--color-muted-fg)">
              ✦ Interactive prototype
            </p>
            <h1
              className="font-display italic leading-[0.92] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              Try it yourself.
            </h1>
            <p className="font-mono text-[13px] leading-[1.8] text-(--color-muted-fg) max-w-md mx-auto">
              Pick a role and enter the live demo. No sign-up, no password — one click.
            </p>
          </div>

          {/* Two-path cards */}
          <div className="demo-cards">

            {/* Brand path */}
            <button onClick={() => enter("brand")} className="demo-card demo-card-brand text-left group">
              {/* Watermark */}
              <span
                aria-hidden
                className="absolute -right-4 -bottom-6 font-display italic leading-none select-none pointer-events-none"
                style={{ fontSize: "8rem", opacity: 0.12, color: "rgba(0,0,0,0.9)" }}
              >
                B
              </span>

              <div className="relative z-10 flex flex-col gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.12)" }}
                >
                  <Zap className="w-5 h-5" style={{ color: "rgba(0,0,0,0.7)" }} />
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "rgba(0,0,0,0.5)" }}>
                    For brands
                  </p>
                  <h2 className="font-display italic text-3xl md:text-4xl leading-tight" style={{ color: "rgba(0,0,0,0.85)" }}>
                    Run a campaign
                  </h2>
                </div>

                <ul className="flex flex-col gap-1.5">
                  {["Build a brief in 5 steps", "Browse creator matches", "Track campaign status"].map((item) => (
                    <li key={item} className="font-mono text-[11px] tracking-wide flex items-center gap-2" style={{ color: "rgba(0,0,0,0.6)" }}>
                      <span style={{ color: "rgba(0,0,0,0.4)" }}>✦</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "rgba(0,0,0,0.7)" }}>
                  Enter brand dashboard
                </span>
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ background: "rgba(0,0,0,0.12)" }}
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: "rgba(0,0,0,0.7)" }} />
                </span>
              </div>
            </button>

            {/* Creator path */}
            <button onClick={() => enter("creator")} className="demo-card demo-card-creator text-left group">
              {/* Watermark */}
              <span
                aria-hidden
                className="absolute -right-4 -bottom-6 font-display italic leading-none select-none pointer-events-none"
                style={{ fontSize: "8rem", opacity: 0.07, color: "var(--color-bg)" }}
              >
                C
              </span>

              <div className="relative z-10 flex flex-col gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <Star className="w-5 h-5" style={{ color: "rgba(255,255,255,0.7)" }} />
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    For creators
                  </p>
                  <h2 className="font-display italic text-3xl md:text-4xl leading-tight" style={{ color: "var(--color-bg)" }}>
                    Get booked
                  </h2>
                </div>

                <ul className="flex flex-col gap-1.5">
                  {["Browse brand briefs", "Manage your profile", "Track earnings & payouts"].map((item) => (
                    <li key={item} className="font-mono text-[11px] tracking-wide flex items-center gap-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>✦</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Enter creator dashboard
                </span>
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <ArrowUpRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.6)" }} />
                </span>
              </div>
            </button>
          </div>

          {/* Explore without logging in */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-(--color-muted-fg) whitespace-nowrap">
                Or explore without logging in
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
            </div>

            <div className="demo-explore-grid">
              {exploreLinks.map(({ href, Icon, label, sub }) => (
                <Link key={href} href={href} className="demo-explore-link group">
                  <Icon className="w-4 h-4 text-(--color-muted-fg) group-hover:text-(--color-accent) transition-colors duration-150" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--color-fg)" }}>
                      {label}
                    </p>
                    <p className="font-mono text-[10px]" style={{ color: "var(--color-muted-fg)" }}>
                      {sub}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer note ────────────────────────────────────────── */}
      <div className="px-6 py-5 border-t border-(--color-border) flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="font-mono text-[10px] text-(--color-muted-fg) uppercase tracking-[0.18em]">
          Demo · No real data · All actions are local
        </p>
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors self-start sm:self-auto whitespace-nowrap">
          <Sparkle size={12} fill="var(--color-accent)" className="opacity-60 shrink-0" />
          Back to site
        </Link>
      </div>
    </div>
  );
}
