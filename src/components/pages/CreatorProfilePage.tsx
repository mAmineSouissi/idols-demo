import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowUpRight, MapPin, Clock, Zap, CheckCircle2, Users, TrendingUp, Globe } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease } from "@/lib/motion";
import type { CreatorProfile } from "@/data/creators";
import { creators } from "@/data/creators";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────── */
/* PAGE STYLES                                                    */
/* ────────────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  /* ── Hero ──────────────────────── */
  .cp-hero-grid {
    display: grid;
    grid-template-columns: 1fr;
  }
  @media (min-width: 768px) {
    .cp-hero-grid {
      grid-template-columns: 440px 1fr;
      min-height: 580px;
    }
  }
  /* ── Stats strip ────────────────── */
  .cp-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    .cp-stats-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  .cp-stat-cell {
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .cp-stat-cell:last-child {
    border-right: none;
  }
  /* ── About info grid ────────────── */
  .cp-info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  @media (min-width: 1024px) {
    .cp-info-grid {
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
  }
  /* ── Platforms grid ─────────────── */
  .cp-platforms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  @media (min-width: 480px) {
    .cp-platforms-grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }
  /* ── Audience grid ──────────────── */
  .cp-audience-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: var(--color-border);
  }
  @media (min-width: 768px) {
    .cp-audience-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  /* ── Portfolio grid ─────────────── */
  .cp-portfolio-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  @media (min-width: 768px) {
    .cp-portfolio-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  }
  /* ── Similar strip ──────────────── */
  .cp-similar-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: var(--color-border);
  }
  @media (min-width: 640px) {
    .cp-similar-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  /* ── Quote clip anim ────────────── */
  .cp-quote-mask {
    clip-path: inset(0 100% 0 0);
  }

`;

/* ────────────────────────────────────────────────────────────── */
/* HELPERS                                                        */
/* ────────────────────────────────────────────────────────────── */

function getSimilarCreators(current: CreatorProfile, n = 3): CreatorProfile[] {
  return creators
    .filter((c) => c.handle !== current.handle)
    .map((c) => ({
      creator: c,
      score: c.categories.filter((cat) => current.categories.includes(cat)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ creator }) => creator);
}

/* ────────────────────────────────────────────────────────────── */
/* SUB-COMPONENTS                                                 */
/* ────────────────────────────────────────────────────────────── */

function AvailBadge({ status }: { status: CreatorProfile["availability"] }) {
  const config = {
    available:       { label: "Available now",    tone: "accent"  },
    "booking-soon":  { label: "Booking Q3 2026",  tone: "yellow"  },
    booked:          { label: "Currently booked", tone: "pink"    },
  }[status];
  return (
    <span className="chip inline-flex items-center gap-2 !text-[10px] !px-3 !py-1.5" data-tone={config.tone}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ background: "currentColor" }} />
      {config.label}
    </span>
  );
}

const IS_VIDEO_FORMAT = (f: string) =>
  /tiktok|youtube|reel|grwm/i.test(f);

function PortfolioTile({ item }: { item: CreatorProfile["portfolio"][0] }) {
  const hasThumb  = Boolean(item.thumb);
  const isVideo   = IS_VIDEO_FORMAT(item.format);
  /* when we have a photo thumb, overlay text is always white */
  const fg  = hasThumb ? "#fff" : (item.dark ? "#fff" : "#000");
  const dim = hasThumb ? "rgba(255,255,255,0.75)" : (item.dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)");

  return (
    <div
      className="relative overflow-hidden rounded-xl group cursor-default aspect-[4/3] transition-transform duration-500 hover:-translate-y-1"
      style={{ background: item.bg, boxShadow: "0 2px 0 0 var(--color-border)" }}
    >
      {/* Photo thumbnail (when available) */}
      {hasThumb && (
        <img
          src={item.thumb}
          alt={`${item.brand} content by creator`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      )}

      {/* Scrim — stronger at top and bottom when photo is shown */}
      {hasThumb && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      )}

      {/* Play button (video formats with thumb) */}
      {isVideo && hasThumb && (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 4 }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", border: "1.5px solid rgba(255,255,255,0.35)" }}
          >
            {/* Triangle play icon */}
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
              <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Corner marks (gradient tiles only) */}
      {!hasThumb && (["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map((pos, i) => (
        <div
          key={i}
          aria-hidden
          className={`absolute ${pos} w-2.5 h-2.5`}
          style={{
            borderTop:    i < 2  ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined,
            borderBottom: i >= 2 ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined,
            borderLeft:   i % 2 === 0 ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined,
            borderRight:  i % 2 === 1 ? `1px solid ${item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}` : undefined,
          }}
        />
      ))}

      {/* Top row: format pill + view count */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center" style={{ zIndex: 5 }}>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
          style={{ background: hasThumb ? "rgba(0,0,0,0.35)" : (item.dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"), backdropFilter: hasThumb ? "blur(6px)" : undefined, color: dim }}
        >
          {item.format}
        </span>
        <span className="font-mono text-[10px] font-semibold" style={{ color: fg, opacity: hasThumb ? 0.85 : 0.55, textShadow: hasThumb ? "0 1px 3px rgba(0,0,0,0.6)" : undefined }}>
          {item.views}
        </span>
      </div>

      {/* Hover overlay — view count watermark (gradient tiles only) */}
      {!hasThumb && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ zIndex: 5 }}
        >
          <span
            className="font-display"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: fg, opacity: 0.1, fontStyle: "italic", letterSpacing: "-0.02em" }}
          >
            {item.views}
          </span>
        </div>
      )}

      {/* Bottom frosted brand label */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2.5 transition-transform duration-300"
        style={{ zIndex: 5, background: hasThumb ? "rgba(0,0,0,0)" : (item.dark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"), backdropFilter: hasThumb ? undefined : "blur(6px)" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: fg, opacity: hasThumb ? 0.9 : 0.75, textShadow: hasThumb ? "0 1px 4px rgba(0,0,0,0.8)" : undefined }}>
          {item.brand !== "Organic" ? `↗ ${item.brand}` : "✦ Organic"}
        </span>
      </div>
    </div>
  );
}

function SimilarCreatorCard({ creator }: { creator: CreatorProfile }) {
  const totalK = creator.platforms.reduce((sum, p) => {
    const n = parseFloat(p.followers.replace(/[KM]/g, "")) * (p.followers.includes("M") ? 1000 : 1);
    return sum + n;
  }, 0);
  const reach = totalK >= 1000 ? `${(totalK / 1000).toFixed(1)}M` : `${Math.round(totalK)}K`;

  return (
    <Link
      href={`/talents/${creator.handle}`}
      className="cp-similar-card group flex flex-col p-6 bg-(--color-bg) transition-colors duration-200 hover:bg-(--color-panel)"
    >
      {/* Tone strip */}
      <div className={`${creator.tone} w-full h-1.5 rounded-full mb-5 opacity-80`} />

      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div
          className={`${creator.tone} w-12 h-12 rounded-full shrink-0 flex items-center justify-center overflow-hidden`}
          style={{ border: "2px solid rgba(255,255,255,0.2)" }}
        >
          {creator.photo ? (
            <img
              src={creator.photo}
              alt={creator.shortName}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <span className="font-display italic text-lg" style={{ color: "rgba(0,0,0,0.4)" }}>
              {creator.shortName.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-display italic text-xl leading-none mb-1 truncate">{creator.shortName}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-muted-fg) truncate">{creator.title}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-(--color-border)">
        <div className="flex items-center gap-1.5">
          <span className="font-display italic text-xl leading-none">{reach}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-(--color-muted-fg)">reach</span>
        </div>
        <div className="flex items-center gap-1.5">
          <AvailBadge status={creator.availability} />
          <ArrowUpRight
            className="w-3.5 h-3.5 text-(--color-muted-fg) transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* PAGE                                                           */
/* ────────────────────────────────────────────────────────────── */

export default function CreatorProfilePage({ creator }: { creator: CreatorProfile }) {
  const ref = useRef<HTMLDivElement>(null);

  /* ── Computed values ──────────────────────────────────────── */
  const platformTotal = creator.platforms.reduce((sum, p) => {
    const n = parseFloat(p.followers.replace(/[KM]/g, "")) * (p.followers.includes("M") ? 1000 : 1);
    return sum + n;
  }, 0);
  const totalReach = platformTotal >= 1000 ? `${(platformTotal / 1000).toFixed(1)}M` : `${Math.round(platformTotal)}K`;
  const similar = getSimilarCreators(creator);

  /* ── Animations ───────────────────────────────────────────── */
  useGSAP(() => {
    // Hero entrance — staggered from bottom
    gsap.fromTo(".cp-hero-in",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: ease.out, stagger: 0.08, delay: 0.2 },
    );

    // Stats bar cells — stagger slide up
    gsap.fromTo(".cp-stat-cell",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: ease.out, stagger: 0.1,
        scrollTrigger: { trigger: ".cp-stats-grid", start: "top 90%", once: true } },
    );

    // Quote section — clip-path wipe
    gsap.to(".cp-quote-mask", {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cp-quote-section", start: "top 95%", once: true },
    });

    // Audience cells — fade in stagger
    gsap.fromTo(".cp-audience-cell",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: ease.out, stagger: 0.12,
        scrollTrigger: { trigger: ".cp-audience-grid", start: "top 95%", once: true } },
    );

    // Generic scroll reveals
    gsap.utils.toArray<Element>(".cp-reveal").forEach((el) => {
      gsap.fromTo(el,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: ease.out,
          scrollTrigger: { trigger: el, start: "top 95%", once: true } },
      );
    });

    // Portfolio tiles — scale up stagger
    gsap.fromTo(".cp-tile",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: ease.out, stagger: 0.07,
        scrollTrigger: { trigger: ".cp-portfolio-grid", start: "top 95%", once: true } },
    );

    // Similar creator cards — stagger slide
    gsap.fromTo(".cp-similar-card",
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: ease.out, stagger: 0.1,
        scrollTrigger: { trigger: ".cp-similar-grid", start: "top 95%", once: true } },
    );
  }, { scope: ref });

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      <style>{PAGE_STYLES}</style>

      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div className="border-b border-(--color-border) px-6 md:px-10 py-4">
        <Link
          href="/talents"
          className="inline-flex items-center gap-2 text-sm text-(--color-muted-fg) hover:text-(--color-fg) transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Browse creators
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-(--color-border)">
        <div className="cp-hero-grid">

          {/* Left — full-bleed photo panel */}
          <div className={`${creator.tone} relative flex flex-col items-center justify-end min-h-[420px] overflow-hidden`}>
            {/* Large watermark initial */}
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center select-none font-display italic leading-none pointer-events-none"
              style={{ fontSize: "clamp(10rem, 28vw, 20rem)", color: "rgba(0,0,0,0.07)", zIndex: 1 }}
            >
              {creator.shortName.charAt(0)}
            </span>

            {/* Creator photo */}
            {creator.photo && (
              <img
                src={creator.photo}
                alt={creator.shortName}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ zIndex: 2, mixBlendMode: "multiply", opacity: 0.55 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}

            {/* Gradient fade at bottom for legibility */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
              style={{ zIndex: 3, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
            />

            {/* Name + availability overlay */}
            <div className="cp-hero-in relative flex flex-col items-center text-center gap-3 pb-10 px-8" style={{ zIndex: 4 }}>
              <AvailBadge status={creator.availability} />
              <h1 className="font-display italic leading-[0.92]" style={{ fontSize: "clamp(2.5rem,6vw,4rem)", color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                {creator.shortName}
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: "rgba(255,255,255,0.65)" }}>
                {creator.title}
              </p>
            </div>
          </div>

          {/* Right — metadata panel */}
          <div className="flex flex-col justify-between p-8 md:p-10 border-t md:border-t-0 md:border-l border-(--color-border)">
            <div className="flex flex-col gap-6">

              {/* Name + meta row */}
              <div className="cp-hero-in flex flex-col gap-2">
                <h2 className="font-display italic text-3xl leading-none">{creator.shortName}</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-muted-fg)">
                    <MapPin className="w-3.5 h-3.5" />{creator.location}
                  </span>
                  <span className="w-px h-3 bg-(--color-border)" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-muted-fg)">
                    <Clock className="w-3.5 h-3.5" />Responds {creator.responseTime}
                  </span>
                  <span className="w-px h-3 bg-(--color-border)" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-(--color-muted-fg)">
                    <Zap className="w-3.5 h-3.5" />{creator.fee}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="cp-hero-in font-script text-xl leading-snug opacity-70 max-w-xl">
                — {creator.bio}
              </p>

              {/* Platform cards */}
              <div className="cp-hero-in cp-platforms-grid">
                {creator.platforms.map((p) => (
                  <div key={p.name} className="sticker flex flex-col px-4 py-3" data-tone="cream">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50 mb-1">{p.name}</span>
                    <span className="font-display italic text-2xl leading-none">{p.followers}</span>
                    <span className="font-mono text-[8px] mt-1" style={{ color: "var(--color-accent)" }}>{p.growth} growth</span>
                  </div>
                ))}
              </div>

              {/* Brand fit chips */}
              <div className="cp-hero-in flex flex-wrap gap-2">
                {creator.brandFit.slice(0, 4).map((b) => (
                  <span key={b} className="chip inline-flex items-center gap-1.5 !text-[10px] !px-3 !py-1.5" data-tone="accent">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div
              className="cp-hero-in mt-8 pt-6 border-t border-(--color-border) flex flex-wrap items-center gap-4"
            >
              <Link href={`/brief-builder?creator=${creator.handle}`} className="btn-primary">
                Book via Icons
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">All enquiries managed</span>
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">through Icons · 0% cut</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip — dark power strip ─────────────────── */}
      <section style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}>
        <div className="cp-stats-grid max-w-7xl mx-auto">
          {[{ label: "Total reach", value: totalReach }, ...creator.stats].map((s) => (
            <div key={s.label} className="cp-stat-cell flex flex-col justify-center py-8 px-6">
              <span
                className="font-display italic leading-none mb-2"
                style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "var(--color-accent)" }}
              >
                {s.value}
              </span>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.28em]"
                style={{ color: "color-mix(in srgb, var(--color-bg) 50%, transparent)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Creator quote — editorial dark section ──────────── */}
      <section
        className="cp-quote-section relative overflow-hidden px-6 md:px-14 py-20 md:py-28 border-b border-(--color-border)"
        style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
      >
        {/* Decorative giant quotation mark */}
        <span
          aria-hidden
          className="absolute top-0 left-8 font-display italic leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem,20vw,18rem)", color: "color-mix(in srgb, var(--color-bg) 6%, transparent)", lineHeight: 1 }}
        >
          &ldquo;
        </span>

        <Sparkle
          size={36}
          fill="var(--color-accent)"
          className="absolute top-10 right-12 opacity-50 pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] mb-8" style={{ color: "color-mix(in srgb, var(--color-bg) 45%, transparent)" }}>
            ✦ In their words
          </p>
          <blockquote
            className="cp-quote-mask font-display italic leading-[1.05] tracking-[-0.02em] mb-10"
            style={{ fontSize: "clamp(1.8rem,4.5vw,3.5rem)", color: "var(--color-bg)" }}
          >
            &ldquo;{creator.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <div
              className={`${creator.tone} w-10 h-10 rounded-full overflow-hidden shrink-0`}
              style={{ border: "2px solid rgba(255,255,255,0.2)" }}
            >
              {creator.photo && (
                <img
                  src={creator.photo}
                  alt=""
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              )}
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold" style={{ color: "var(--color-bg)" }}>{creator.shortName}</p>
              <p className="font-mono text-[10px]" style={{ color: "color-mix(in srgb, var(--color-bg) 50%, transparent)" }}>{creator.title} · {creator.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About + Brand fit ──────────────────────────────── */}
      <section
        className="border-b border-(--color-border) bracket-frame dot-grid px-6 md:px-10 py-14"
        style={{ background: "var(--color-panel)" }}
      >
        <div className="max-w-7xl mx-auto cp-info-grid">

          <div className="cp-reveal flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Content types</p>
              <div className="flex flex-wrap gap-2">
                {creator.contentTypes.map((t) => (
                  <span key={t} className="chip !text-[10px] !px-3 !py-1.5" data-tone="cream">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Audience categories</p>
              <div className="flex flex-wrap gap-2">
                {creator.categories.map((c) => (
                  <span key={c} className="chip !text-[10px] !px-3 !py-1.5" data-tone="ink">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="cp-reveal flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Works well with</p>
              <div className="flex flex-wrap gap-2">
                {creator.brandFit.map((b) => (
                  <span key={b} className="chip inline-flex items-center gap-1.5 !text-[10px] !px-3 !py-1.5" data-tone="accent">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />{b}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-50 mb-4">Past brand categories</p>
              <div className="flex flex-wrap gap-2">
                {creator.pastBrands.map((b) => (
                  <span key={b} className="chip !text-[10px] !px-3 !py-1.5" data-tone="yellow">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audience demographics ───────────────────────────── */}
      <section className="border-b border-(--color-border) px-6 md:px-10 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="cp-reveal flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-50 mb-2">Audience</p>
              <h2 className="font-display italic text-3xl md:text-4xl leading-tight">Who&apos;s watching.</h2>
            </div>
          </div>

          <div className="cp-audience-grid rounded-xl overflow-hidden border border-(--color-border)">
            {/* Age + gender */}
            <div className="cp-audience-cell bg-(--color-panel) px-8 py-10 flex flex-col gap-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-(--color-muted-fg)">
                <Users className="w-3.5 h-3.5" />
                Demographics
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-1.5">Top age group</p>
                  <p className="font-display italic leading-none" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)" }}>
                    {creator.audience.topAge}
                  </p>
                </div>
                <div className="h-px bg-(--color-border)" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 mb-1.5">Gender split</p>
                  <p className="font-display italic text-2xl leading-none">{creator.audience.genderSplit}</p>
                </div>
              </div>
            </div>

            {/* Platform breakdown */}
            <div className="cp-audience-cell bg-(--color-panel) px-8 py-10 flex flex-col gap-5 border-t border-(--color-border) md:border-t-0">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-(--color-muted-fg)">
                <TrendingUp className="w-3.5 h-3.5" />
                By platform
              </div>
              <div className="flex flex-col gap-3">
                {creator.platforms.map((p) => {
                  const n = parseFloat(p.followers.replace(/[KM]/g, "")) * (p.followers.includes("M") ? 1000 : 1);
                  const pct = Math.round((n / platformTotal) * 100);
                  return (
                    <div key={p.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">{p.name}</span>
                        <span className="font-mono text-[10px] opacity-50">{p.followers}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: "var(--color-accent)", transition: "width 1s ease" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top locations */}
            <div className="cp-audience-cell bg-(--color-panel) px-8 py-10 flex flex-col gap-5 border-t border-(--color-border) md:border-t-0">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-(--color-muted-fg)">
                <Globe className="w-3.5 h-3.5" />
                Top markets
              </div>
              <div className="flex flex-col gap-3">
                {creator.audience.topLocations.map((loc, i) => (
                  <div key={loc} className="flex items-center gap-4">
                    <span
                      className="font-display italic leading-none shrink-0"
                      style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", color: i === 0 ? "var(--color-accent)" : undefined }}
                    >
                      #{i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-mono text-[11px] font-semibold">{loc}</p>
                      <div
                        className="h-0.5 mt-1 rounded-full"
                        style={{ width: `${100 - i * 22}%`, background: i === 0 ? "var(--color-accent)" : "var(--color-border)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio ──────────────────────────────────────── */}
      <section className="border-b border-(--color-border) px-6 md:px-10 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="cp-reveal flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-50 mb-2">Portfolio</p>
              <h2 className="font-display italic text-3xl md:text-4xl leading-tight">Recent work.</h2>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 text-right hidden md:block">
              {creator.portfolio.length} pieces<br />across {creator.platforms.length} platforms
            </span>
          </div>
          <div className="cp-portfolio-grid">
            {creator.portfolio.map((item, i) => (
              <div key={i} className="cp-tile">
                <PortfolioTile item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Similar creators ───────────────────────────────── */}
      {similar.length > 0 && (
        <section className="border-b border-(--color-border) px-6 md:px-10 py-14">
          <div className="max-w-7xl mx-auto">
            <div className="cp-reveal flex items-end justify-between mb-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-50 mb-2">Also on the roster</p>
                <h2 className="font-display italic text-3xl md:text-4xl leading-tight">You might like.</h2>
              </div>
              <Link
                href="/talents"
                className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted-fg) hover:text-(--color-fg) transition-colors"
              >
                Full roster
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="cp-similar-grid rounded-xl overflow-hidden border border-(--color-border)">
              {similar.map((c) => (
                <SimilarCreatorCard key={c.handle} creator={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Booking CTA ────────────────────────────────────── */}
      <section
        className="relative py-24 px-6 md:px-12 dot-grid bracket-frame border-t border-(--color-border)"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-3xl mx-auto relative">
          <Sparkle size={56} fill="var(--color-accent)" className="absolute -top-4 -left-4 md:-left-10 -rotate-12 pointer-events-none" />
          <Sparkle size={44} fill="var(--color-accent-2)" className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none" />

          <div className="cp-reveal sticker p-10 md:p-16 text-center flex flex-col items-center gap-6" data-tone="ink">
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60 flex items-center gap-2">
              <span>✦</span><span>book a campaign</span><span>✦</span>
            </div>

            <h2 className="font-display italic leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.2rem,6vw,5rem)" }}>
              Work with {creator.shortName}
            </h2>

            <p className="font-script text-xl md:text-2xl opacity-70">
              — responds {creator.responseTime}. payments in 48h. zero agency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <Link
                href={`/brief-builder?creator=${creator.handle}`}
                className="btn-ghost"
                style={{ color: "var(--color-bg)", borderColor: "var(--color-bg)", boxShadow: "4px 4px 0 0 var(--color-accent)" }}
              >
                Send a brief
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/brief-builder"
                className="btn-ghost"
                style={{ color: "var(--color-bg)", borderColor: "rgba(255,255,255,0.25)" }}
              >
                Build a brief
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <span
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{ color: "color-mix(in srgb, var(--color-bg) 35%, transparent)" }}
            >
              Direct contact not shared · Platform-mediated only · {creator.fee}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
