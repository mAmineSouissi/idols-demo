import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { useEntrance, useIdleLoop } from "@/hooks/animations";
import { dur, stagger } from "@/lib/motion";

export const CtaSticker = () => {
  const ref = useRef<HTMLElement>(null);

  // Entrance: big card pops in
  useEntrance({
    scope: ref,
    selector: ".cta-card",
    y: 60,
    scale: 0.9,
    rotate: -3,
    duration: dur.slow,
    ease: "back.out(1.6)",
    scrollTrigger: { start: "top 75%" },
  });

  // Entrance: side sparkles spin in
  useEntrance({
    scope: ref,
    selector: ".cta-side",
    scale: 0,
    rotate: -90,
    duration: dur.base + 0.1,
    ease: "back.out(2)",
    stagger: stagger.wide,
    scrollTrigger: { start: "top 70%" },
  });

  return (
    <section
      ref={ref}
      className="relative py-16 px-8 md:px-12 dot-grid overflow-hidden bracket-frame"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Floating sparkles */}
        <Sparkle
          size={64}
          fill="var(--accent2)"
          className="cta-side absolute -top-6 -left-4 md:-left-12 -rotate-12"
        />
        <Sparkle
          size={56}
          fill="var(--accent3)"
          className="cta-side absolute -bottom-6 -right-4 md:-right-12 rotate-12"
        />
        <Sparkle
          size={44}
          fill="var(--accent4)"
          className="cta-side absolute top-1/3 -right-6 md:-right-20 rotate-6 hidden md:block"
        />

        <div
          className="cta-card sticker p-10 md:p-16 text-center flex flex-col items-center gap-6"
          data-tone="ink"
        >
          <div className="font-mono text-[11px] tracking-[0.32em] uppercase flex items-center gap-2 opacity-60">
            <span>✦</span>
            <span>ready when you are</span>
            <span>✦</span>
          </div>

          <h2 className="font-display italic text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.03em]">
            be the&nbsp;
            <span className="inline-block align-baseline -translate-y-1">
              <Sparkle size={86} fill="var(--accent)" strokeWidth={6} />
            </span>
            &nbsp;icon.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 mt-2">
            <div className="text-center">
              <p className="font-script text-2xl md:text-3xl">— for creators</p>
              <p
                className="font-mono text-[14px] tracking-[0.22em] uppercase mt-1"
                style={{ opacity: 0.6 }}
              >
                apply in 60 seconds
              </p>
            </div>
            <div
              className="hidden sm:block w-px h-12 self-center"
              style={{ background: "var(--bg)", opacity: 0.2 }}
            />
            <div className="text-center">
              <p className="font-script text-2xl md:text-3xl">— for brands</p>
              <p
                className="font-mono text-[14px] tracking-[0.22em] uppercase mt-1"
                style={{ opacity: 0.6 }}
              >
                brief to live in 48h, no agency markup
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/talents" className="btn-primary">
              Join as talent
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/brands"
              className="btn-ghost"
              style={{
                background: "transparent",
                color: "var(--bg)",
                borderColor: "var(--bg)",
                boxShadow: "4px 4px 0 0 var(--accent)",
              }}
            >
              Post a brief
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
