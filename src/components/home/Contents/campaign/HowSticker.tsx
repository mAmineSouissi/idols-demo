import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { useEntrance, useHorizontalPin, useIdleLoop } from "@/hooks/animations";
import { dur, ease } from "@/lib/motion";

type Step = {
  no: string;
  badge: string;
  title: string;
  intro: string;
  bullets: string[];
  scriptLine: string;
  bg: string;
  numberTint: string;
  bulletStroke: string;
  textColor: string;
  mediaBg: string;
  mediaStars: { fill: string; size: number; cls: string }[];
  mediaImage: { src: string; alt: string };
  mediaAccent: string;
};

const STEPS: Step[] = [
  {
    no: "01",
    badge: "Apply in 60 seconds",
    title: "Show us the vibe, skip the resume",
    intro:
      "Drop a clip, your handles, and the niche you live in. No portfolio drama — we read the vibe, not the bullet points.",
    bullets: [
      "One reel + your three best posts",
      "Your handles + the niche you live in",
      "Approved in under 48 hours",
    ],
    scriptLine: "— no portfolio needed, promise",
    bg: "oklch(0.7823 0.0488 220.2338)",
    numberTint: "#c8e4f5",
    bulletStroke: "#0a0a0a",
    textColor: "#0a0a0a",
    mediaBg: "#0a0a0a",
    mediaAccent: "oklch(0.7823 0.0488 220.2338)",
    mediaImage: {
      src: "/cards/apply_in_seconds.jpg",
      alt: "Apply in 60 seconds — vibe-first talent application",
    },
    mediaStars: [
      { fill: "#f5c518", size: 44, cls: "top-4 right-4 rotate-12" },
      {
        fill: "oklch(0.7823 0.0488 220.2338)",
        size: 34,
        cls: "bottom-16 left-4 -rotate-12",
      },
    ],
  },
  {
    no: "02",
    badge: "Get matched to brands",
    title: "Real briefs. Real rates. Public.",
    intro:
      "Our team pairs you with paid campaigns that actually fit your audience. You see the brief, the rate, the deadline — accept or skip.",
    bullets: [
      "Rates posted up-front, no DMs to negotiate",
      "Briefs hand-picked for your niche",
      "Skip anything that's not your vibe — zero penalty",
    ],
    scriptLine: "— your inbox, but make it lucrative",
    bg: "#ff3d8b",
    numberTint: "#ff9ec3",
    bulletStroke: "#0a0a0a",
    textColor: "#0a0a0a",
    mediaBg: "#0a0a0a",
    mediaAccent: "#ff3d8b",
    mediaImage: {
      src: "/cards/get_matched.webp",
      alt: "Get matched to brands — paid campaigns hand-picked for your niche",
    },
    mediaStars: [
      { fill: "#ff3d8b", size: 44, cls: "top-4 left-4 -rotate-12" },
      { fill: "#f5c518", size: 34, cls: "bottom-16 right-4 rotate-12" },
    ],
  },
  {
    no: "03",
    badge: "Ship it & get paid",
    title: "Money hits before the algorithm cools",
    intro:
      "Film it your way, upload, get reviewed in 48h. Money hits your account on approval — no chasing invoices, no 30-day waits.",
    bullets: [
      "48-hour reviews from a real human",
      "Paid on approval, not on invoice cycles",
      "Performance bonuses on viral hits",
    ],
    scriptLine: "— ship it, get paid, repeat",
    bg: "#2d6cff",
    numberTint: "#a8c4ff",
    bulletStroke: "#ffffff",
    textColor: "#ffffff",
    mediaBg: "#0a0a0a",
    mediaAccent: "#2d6cff",
    mediaImage: {
      src: "/cards/get_paid.jpg",
      alt: "Ship it & get paid — money hits in 48 hours, not 30-day invoice cycles",
    },
    mediaStars: [
      { fill: "#2d6cff", size: 44, cls: "top-4 right-4 rotate-12" },
      { fill: "#f5c518", size: 34, cls: "bottom-16 left-4 -rotate-12" },
    ],
  },
  {
    no: "04",
    badge: "Grow with us",
    title: "Your roster grows, your rate grows",
    intro:
      "Every shipped campaign unlocks the next tier — higher rates, exclusive briefs, real-life Icons events, and a manager when you're ready.",
    bullets: [
      "Tier-based rate bumps after each campaign",
      "Invite-only briefs once you hit Icon tier",
      "IRL meetups, drops, and collabs",
    ],
    scriptLine: "— the glow-up is built in",
    bg: "#0a0a0a",
    numberTint: "#2a2a2a",
    bulletStroke: "oklch(0.7823 0.0488 220.2338)",
    textColor: "#f5f1ea",
    mediaBg: "#0a0a0a",
    mediaAccent: "#f5c518",
    mediaImage: {
      src: "/cards/grow_with_us.jpg",
      alt: "Grow with us — tier-based rate bumps, invite-only briefs, IRL meetups",
    },
    mediaStars: [
      { fill: "#f5c518", size: 44, cls: "top-4 right-4 rotate-12" },
      {
        fill: "oklch(0.7823 0.0488 220.2338)",
        size: 34,
        cls: "bottom-16 left-4 -rotate-12",
      },
    ],
  },
];

export const HowSticker = () => {
  const ref = React.useRef<HTMLElement>(null);

  const { pin, stage, track } = useHorizontalPin<
    HTMLDivElement,
    HTMLDivElement,
    HTMLDivElement
  >({
    scrub: 1.5,
    onProgress: (progress) => {
      const activeIndex = Math.min(
        STEPS.length - 1,
        Math.round(progress * (STEPS.length - 1)),
      );
      document.querySelectorAll<HTMLElement>(".how-dot").forEach((dot, i) => {
        dot.style.background = i === activeIndex ? "#0a0a0a" : "transparent";
        dot.style.transform = i === activeIndex ? "scale(1.3)" : "scale(1)";
      });
      const hint = document.querySelector<HTMLElement>(".how-scroll-hint");
      if (hint) hint.style.opacity = progress > 0.04 ? "0" : "1";
    },
  });

  // Heading intros
  useEntrance({
    scope: ref,
    selector: ".how-eyebrow",
    x: -20,
    duration: dur.fast + 0.15,
    ease: ease.out,
    scrollTrigger: { start: "top 80%" },
  });
  useEntrance({
    scope: ref,
    selector: ".how-headline",
    y: 30,
    duration: dur.base + 0.1,
    ease: "power3.out",
    scrollTrigger: { start: "top 75%" },
  });

  // Idle badge wiggle
  useIdleLoop({
    scope: ref,
    selector: ".stack-badge",
    rotate: "+=3",
    duration: 2.2,
  });

  // Idle sparkle drift — direction alternates by index via stagger from random
  useIdleLoop({
    scope: ref,
    selector: ".stack-spark",
    y: "+=14",
    rotate: "+=8",
    duration: 2.6,
    stagger: { each: 0.2, from: "random" },
  });

  return (
    <section
      ref={ref}
      className="relative bracket-frame dot-grid"
      style={{ background: "var(--bg)" }}
    >
      {/* Heading — scrolls normally above the pin */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-9">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="how-headline font-display italic text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] max-w-4xl">
            Your creators go <br />
            through&nbsp;
            <span className="relative inline-block">
              <span className="relative z-10">this.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 h-3 z-0"
                style={{ background: "var(--accent)" }}
              />
            </span>
          </h2>

          {/* Scroll hint — lives next to the heading so it's visible from
              the moment the section enters the viewport. The pin's
              onProgress handler fades it out once horizontal scrub starts. */}
          <div
            className="how-scroll-hint flex items-center gap-1.5 pb-3 transition-opacity duration-500"
            style={{ opacity: 1 }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "var(--color-fg)", opacity: 0.55 }}
            >
              scroll
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 animate-bounce"
              style={{ color: "var(--color-fg)", opacity: 0.55 }}
            />
          </div>
        </div>
      </div>

      {/* Pin container */}
      <div ref={pin} className="relative">
        <div ref={stage} className="relative w-full h-screen overflow-hidden">
          {/* Progress dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className="how-dot block w-2.5 h-2.5 rounded-full border-2 transition-transform duration-300"
                style={{
                  borderColor: "#0a0a0a",
                  background: i === 0 ? "#0a0a0a" : "transparent",
                }}
              />
            ))}
          </div>

          {/* Horizontal track */}
          <div
            ref={track}
            className="flex items-center h-full gap-5 pl-[5vw] pr-[5vw]"
            style={{ willChange: "transform" }}
          >
            {STEPS.map((step) => (
              <article
                key={step.no}
                className="stack-card shrink-0 rounded-[28px] border-2 border-(--color-fg) overflow-hidden"
                style={{
                  width: "min(85vw, 960px)",
                  height: "min(76vh, 620px)",
                  background: step.bg,
                  color: step.textColor,
                  boxShadow: "10px 10px 0 0 var(--color-fg)",
                }}
              >
                <div className="stack-card-grid relative h-full grid gap-4 md:gap-6 p-5 md:p-6 lg:p-8 overflow-hidden">
                  {/* LEFT — text column */}
                  <div className="relative flex flex-col gap-3 min-w-0 overflow-hidden">
                    {/* Badge + step number */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="stack-badge inline-block px-4 py-1.5 rounded-full border-2 border-(--color-fg) font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase -rotate-3 shrink-0"
                        style={{
                          background: "#ffffff",
                          color: "#0a0a0a",
                          boxShadow: "3px 3px 0 0 #0a0a0a",
                        }}
                      >
                        {step.badge}
                      </div>
                      <h3
                        className="font-display italic leading-[0.8] tracking-[-0.04em] text-[clamp(2rem,4vw,3.5rem)] select-none"
                        style={{ color: step.numberTint }}
                        aria-hidden
                      >
                        {step.no}
                      </h3>
                    </div>

                    <h4 className="font-display italic text-[clamp(1.2rem,2.2vw,1.75rem)] leading-[1.05] tracking-[-0.02em] mt-1">
                      {step.title}
                    </h4>

                    <p className="text-sm md:text-[15px] leading-relaxed font-sans opacity-95">
                      {step.intro}
                    </p>

                    <ul className="space-y-1.5 mt-auto">
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 font-sans text-sm leading-snug"
                        >
                          <ArrowRight
                            className="shrink-0 mt-0.5"
                            width={18}
                            height={18}
                            strokeWidth={2.4}
                            color={step.bulletStroke}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="font-script text-xl pt-1">
                      {step.scriptLine}
                    </div>
                  </div>

                  {/* RIGHT — image column */}
                  <div className="relative w-full h-full min-h-0">
                    <div
                      className="relative w-full h-full rounded-[18px] border-[5px] overflow-hidden"
                      style={{
                        background: step.mediaBg,
                        borderColor: "#0a0a0a",
                        boxShadow: "6px 6px 0 0 #0a0a0a",
                      }}
                    >
                      <img
                        src={step.mediaImage.src}
                        alt={step.mediaImage.alt}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-2 rounded-[14px] border-2"
                        style={{
                          borderColor: step.mediaAccent,
                          boxShadow: "inset 0 0 0 2px #0a0a0a",
                        }}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,10,10,0.55), transparent)",
                        }}
                      />
                      {step.mediaStars.map((s, idx) => (
                        <span
                          key={idx}
                          className={`stack-spark absolute z-10 ${s.cls}`}
                        >
                          <Sparkle
                            size={s.size}
                            fill={s.fill}
                            stroke="#0a0a0a"
                            strokeWidth={6}
                          />
                        </span>
                      ))}
                      <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full border-2 border-(--color-fg) font-mono text-[10px] tracking-[0.28em] uppercase whitespace-nowrap"
                        style={{
                          background: "#ffffff",
                          color: "#0a0a0a",
                          boxShadow: "2px 2px 0 0 #0a0a0a",
                        }}
                      >
                        ✦ step {step.no} preview
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
