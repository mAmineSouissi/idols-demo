import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowUp,
  Instagram,
  Youtube,
  Music,
  Twitch,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkle } from "@/components/ui/Sparkle";

gsap.registerPlugin(ScrollTrigger);

const SITEMAP = [
  { label: "Home", href: "/" },
  { label: "Talents", href: "/talents" },
  { label: "Brands", href: "/brands" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Demo", href: "/demo" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const SOCIALS = [
  { label: "TikTok", href: "https://tiktok.com/@icons", Icon: Music },
  { label: "Instagram", href: "https://instagram.com/icons", Icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@icons", Icon: Youtube },
  { label: "Twitch", href: "https://twitch.tv/icons", Icon: Twitch },
];

export const Footer = () => {
  const ref     = useRef<HTMLElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  const [showFloatTop, setShowFloatTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloatTop(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useGSAP(
    () => {
      gsap.from(".foot-wordmark .foot-letter", {
        yPercent: 110,
        opacity: 0,
        rotate: 8,
        duration: 0.7,
        ease: "back.out(1.6)",
        stagger: 0.05,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      gsap.from(".foot-row", {
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });

      gsap.to(".foot-marquee-track", {
        xPercent: -50,
        duration: 28,
        ease: "linear",
        repeat: -1,
      });

      if (starRef.current) {
        gsap.to(starRef.current, {
          rotate: 18,
          duration: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    },
    { scope: ref },
  );

  const marqueeItems = Array.from({ length: 8 }).flatMap((_, i) => [
    <span
      key={`w-${i}`}
      className="font-display italic text-[clamp(3rem,9vw,8rem)] leading-none tracking-[-0.04em] whitespace-nowrap"
    >
      icons
    </span>,
    <Sparkle
      key={`s-${i}`}
      size={48}
      fill="var(--accent4)"
      strokeWidth={6}
      className="shrink-0"
    />,
  ]);

  return (
    <>
      <footer
        ref={ref}
        className="relative bg-(--color-fg) text-(--color-bg) overflow-hidden"
      >
        {/* ── Marquee ────────────────────────────────────────────── */}
        <div className="border-y-2 border-(--color-bg) overflow-hidden py-5">
          <div className="foot-marquee-track flex items-center gap-10 w-max">
            {marqueeItems}
            {marqueeItems}
          </div>
        </div>

        {/* ── Top row: CTA headline + Apply button ───────────────── */}
        <div className="foot-row max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3 min-w-0">
            <span className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-70">
              ✦ ready · steady · post ✦
            </span>
            <h3 className="font-display italic text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.03em]">
              Got the vibe? Slide in.
            </h3>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-(--color-accent) text-(--color-fg) text-sm font-bold border-2 border-(--color-bg) hover:bg-(--color-accent-4) transition-colors"
            style={{ boxShadow: "4px 4px 0 0 var(--bg)" }}
          >
            Apply now
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-(--color-fg) text-(--color-bg)">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* ── Sitemap row ────────────────────────────────────────── */}
        <div className="foot-row max-w-7xl mx-auto px-6 md:px-12 py-5 border-t-2 border-(--color-bg)/20 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase opacity-60 shrink-0">
            ✦ sitemap
          </span>
          <nav aria-label="Sitemap" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {SITEMAP.map((n, i) => (
              <span key={n.href} className="inline-flex items-center gap-5">
                <Link
                  href={n.href}
                  className="font-mono text-xs tracking-[0.22em] uppercase font-semibold hover:text-(--color-accent) transition-colors"
                >
                  {n.label}
                </Link>
                {i < SITEMAP.length - 1 && (
                  <span aria-hidden className="opacity-40 text-xs">
                    ✦
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* ── Socials + contact row ──────────────────────────────── */}
        <div className="foot-row max-w-7xl mx-auto px-6 md:px-12 py-5 border-t-2 border-(--color-bg)/20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase opacity-60 shrink-0 mr-1">
              ✦ follow
            </span>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-(--color-bg) text-(--color-bg) hover:bg-(--color-accent) hover:text-(--color-fg) transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>

          <a
            href="mailto:hi@icons.studio"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-(--color-bg)/30 text-(--color-bg) hover:border-(--color-bg) hover:bg-(--color-bg)/10 transition-colors font-mono text-xs tracking-[0.18em] uppercase"
          >
            <Mail className="w-3.5 h-3.5" />
            hi@icons.studio
          </a>
        </div>

        {/* ── Bottom bar: copyright · legal · back-to-top ────────── */}
        <div className="foot-row max-w-7xl mx-auto px-6 md:px-12 py-4 border-t-2 border-(--color-bg)/20 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase opacity-60 order-1">
            © 2026 icons · all rights, no chills
          </span>

          <ul className="flex items-center gap-5 font-mono text-[10px] tracking-[0.24em] uppercase opacity-60 order-3 md:order-2">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:opacity-100 hover:text-(--color-accent) transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 pl-3 pr-1.5 py-1 rounded-full border-2 border-(--color-bg) text-(--color-bg) font-mono text-[10px] tracking-[0.28em] uppercase hover:bg-(--color-bg) hover:text-(--color-fg) transition-colors cursor-pointer order-2 md:order-3"
          >
            Top
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-(--color-accent) text-(--color-fg) border-2 border-(--color-bg) group-hover:rotate-12 transition-transform">
              <ArrowUp className="w-3 h-3" strokeWidth={3} />
            </span>
          </button>
        </div>

        {/* ── Wordmark signature ─────────────────────────────────── */}
        <div className="foot-wordmark text-center pt-6 pb-10 px-6">
          <div className="font-display italic text-[clamp(4rem,18vw,16rem)] leading-[0.85] tracking-[-0.04em] flex items-center justify-center overflow-hidden">
            <span className="foot-letter inline-block">I</span>
            <span className="foot-letter inline-block">C</span>
            <span className="foot-letter inline-block mx-1 -translate-y-2">
              <Sparkle size={120} fill="var(--accent4)" strokeWidth={6} />
            </span>
            <span className="foot-letter inline-block">N</span>
            <span className="foot-letter inline-block">S</span>
          </div>
        </div>
      </footer>

      {/* ── Floating "back to top" — appears once scrolled past hero ── */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`group fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-(--color-fg) bg-(--color-accent) text-(--color-fg) cursor-pointer transition-all duration-300 ${
          showFloatTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ boxShadow: "3px 3px 0 0 var(--fg)" }}
      >
        <span ref={starRef} className="foot-top-star absolute -top-2 -right-2 pointer-events-none">
          <Sparkle size={20} fill="var(--accent4)" stroke="var(--fg)" strokeWidth={8} />
        </span>
        <ArrowUp
          className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5"
          strokeWidth={3}
        />
      </button>
    </>
  );
};
