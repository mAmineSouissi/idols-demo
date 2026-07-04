import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { Sparkle } from "@/components/ui/Sparkle";
import { useTimelineEntrance } from "@/hooks/animations";

interface HeroCampaignProps {
  ready?: boolean;
}

export const HeroCampaign = ({ ready = true }: HeroCampaignProps) => {
  const { ref } = useTimelineEntrance<HTMLElement>(
    ({ tl }) => {
      const heroEls =
        ".hero-mono, .hero-card, .hero-letter, .hero-star, .hero-star-glow, .hero-script, .hero-cta, .hero-floater";
      gsap.set(heroEls, { opacity: 0 });

      // ── Entrance sequence ──────────────────────────────────────
      tl.fromTo(
        ".hero-mono",
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
        .fromTo(
          ".hero-card",
          { opacity: 0, scale: 0.9, rotate: -3, y: 40 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        )
        .fromTo(
          ".hero-letter",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "back.out(2)",
            stagger: 0.06,
          },
          "-=0.5",
        )
        .fromTo(
          ".hero-star",
          { opacity: 0, scale: 0, rotate: -180 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            ease: "back.out(2)",
          },
          "-=0.35",
        )
        .fromTo(
          ".hero-star-glow",
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero-script",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .fromTo(
          ".hero-floater",
          { opacity: 0, scale: 0, rotate: -90 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(2)",
            stagger: 0.1,
          },
          "-=0.8",
        );

      // ── Post-entrance: star personality + twinkles ────────────
      tl.add(() => {
        // Slow infinite spin
        gsap.to(".hero-star-spin", {
          rotate: 360,
          duration: 14,
          ease: "none",
          repeat: -1,
        });
        // Breathing pulse on the wrapper
        gsap.to(".hero-star", {
          scale: 1.08,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        // Halo breath
        gsap.to(".hero-star-glow", {
          scale: 1.25,
          opacity: 0.6,
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        // Periodic twinkle bursts
        gsap
          .timeline({ repeat: -1, repeatDelay: 2.4 })
          .to(".hero-twinkle", {
            opacity: 1,
            scale: 1,
            rotate: 90,
            duration: 0.35,
            ease: "back.out(2)",
            stagger: 0.08,
          })
          .to(".hero-twinkle", {
            opacity: 0,
            scale: 0.4,
            rotate: 180,
            duration: 0.4,
            ease: "power2.in",
            stagger: 0.08,
          });
      }, ">-0.1");

      // ── Post-entrance: floater wobble + card drift ────────────
      tl.add(() => {
        gsap.to(".hero-floater", {
          y: "+=14",
          rotate: "+=6",
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.3, from: "random" },
        });
        gsap.to(".hero-card", {
          rotate: "-=0.6",
          duration: 3.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { ready, dependencies: [] },
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 dot-grid overflow-hidden bracket-frame"
    >
      {/* Top eyebrow */}
      <div className="hero-mono absolute top-8 left-8 right-8 flex items-center justify-between font-mono text-[14px] tracking-[0.28em] uppercase opacity-50">
        <span>ugc creator platform</span>
        <span className="hidden sm:inline">est. 2026</span>
      </div>

      {/* Floater sparkles */}
      <Sparkle
        size={56}
        fill="var(--accent2)"
        className="hero-floater absolute top-[18%] left-[10%] -rotate-12"
      />
      <Sparkle
        size={44}
        fill="var(--accent)"
        className="hero-floater absolute top-[22%] right-[12%] rotate-6"
      />
      <Sparkle
        size={50}
        fill="var(--accent3)"
        className="hero-floater absolute bottom-[20%] left-[14%] rotate-12"
      />
      <Sparkle
        size={64}
        fill="var(--accent4)"
        className="hero-floater absolute bottom-[16%] right-[10%] -rotate-6"
      />

      {/* Main sticker card */}
      <div className="hero-card relative z-10 inline-flex flex-col items-center gap-6 max-w-3xl">
        {/* Tiny eyebrow inside */}
        <div className="font-mono text-[15px] tracking-[0.32em] uppercase text-(--color-fg) flex items-center gap-2 opacity-60">
          <span>✦</span>
          <span>where talent gets paid & brands get results</span>
          <span>✦</span>
        </div>

        {/* Wordmark */}
        <h1 className="font-display text-[clamp(5rem,16vw,12rem)] leading-[0.85] tracking-[-0.04em] italic flex items-center justify-center">
          <span className="hero-letter inline-block">I</span>
          <span className="hero-letter inline-block">C</span>
          <span className="hero-star relative inline-flex items-center justify-center mx-1 -translate-y-2 w-[120px] h-[120px] align-middle">
            {/* Soft halo behind the star */}
            <span
              aria-hidden
              className="hero-star-glow absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--accent4) 0%, var(--accent) 35%, transparent 70%)",
                filter: "blur(22px)",
                opacity: 0.45,
              }}
            />
            {/* Tiny twinkle dots that flash periodically */}
            <span
              aria-hidden
              className="hero-twinkle absolute -top-1 -left-2 w-2 h-2 rounded-full bg-white opacity-0"
              style={{ boxShadow: "0 0 8px 2px #ffffff" }}
            />
            <span
              aria-hidden
              className="hero-twinkle absolute top-2 -right-3 w-1.5 h-1.5 rounded-full bg-white opacity-0"
              style={{ boxShadow: "0 0 6px 2px #ffffff" }}
            />
            <span
              aria-hidden
              className="hero-twinkle absolute -bottom-1 left-3 w-1.5 h-1.5 rounded-full bg-white opacity-0"
              style={{ boxShadow: "0 0 6px 2px #ffffff" }}
            />
            {/* The star itself — spins continuously */}
            <span className="hero-star-spin relative inline-flex">
              <Sparkle size={120} fill="var(--accent4)" strokeWidth={6} />
            </span>
          </span>
          <span className="hero-letter inline-block">N</span>
          <span className="hero-letter inline-block">S</span>
        </h1>

        {/* Value proposition */}
        <p className="hero-script font-script text-2xl md:text-3xl text-(--color-fg) -mt-2 text-center max-w-lg">
          talent gets paid in 48h &middot; brands get content that converts
        </p>

        {/* Trust metrics */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[12px] tracking-[0.22em] uppercase opacity-55">
          <span>2,847 creators paid</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>143 brands</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span>$1.4M+ paid out</span>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/talents" className="hero-cta btn-primary">
            I&apos;m talent
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link href="/brands" className="hero-cta btn-ghost">
            I&apos;m a brand
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom mono caption */}
      <div className="hero-mono absolute bottom-8 left-8 right-8 flex items-center justify-between font-mono text-[11px] tracking-[0.28em] uppercase">
        <span>scroll ↓</span>
        <span className="hidden sm:inline">
          creators · brands · payments · analytics
        </span>
      </div>
    </section>
  );
};
