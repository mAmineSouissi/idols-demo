import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { useEntrance, useIdleLoop, useWordReveal } from "@/hooks/animations";
import { dur } from "@/lib/motion";

export const WhyGenZ = () => {
  const ref = React.useRef<HTMLElement>(null);

  // Headline: per-word reveal (rotate mode = original feel)
  useWordReveal({
    scope: ref,
    selector: ".why-headline",
    mode: "rotate",
    y: 48,
    rotate: 6,
    duration: dur.slow,
    scrollTrigger: { start: "top 70%" },
  });

  // Eyebrow slide
  useEntrance({
    scope: ref,
    selector: ".why-eyebrow",
    x: -20,
    duration: dur.fast + 0.15,
    scrollTrigger: { start: "top 75%" },
  });

  // Body + CTA fade-up
  useEntrance({
    scope: ref,
    selector: ".why-body",
    y: 30,
    duration: dur.base + 0.1,
    ease: "power2.out",
    scrollTrigger: { start: "top 60%" },
  });

  // Big star pop
  useEntrance({
    scope: ref,
    selector: ".why-star",
    scale: 0,
    rotate: -180,
    duration: dur.slow,
    ease: "back.out(1.8)",
    scrollTrigger: { start: "top 60%" },
    // The idle loop wants its own baseline transform — let it drive
    // the rotate/y after entrance settles.
    clearProps: true,
  });

  // Idle star wobble
  useIdleLoop({
    scope: ref,
    selector: ".why-star",
    rotate: "+=8",
    y: "+=12",
    duration: 3,
  });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 overflow-hidden bracket-frame"
      style={{ background: "var(--accent)", color: "var(--fg)" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="why-headline font-display italic text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-5xl">
          Authenticity is the only ad format that scales.
        </h2>

        <p className="why-body mt-12 max-w-3xl text-lg md:text-xl leading-relaxed font-sans">
          Gen-Z skips every ad that feels like an ad. Icons talent is already
          living inside the communities your brand wants to reach — their
          content pulls 4.5× more engagement than studio-produced video, at a
          fraction of the cost. No set, no script, no agency markup. Just real
          people who actually use the product.
        </p>

        <div className="why-body mt-10 flex flex-wrap gap-4">
          <Link href="/brands" className="btn-primary">
            Start a campaign
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href="/talents"
            className="btn-ghost"
            style={{ borderColor: "var(--fg)", color: "var(--fg)" }}
          >
            Join as talent
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Big star, bottom-right corner */}
      <div className="why-star absolute bottom-12 right-12 md:bottom-16 md:right-20 pointer-events-none">
        <Sparkle
          size={160}
          fill="var(--accent4)"
          stroke="var(--fg)"
          strokeWidth={5}
        />
      </div>
    </section>
  );
};
