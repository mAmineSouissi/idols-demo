"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease, dur, stagger } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const powerStrip = [
  { value: "$12M+", label: "Paid to creators",    sub: "since 2022" },
  { value: "10K+",  label: "Verified creators",   sub: "across 40+ countries" },
  { value: "500+",  label: "Brand campaigns run",  sub: "Q1–Q4 2025" },
  { value: "94",    label: "Creator NPS score",    sub: "vs 31 industry avg" },
  { value: "0%",    label: "Agency commission",    sub: "always and forever" },
];

const values = [
  {
    num: "01",
    title: "The middleman dies here.",
    body: "— every dollar a brand pays goes to the creator. Icons earns from subscriptions, not commissions skimmed from payouts.",
    tone: "ink",
  },
  {
    num: "02",
    title: "Creative control is sacred.",
    body: "— brands set direction. Creators execute it their way. When you let real people be real, audiences can tell.",
    tone: "accent",
  },
  {
    num: "03",
    title: "Speed is respect.",
    body: "— payouts in 48 hours. Briefs live in 48 hours. We've eliminated every delay that has no reason to exist.",
    tone: "pink",
  },
  {
    num: "04",
    title: "Vanity metrics are a scam.",
    body: "— we measure purchases, not impressions. A campaign that reached a million people and sold nothing is a failure.",
    tone: "yellow",
  },
];

const team = [
  {
    name: "Sara Malik",
    role: "Co-Founder & CEO",
    bio: "Built a 2M-follower audience before realising every platform was extracting more than it gave. Founded Icons to change the math.",
    tone: "gradient-warm",
    cardTone: "accent",
    handle: "@saramalik",
    linkedin: "https://linkedin.com",
  },
  {
    name: "James Okafor",
    role: "Co-Founder & CTO",
    bio: "Former Meta ranking engineer. Spent six years optimising feeds for engagement — now builds infrastructure that funds creators instead.",
    tone: "gradient-cool",
    cardTone: "pink",
    handle: "@jamesokafor",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Lena Vogel",
    role: "Head of Creator Growth",
    bio: "Led creator operations for TikTok Europe during its 0-to-100M moment. Joined Icons to do it at a human scale, for real money.",
    tone: "gradient-accent",
    cardTone: "yellow",
    handle: "@lenavogel",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Tomás Rivera",
    role: "Head of Brand Partnerships",
    bio: "A decade at Wieden+Kennedy and BBDO before deciding the agency model was the problem, not the solution.",
    tone: "gradient-mono",
    cardTone: "ink",
    handle: "@tomasrivera",
    linkedin: "https://linkedin.com",
  },
];

const milestones = [
  { year: "2022", event: "Icons founded in a Dubai co-working space. Three people, one conviction: the agency model was broken beyond repair." },
  { year: "2023", event: "Reached 1,000 verified creators. Closed a $2M seed round. First 50 brand campaigns shipped — 100% on-time payouts." },
  { year: "2024", event: "Launched AI-powered brand-to-creator matching. 500 brand partners onboarded. Creator NPS hit 94." },
  { year: "2025", event: "Crossed $12M in total creator earnings. Opened NYC office. Zero creator has ever waited longer than 48 hours to be paid." },
];

const beliefs = [
  { num: "01", claim: "Creators are businesses.", contrast: "Not hobbies. Not side hustles." },
  { num: "02", claim: "Content should earn.", contrast: "Not just perform." },
  { num: "03", claim: "Brand fit beats reach.", contrast: "Every single time." },
  { num: "04", claim: "No agency, ever.", contrast: "That's the whole point." },
  { num: "05", claim: "48 hours or we failed.", contrast: "Payment is a deadline, not a courtesy." },
];

const pressLogos = ["TechCrunch", "Fast Company", "Vogue Business", "AdWeek", "Forbes", "The Drum", "Digiday"];

const manifestoLines = [
  "Agencies took a *35% cut —",
  "called it ~\"industry standard.\"",
  "We built something different.",
  "Welcome to *Icons.",
];

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  /* Power strip — full-bleed section, constrained inner grid */
  .ab-ps-grid { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; display: grid; grid-template-columns: minmax(0,1fr); }
  @media (min-width: 640px)  { .ab-ps-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
  @media (min-width: 1024px) { .ab-ps-grid { grid-template-columns: repeat(5, minmax(0,1fr)); } }

  /* Power strip cell separators */
  .ab-ps-cell { padding: 2.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
  @media (min-width: 640px)  { .ab-ps-cell { border-bottom: none; border-right: 1px solid rgba(255,255,255,0.1); padding: 3rem 2.5rem; } }
  .ab-ps-cell:last-child { border: none; }

  /* Values responsive grid */
  .ab-val-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
  @media (min-width: 640px)  { .ab-val-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ab-val-grid { grid-template-columns: repeat(4, 1fr); } }

  /* Value card min-height so they all feel substantial */
  .val-card { min-height: 280px; }

  /* Team responsive grid */
  .ab-team-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
  @media (min-width: 640px)  { .ab-team-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .ab-team-grid { grid-template-columns: repeat(4, 1fr); } }

  /* Team card top accent stripe */
  .ab-team-card-inner {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.75rem;
    height: 100%;
  }
`;

/* ─── Page ───────────────────────────────────────────────────────── */

export const AboutPage = () => {
  const root = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      // ── 1. Hero headline words ─────────────────────────────────────
      gsap.fromTo(".ab-word",
        { opacity: 0, y: 40, rotate: 2 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.85, ease: "power3.out", stagger: 0.07, delay: 0.1, overwrite: "auto", clearProps: "transform,opacity" },
      );
      gsap.fromTo(".ab-hero-sub",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.55, overwrite: "auto" });
      gsap.fromTo(".ab-hero-cta",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.72, overwrite: "auto" });
      gsap.fromTo(".ab-hero-badge", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.08, delay: 0.3, overwrite: "auto" });

      // ── 2. Power strip cells ──────────────────────────────────────
      gsap.fromTo(".ab-ps-cell",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: dur.slow, ease: ease.cinematic, stagger: stagger.normal,
          scrollTrigger: { trigger: ".ab-ps-grid", start: "top 88%", once: true } },
      );

      // ── 3. Pinned manifesto scrub (tightened to 80% extra) ────────
      const mTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top top", end: "+=80%",
          pin: true, pinSpacing: true, scrub: 0.8, anticipatePin: 1,
        },
      });
      mTl
        .fromTo(".mn-glow",
          { scale: 0.7, opacity: 0.04 }, { scale: 1.4, opacity: 0.12, duration: 1 }, 0)
        .from(".mn-line",
          { yPercent: 110, rotate: 3, transformOrigin: "left bottom", stagger: 0.55, duration: 0.8 }, 0.05)
        .from(".mn-lede", { y: 28, opacity: 0, duration: 0.6 }, ">-0.2")
        .from(".mn-note", { xPercent: -25, opacity: 0, duration: 0.6 }, "<");

      // ── 4. Value cards batch reveal ────────────────────────────────
      ScrollTrigger.batch(".val-card", {
        start: "top 85%",
        onEnter: (els) => {
          gsap.fromTo(els,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: dur.slow, ease: ease.cinematic, stagger: 0.12, overwrite: "auto" },
          );
        },
      });

      // ── 5. Timeline rows slide-in + scrub year ────────────────────
      gsap.utils.toArray<HTMLElement>(".tl-row").forEach((row) => {
        const yearEl  = row.querySelector(".tl-year");
        const eventEl = row.querySelector(".tl-event");
        const rule    = row.querySelector(".tl-rule");
        gsap.timeline({
          defaults: { ease: ease.cinematic },
          scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none reverse" },
        })
          .from(rule,    { scaleX: 0, transformOrigin: "left center", duration: 0.7 })
          .from(yearEl,  { xPercent: -8, yPercent: 110, duration: 0.95 }, "-=0.35")
          .from(eventEl, { y: 30, opacity: 0, duration: 0.7 }, "-=0.55");
        gsap.fromTo(yearEl,
          { scale: 0.92, opacity: 0.4 },
          { scale: 1.06, opacity: 1, ease: "none",
            scrollTrigger: { trigger: row, start: "top 75%", end: "bottom 30%", scrub: 1 } },
        );
      });

      // ── 6. Team batch reveal + circle clip-path ───────────────────
      ScrollTrigger.batch(".team-card", {
        start: "top 88%",
        onEnter: (els) => {
          gsap.from(els, {
            yPercent: 25, opacity: 0,
            duration: dur.slow, ease: ease.cinematic, stagger: 0.1, overwrite: "auto",
          });
          gsap.fromTo(
            els.map((el) => el.querySelector(".team-photo")).filter(Boolean),
            { clipPath: "circle(0% at 50% 50%)" },
            { clipPath: "circle(60% at 50% 50%)", duration: dur.epic, ease: ease.cinematic, stagger: 0.1, delay: 0.2, overwrite: "auto" },
          );
        },
      });

      // ── 7. Magnetic hover on team cards ──────────────────────────
      const cards = gsap.utils.toArray<HTMLElement>(".team-card");
      const cleanups: (() => void)[] = [];
      cards.forEach((card) => {
        const photo = card.querySelector<HTMLElement>(".team-photo");
        if (!photo) return;
        const qX  = gsap.quickTo(card,  "x", { duration: 0.5, ease: "power3.out" });
        const qY  = gsap.quickTo(card,  "y", { duration: 0.5, ease: "power3.out" });
        const qPX = gsap.quickTo(photo, "x", { duration: 0.6, ease: "power3.out" });
        const qPY = gsap.quickTo(photo, "y", { duration: 0.6, ease: "power3.out" });
        const onMove = contextSafe!((e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          qX((e.clientX - (r.left + r.width  / 2)) * 0.08);
          qY((e.clientY - (r.top  + r.height / 2)) * 0.08);
          qPX((e.clientX - (r.left + r.width  / 2)) * 0.18);
          qPY((e.clientY - (r.top  + r.height / 2)) * 0.18);
        });
        const onLeave = contextSafe!(() => { qX(0); qY(0); qPX(0); qPY(0); });
        card.addEventListener("mousemove",  onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove",  onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      // ── 8. Press marquee velocity-reactive loop ──────────────────
      const track = marqueeRef.current;
      if (track) {
        const totalW = track.scrollWidth / 2;
        const loop = gsap.to(track, {
          x: -totalW, duration: 30, ease: "none", repeat: -1,
          modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % totalW) },
        });
        ScrollTrigger.create({
          start: 0, end: "max",
          onUpdate(self) {
            const v = self.getVelocity();
            const n = gsap.utils.clamp(-1, 1, v / 2400);
            loop.timeScale(n < 0 ? -(1 + Math.abs(n) * 2.6) : (1 + Math.abs(n) * 2.6));
            gsap.to(track, { skewX: n * 8, duration: 0.45, ease: "power2.out", overwrite: "auto" });
          },
        });
      }

      // ── 9. Beliefs rows — clip-path wipe + y stagger ─────────────
      gsap.utils.toArray<HTMLElement>(".ab-belief-row").forEach((el, i) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 0 100% 0)", y: 16 },
          { clipPath: "inset(0 0 0% 0)", y: 0,
            duration: dur.base, ease: ease.out, delay: i * 0.09,
            scrollTrigger: { trigger: ".ab-beliefs-list", start: "top 85%", toggleActions: "play none none none", once: true } },
        );
      });

      // ── 10. Generic section reveals ──────────────────────────────
      gsap.utils.toArray<HTMLElement>(".sec-reveal").forEach((el) => {
        gsap.from(el, {
          y: 28, opacity: 0, duration: dur.slow, ease: ease.out,
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });

      return () => { cleanups.forEach((c) => c()); };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="min-h-screen relative">
      <style>{PAGE_STYLES}</style>

      <div className="relative z-10">

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="relative py-32 px-6 md:px-12 overflow-hidden bracket-frame dot-grid"
          style={{ background: "var(--color-bg)" }}>

          {/* Accent orb — scoped to hero only */}
          <div aria-hidden
            className="pointer-events-none absolute top-[10%] left-[4vw] w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-20 z-0"
            style={{ background: "var(--accent)" }}
          />

          <Sparkle size={56} fill="var(--accent2)" className="absolute top-20 right-[12%] rotate-12 opacity-55 pointer-events-none" />
          <Sparkle size={42} fill="var(--accent4)" className="absolute bottom-20 left-[7%] -rotate-6 opacity-55 pointer-events-none" />
          <Sparkle size={28} fill="var(--accent3)" className="absolute top-1/2 left-[20%] rotate-45 opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-6 opacity-50">
              about icons
            </div>

            {/* Audience badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["For brands", "For talent"].map((label) => (
                <span key={label} className="ab-hero-badge sticker px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em]" data-tone="cream">
                  {label}
                </span>
              ))}
            </div>

            <h1 className="font-display italic leading-[0.88] tracking-[-0.03em] mb-8"
              style={{ fontSize: "clamp(3rem,9vw,8rem)" }}>
              {["We're", "not an", "agency.", "We never", "will be."].map((word, i) => (
                <span key={i}
                  className="ab-word inline-block align-bottom mr-[0.22em] last:mr-0">
                  {word}
                </span>
              ))}
            </h1>

            <p className="ab-hero-sub font-script text-2xl md:text-3xl opacity-65 mb-10">
              — the platform built for the people doing the actual work
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/brief-builder" className="ab-hero-cta btn-primary">
                Start a campaign
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/talents/apply" className="ab-hero-cta btn-ghost">
                Join as creator
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── DARK POWER STRIP ────────────────────────────────────── */}
        <section style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}>
          <div className="ab-ps-grid">
            {powerStrip.map(({ value, label, sub }) => (
              <div key={label} className="ab-ps-cell">
                <div className="font-display italic leading-none mb-3"
                  style={{ fontSize: "clamp(1.8rem,3.2vw,3rem)", color: "var(--color-bg)" }}>
                  {value}
                </div>
                <div className="text-base font-medium mb-1.5" style={{ color: "var(--color-bg)" }}>{label}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "color-mix(in srgb, var(--color-bg) 45%, transparent)" }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PINNED MANIFESTO ────────────────────────────────────── */}
        <section ref={manifestoRef}
          className="relative h-screen flex items-center px-6 md:px-12 border-t border-(--color-border) overflow-hidden bracket-frame"
          style={{ background: "var(--color-bg)" }}>
          <div className="mn-glow absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, var(--color-border) 0%, transparent 60%)", opacity: 0.4 }} />
          <div className="max-w-6xl mx-auto w-full grid grid-cols-12 gap-8 relative">
            <aside className="mn-note col-span-12 md:col-span-3 self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] opacity-50">The manifesto</p>
              <p className="font-script text-base mt-2 opacity-55">
                — first written on a napkin in Dubai, 2022.
              </p>
            </aside>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display italic leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2rem,5.5vw,5.5rem)" }}>
                {manifestoLines.map((line, i) => {
                  const italic = line.startsWith("~");
                  const clean  = italic ? line.slice(1) : line;
                  return (
                    <span key={i} className="block overflow-hidden">
                      <span className={`mn-line inline-block${italic ? " italic" : ""}`}>
                        {clean.split(" ").map((w: string, j: number) => {
                          const isAccent = w.startsWith("*");
                          const word = isAccent ? w.slice(1) : w;
                          return (
                            <span key={j} style={isAccent ? { color: "oklch(0.7823 0.0488 220.2338)" } : undefined}>
                              {word}{j < clean.split(" ").length - 1 ? " " : ""}
                            </span>
                          );
                        })}
                      </span>
                    </span>
                  );
                })}
              </h2>
              <p className="mn-lede font-script text-xl md:text-2xl opacity-60 mt-8 max-w-2xl">
                — creators built the modern internet. we built Icons so they keep what they earn.
              </p>
            </div>
          </div>
        </section>

        {/* ── VALUES ──────────────────────────────────────────────── */}
        <section className="relative py-24 px-6 md:px-12 bracket-frame dot-grid border-t border-(--color-border)"
          style={{ background: "var(--color-panel)" }}>
          <Sparkle size={38} fill="var(--accent3)" className="absolute top-10 right-[5%] -rotate-12 opacity-50 pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-4 opacity-50 sec-reveal">
              what we stand for
            </div>
            <h2 className="font-display italic text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] mb-14 sec-reveal">
              Four things we won&apos;t compromise on.
            </h2>

            <div className="ab-val-grid pb-3 pr-3">
              {values.map(({ num, title, body, tone }) => (
                <article key={num} className="val-card sticker flex flex-col gap-5 p-8" data-tone={tone}>
                  <span className="val-num font-display italic text-6xl leading-none opacity-20">{num}</span>
                  <h3 className="font-display italic text-xl md:text-2xl leading-tight">{title}</h3>
                  <p className="font-script text-lg leading-snug opacity-70">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ────────────────────────────────────────────── */}
        <section className="px-6 md:px-12 py-24 border-t border-(--color-border) bracket-frame"
          style={{ background: "var(--color-bg)" }}>
          <div className="max-w-7xl mx-auto" ref={timelineRef}>
            <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-4 opacity-50 sec-reveal">
              our story
            </div>
            <h2 className="font-display italic text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] mb-16 sec-reveal">
              Built one milestone at a time.
            </h2>
            <div>
              {milestones.map(({ year, event }) => (
                <div key={year} className="tl-row grid grid-cols-12 gap-6 items-start py-10 relative">
                  <div className="tl-rule absolute left-0 right-0 top-0 h-[2px]"
                    style={{ background: "var(--color-fg)" }} />
                  <div className="col-span-12 md:col-span-3 overflow-hidden">
                    <span className="tl-year font-display italic text-5xl md:text-7xl leading-none inline-block will-change-transform">
                      {year}
                    </span>
                  </div>
                  <p className="tl-event col-span-12 md:col-span-9 font-sans text-lg md:text-xl leading-relaxed opacity-80 pt-2 md:pt-4">
                    {event}
                  </p>
                </div>
              ))}
              <div className="h-[2px]" style={{ background: "var(--color-fg)" }} />
            </div>
          </div>
        </section>

        {/* ── WE BELIEVE ──────────────────────────────────────────── */}
        <section className="border-t border-(--color-border) bracket-frame"
          style={{ background: "var(--color-bg)" }}>
          {/* Header */}
          <div className="px-6 md:px-12 py-16 md:py-20 border-b border-(--color-border)">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-4 opacity-50 sec-reveal">
                  our convictions
                </div>
                <h2 className="font-display italic text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] sec-reveal">
                  Five things we&apos;d<br />stake the company on.
                </h2>
              </div>
              <p className="sec-reveal hidden md:block font-mono text-[12px] tracking-wide text-(--color-muted-fg) max-w-xs leading-relaxed self-end">
                Not values from a wall poster. Decisions we make every day.
              </p>
            </div>
          </div>

          {/* Belief rows */}
          <div className="ab-beliefs-list max-w-7xl mx-auto">
            {beliefs.map(({ num, claim, contrast }) => (
              <div key={num}
                className="ab-belief-row group relative border-b border-(--color-border) overflow-hidden cursor-default"
                style={{ clipPath: "inset(0 0 0% 0)" }}>
                {/* Hover fill */}
                <div aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "var(--color-fg)" }} />

                <div className="relative z-10 flex items-center gap-6 md:gap-12 px-6 md:px-12 py-9 md:py-11">
                  {/* Number */}
                  <span className="font-mono text-[10px] tracking-[0.32em] text-(--color-muted-fg) w-6 shrink-0 group-hover:text-(--color-bg) transition-colors duration-500">
                    {num}
                  </span>

                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-baseline md:gap-10">
                    <h3 className="font-display italic text-[clamp(1.5rem,3.5vw,3rem)] leading-none shrink-0 group-hover:text-(--color-bg) transition-colors duration-500">
                      {claim}
                    </h3>
                    <p className="font-mono text-[12px] tracking-wide text-(--color-muted-fg) leading-relaxed mt-2 md:mt-0 max-w-sm group-hover:text-(--color-accent) transition-colors duration-500">
                      {contrast}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    style={{ color: "var(--color-accent)" }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEAM ────────────────────────────────────────────────── */}
        <section className="relative py-24 px-6 md:px-12 border-t border-(--color-border) bracket-frame dot-grid"
          style={{ background: "var(--color-panel)" }}>
          <Sparkle size={44} fill="var(--accent2)" className="absolute top-12 left-[6%] rotate-6 opacity-50 pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-4 opacity-50 sec-reveal">
              the team
            </div>
            <h2 className="font-display italic text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] mb-14 sec-reveal">
              Operators, builders, creators-turned-founders.
            </h2>

            <div ref={teamGridRef} className="ab-team-grid">
              {team.map(({ name, role, bio, tone, cardTone, handle, linkedin }) => {
                const accentColor = {
                  accent: "var(--accent)",
                  pink:   "#ff3eb5",
                  yellow: "var(--accent4)",
                  ink:    "var(--fg)",
                }[cardTone] ?? "var(--accent)";
                return (
                  <a key={name}
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-card sticker will-change-transform overflow-hidden"
                    data-tone={cardTone}
                    style={{ padding: 0 }}
                  >
                    {/* Accent top stripe */}
                    <div style={{ height: "4px", background: accentColor, borderRadius: "var(--radius-lg) var(--radius-lg) 0 0" }} />

                    <div className="ab-team-card-inner">
                      {/* Photo block */}
                      <div className={`team-photo ${tone} w-full aspect-square rounded-2xl relative overflow-hidden will-change-transform`}>
                        <span className="absolute inset-0 flex items-center justify-center font-display italic text-6xl"
                          style={{ color: "rgba(0,0,0,0.18)" }}>
                          {name.split(" ").map((p) => p[0]).join("")}
                        </span>
                      </div>

                      {/* Name + role */}
                      <div>
                        <h3 className="font-display italic text-xl leading-tight mb-0.5">{name}</h3>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-55">{role}</p>
                      </div>

                      {/* Bio */}
                      <p className="font-sans text-[14px] leading-relaxed opacity-75 flex-1">{bio}</p>

                      {/* Footer — handle + arrow */}
                      <div className="flex items-center justify-between pt-3 border-t border-(--color-border)">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-40">{handle}</span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em]"
                          style={{ color: accentColor, opacity: 0.8 }}>
                          LinkedIn
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRESS MARQUEE ───────────────────────────────────────── */}
        <section className="py-20 border-t border-(--color-border) overflow-hidden relative"
          style={{ background: "var(--color-bg)" }}>
          <div className="text-center mb-10">
            <p className="font-mono text-[12px] tracking-[0.32em] uppercase opacity-50 sec-reveal">
              as seen in
            </p>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-(--color-bg) to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-(--color-bg) to-transparent pointer-events-none" />
          <div ref={marqueeRef}
            className="flex items-center gap-12 whitespace-nowrap w-max will-change-transform">
            {[...pressLogos, ...pressLogos, ...pressLogos].map((p, i) => (
              <span key={i} className="flex items-center gap-12">
                {i % 3 === 0 ? (
                  <span className="sticker px-5 py-2 font-mono text-xs uppercase tracking-[0.28em]" data-tone="cream">
                    {p}
                  </span>
                ) : (
                  <span
                    className="font-display italic text-4xl md:text-5xl tracking-tight"
                    style={{ color: "color-mix(in srgb, var(--color-fg) 35%, transparent)" }}>
                    {p}
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────── */}
        <section className="relative py-24 px-6 md:px-12 dot-grid bracket-frame border-t border-(--color-border)"
          style={{ background: "var(--color-bg)" }}>
          <div className="max-w-4xl mx-auto relative">
            <Sparkle size={56} fill="var(--accent2)" className="absolute -top-4 -left-4 md:-left-10 -rotate-12 pointer-events-none" />
            <Sparkle size={44} fill="var(--accent4)" className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none" />

            <div className="sticker p-10 md:p-16 text-center flex flex-col items-center gap-8" data-tone="ink">
              <div className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60 flex items-center gap-2">
                <span>✦</span><span>ready when you are</span><span>✦</span>
              </div>

              <h2 className="font-display italic text-[clamp(2.2rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]">
                Pick your side.
              </h2>

              <p className="font-script text-2xl md:text-3xl opacity-70">
                — brands start free. creators always free.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/brief-builder" className="btn-primary">
                  Start a campaign
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link href="/talents/apply" className="btn-ghost"
                  style={{
                    background: "transparent",
                    color: "var(--color-bg)",
                    borderColor: "var(--color-bg)",
                    boxShadow: "4px 4px 0 0 var(--color-accent)",
                  }}>
                  Join as creator
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
