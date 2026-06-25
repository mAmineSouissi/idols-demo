import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { IconsLogo, StarMark } from "@/components/shared/IconsLogo";
import { useAuthStore } from "@/stores/auth.store";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);
  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);
  if (!mounted) return <div className="w-9 h-9" />;
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => {
        setSpinning(true);
        setTheme(isDark ? "light" : "dark");
        setTimeout(() => setSpinning(false), 400);
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-(--color-fg) cursor-pointer transition-colors duration-200"
      style={{
        background: isDark ? "var(--color-accent)" : "transparent",
        color: isDark ? "#000" : "var(--color-fg)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s",
          transform: spinning ? "rotate(180deg) scale(0.5)" : "rotate(0deg) scale(1)",
          opacity: spinning ? 0 : 1,
        }}
      >
        {isDark ? <Sun className="w-3.5 h-3.5" strokeWidth={2.5} /> : <Moon className="w-3.5 h-3.5" strokeWidth={2.5} />}
      </span>
    </button>
  );
}

const NAV_LINKS = [
  { label: "Talents",  href: "/talents" },
  { label: "Brands",   href: "/brands"   },
  { label: "Pricing",  href: "/pricing"  },
  { label: "About",    href: "/about"    },
  { label: "Blog",     href: "/blog"     },
  { label: "Contact",  href: "/contact"  },
];

const TICKER = [
  "✦ now casting · summer drops",
  "✦ 1,240 talents online · creators · musicians · dancers",
  "✦ paid in 48h · no agency",
  "✦ apply in 60 seconds",
];

const Header = () => {
  const router = useRouter();
  const headerRef = React.useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Auth state from the NextAuth-backed store. `mounted` guards against an
  // SSR/CSR mismatch (the persisted store hydrates on the client).
  const authStatus = useAuthStore((s) => s.status);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const loggedIn = mounted && authStatus === "authenticated";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    const handle = () => setMobileOpen(false);
    router.events.on("routeChangeStart", handle);
    return () => router.events.off("routeChangeStart", handle);
  }, [router.events]);

  // Idle wiggles only — no entrance so header is never hidden.
  useGSAP(
    () => {
      gsap.to(".hdr-ticker-track", {
        xPercent: -50,
        duration: 32,
        ease: "linear",
        repeat: -1,
      });

      gsap.to(".hdr-cta-star", {
        rotate: 14,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: headerRef },
  );

  const tickerItems = Array.from({ length: 3 }).flatMap((_, i) =>
    TICKER.map((t, j) => (
      <span
        key={`${i}-${j}`}
        className="inline-flex items-center gap-3 px-5 font-mono text-[10px] tracking-[0.32em] uppercase whitespace-nowrap"
      >
        {t}
      </span>
    )),
  );

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-50">
      {/* ── Top ticker strip ───────────────────────────────────────── */}
      <div
        className={cn(
          "hdr-ticker overflow-hidden border-b-2 border-(--color-fg) transition-all duration-300",
          scrolled ? "h-0 opacity-0" : "h-7 opacity-100",
        )}
        style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
      >
        <div className="hdr-ticker-track flex items-center h-full w-max">
          {tickerItems}
          {tickerItems}
        </div>
      </div>

      {/* ── Main nav bar ───────────────────────────────────────────── */}
      <div
        className={cn(
          "transition-all duration-300 px-3 md:px-6",
          scrolled ? "pt-3" : "pt-4",
        )}
      >
        <div
          className={cn(
            "hdr-bar mx-auto max-w-7xl flex items-center justify-between gap-3 rounded-full border-2 border-(--color-fg) transition-all duration-300",
            scrolled ? "py-1.5 pl-2 pr-1.5" : "py-2 pl-3 pr-2",
          )}
          style={{
            background: "var(--bg)",
            boxShadow: "5px 5px 0 0 var(--fg)",
          }}
        >
          {/* Logo lockup */}
          <Link
            href="/"
            className="hdr-item hdr-logo group inline-flex items-center gap-2 pl-1 pr-3 shrink-0"
            aria-label="Icons home"
          >
            <IconsLogo size={scrolled ? 30 : 34} />
            <span
              className="hidden md:inline-flex items-center gap-1.5 ml-1 px-2 py-0.5 rounded-full border-[1.5px] border-(--color-fg) font-mono text-[9px] tracking-[0.3em] uppercase"
              style={{ background: "var(--accent)" }}
            >
              ✦ talent · 2026
            </span>
          </Link>

          {/* Center nav — DM Mono sticker chips */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item, i) => {
              const isActive = router.pathname === item.href;
              return (
                <div key={item.href} className="flex items-center">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="px-1 opacity-50 font-mono text-[10px]"
                    >
                      ✦
                    </span>
                  )}
                  <Link
                    href={item.href}
                    className={cn(
                      "hdr-item relative px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-[0.22em] uppercase font-semibold border-[1.5px] transition-all duration-200",
                      isActive
                        ? "border-(--color-fg) text-(--color-fg)"
                        : "border-transparent text-(--color-fg) hover:border-(--color-fg)",
                    )}
                    style={
                      isActive
                        ? {
                            background: "var(--accent)",
                            boxShadow: "2px 2px 0 0 var(--fg)",
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">

            {/* Theme toggle — always visible */}
            <ThemeToggle />

            {/* Demo shortcut — only when not logged in */}
            {!loggedIn && (
              <Link
                href="/demo"
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full border border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors duration-150"
              >
                Try demo
              </Link>
            )}

            {/* Log in */}
            <Link href="/login" className="hdr-login-btn">
              Log in
              <span className="hdr-login-icon">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Apply now */}
            <Link
              href="/contact"
              className="hdr-cta hidden md:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-(--color-fg) text-(--color-bg) text-[12px] font-bold tracking-[0.05em] uppercase border-2 border-(--color-fg) hover:bg-(--color-accent) hover:text-(--color-fg) transition-colors group"
              style={{ boxShadow: "3px 3px 0 0 var(--color-fg)" }}
            >
              <span className="hdr-cta-star inline-flex">
                <StarMark size={16} fill="oklch(0.7823 0.0488 220.2338)" outline="#0a0a0a" />
              </span>
              Apply now
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-(--color-accent) text-(--color-fg) border-[1.5px] border-(--color-bg) group-hover:bg-(--color-fg) group-hover:text-(--color-bg) transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-(--color-fg) text-(--color-fg) cursor-pointer bg-(--color-accent)"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              style={{ boxShadow: "2px 2px 0 0 var(--color-fg)" }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-opacity duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 dot-grid"
          style={{ background: "var(--bg)" }}
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative h-full flex flex-col justify-between px-6 pt-28 pb-10 max-w-7xl mx-auto">
          {/* Close button — sticker style, top-right of the open panel */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-(--color-fg) text-(--color-bg) text-[11px] font-bold tracking-[0.18em] uppercase border-2 border-(--color-fg) hover:bg-(--color-accent-2) transition-colors group"
            style={{ boxShadow: "3px 3px 0 0 var(--accent)" }}
          >
            Close
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-(--color-accent) text-(--color-fg) border-[1.5px] border-(--color-bg) group-hover:rotate-90 transition-transform duration-200">
              <X className="w-3.5 h-3.5" />
            </span>
          </button>

          <div>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase mb-8 opacity-70">
              ✦ menu · 06 items
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((item, i) => {
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group inline-flex items-center justify-between gap-4 py-2 transition-all duration-300",
                      isActive ? "text-(--color-fg)" : "text-(--color-fg)",
                    )}
                    style={{
                      transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : "0ms",
                      transform: mobileOpen ? "translateY(0)" : "translateY(24px)",
                      opacity: mobileOpen ? 1 : 0,
                      transitionProperty: "transform, opacity, color",
                    }}
                  >
                    <span className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display italic text-5xl leading-none tracking-[-0.03em]",
                        "group-hover:translate-x-2 transition-transform duration-300",
                      )}
                    >
                      {item.label}.
                    </span>
                    {isActive ? (
                      <StarMark size={28} fill="oklch(0.7823 0.0488 220.2338)" outline="#0a0a0a" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-8 border-t-2 border-(--color-fg) flex items-center justify-between gap-4">
            <Link
              href="/login"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors"
            >
              Log in
            </Link>
            <div className="flex items-center gap-3">
              {!loggedIn && (
                <Link href="/demo" className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-2 rounded-full border-2 border-(--color-fg) hover:bg-(--color-fg) hover:text-(--color-bg) transition-colors">
                  Try demo
                </Link>
              )}
              <Link href="/contact" className="btn-primary">
                Apply now
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
