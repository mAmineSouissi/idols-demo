"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { SectionShell } from "@/components/shared/PagePrimitives";
import { Sparkle } from "@/components/ui/Sparkle";
import { ease } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Data ──────────────────────────────────────────────────────── */

const offices = [
  { city: "New York", country: "USA", address: "112 Greene St, SoHo", tone: "cream"  },
  { city: "Dubai",    country: "UAE", address: "DIFC, Gate Avenue",   tone: "accent" },
  { city: "Lisbon",   country: "PT",  address: "Rua da Boavista 84",  tone: "pink"   },
];

const faqs = [
  {
    q: "How fast do you respond?",
    a: "We aim for a real response within 24 hours, Monday through Friday. Most messages get a reply same-day during business hours in New York or Dubai.",
  },
  {
    q: "I'm a creator — how do I get on the platform?",
    a: "Use the form below and pick 'I'm a creator'. We'll send you the full application within a day. Vetting usually takes 48 hours after you submit.",
  },
  {
    q: "What's the minimum budget for a brand campaign?",
    a: "Our Spark plan starts at $2.5K per campaign and runs with 3–5 creators. For always-on programs, Studio starts at $8K/mo.",
  },
  {
    q: "Do you work outside the US, UAE, and EU?",
    a: "Yes — we run campaigns across 40+ markets through our creator network. The team is split between New York, Dubai, and Lisbon, but our roster is global.",
  },
  {
    q: "How does payment to creators work?",
    a: "Creators are paid within 48 hours of brand approval. Icons takes 0% from the creator side — our revenue comes from the brand-side service fee.",
  },
];

const subjectOptions = [
  { value: "creator", label: "I'm a creator"       },
  { value: "brand",   label: "I represent a brand" },
  { value: "press",   label: "Press & media"       },
  { value: "other",   label: "Something else"      },
];

/* ─── Styles ─────────────────────────────────────────────────────── */

const PAGE_STYLES = `
  .ct-form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 1024px) {
    .ct-form-grid { grid-template-columns: 1fr 360px; gap: 2.5rem; }
  }

  .ct-offices-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .ct-offices-grid { grid-template-columns: repeat(3, 1fr); }
  }
`;

/* ─── Page ───────────────────────────────────────────────────────── */

export const ContactPage = () => {
  const ref    = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [sent, setSent]       = useState(false);
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(
    () => {
      // Hero words — fromTo so elements are never pre-hidden if animation interrupts
      gsap.fromTo(".ct-word",
        { opacity: 0, y: 40, rotate: 2 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.85, ease: "power3.out", stagger: 0.07, delay: 0.1, overwrite: "auto" },
      );
      gsap.fromTo(".ct-hero-sub",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.55, overwrite: "auto" });
      gsap.fromTo(".ct-hero-meta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, delay: 0.7, overwrite: "auto" });

      // Scroll reveals
      gsap.utils.toArray<Element>(".ct-reveal").forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.85, ease: ease.out,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      // Magnetic submit button
      const btn = btnRef.current;
      if (!btn) return;
      const onMove  = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width  / 2) * 0.25,
          y: (e.clientY - r.top  - r.height / 2) * 0.25,
          duration: 0.4, ease: "power2.out",
        });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
      btn.addEventListener("mousemove",  onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove",  onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref },
  );

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <div ref={ref} className="min-h-screen bg-(--color-bg) text-(--color-fg)">
      <style>{PAGE_STYLES}</style>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative py-32 px-6 md:px-12 overflow-hidden bracket-frame dot-grid"
        style={{ background: "var(--color-bg)" }}
      >
        <Sparkle size={52} fill="var(--accent2)" className="absolute top-16 right-[10%] rotate-12 opacity-60 pointer-events-none" />
        <Sparkle size={38} fill="var(--accent4)" className="absolute bottom-16 left-[8%] -rotate-6 opacity-55 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-8 opacity-50">
            contact
          </div>

          <h1
            className="font-display italic leading-[0.88] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
          >
            {["Let's", "talk."].map((word, i) => (
              <span
                key={i}
                className="ct-word inline-block align-bottom mr-[0.22em] last:mr-0"
                style={i === 1 ? { color: "var(--color-accent)" } : undefined}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="ct-hero-sub font-script text-2xl md:text-3xl opacity-65 mb-10">
            — we'd love to hear from you. really.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <span className="ct-hero-meta chip" data-tone="accent">
              <Clock className="w-3.5 h-3.5" />
              Avg. response in 24 hrs
            </span>
            <a
              href="mailto:hello@icons.studio"
              className="ct-hero-meta font-display italic text-xl md:text-2xl hover:text-(--color-accent) transition-colors duration-200"
            >
              hello@icons.studio
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-20 border-t border-(--color-border) bracket-frame">
        <div className="max-w-7xl mx-auto ct-form-grid">

          {/* Form */}
          <div className="ct-reveal">
            {sent ? (
              <div className="sticker p-10 md:p-14 flex flex-col items-start gap-6" data-tone="accent">
                <span className="font-display italic text-7xl leading-none">✓</span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display italic text-3xl leading-tight">Message received.</h3>
                  <p className="font-script text-xl opacity-75">
                    — we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {/* Contextual next step */}
                <div className="w-full border-t border-current/20 pt-6 flex flex-col gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                    While you wait
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {form.subject === "creator" ? (
                      <>
                        <Link href="/talents/apply" className="btn-ghost group text-sm" style={{ color: "var(--color-fg)", borderColor: "var(--color-fg)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                          Start your application
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link href="/talents" className="font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-2 opacity-60 hover:opacity-100 transition-opacity self-center" style={{ color: "var(--color-fg)" }}>
                          Browse the roster
                        </Link>
                      </>
                    ) : form.subject === "brand" ? (
                      <>
                        <Link href="/brief-builder" className="btn-ghost group text-sm" style={{ color: "var(--color-fg)", borderColor: "var(--color-fg)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                          Build a brief now
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link href="/talents" className="font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-2 opacity-60 hover:opacity-100 transition-opacity self-center" style={{ color: "var(--color-fg)" }}>
                          Browse creators
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/brief-builder" className="btn-ghost group text-sm" style={{ color: "var(--color-fg)", borderColor: "var(--color-fg)", boxShadow: "3px 3px 0 0 var(--color-fg)" }}>
                          Run a campaign
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link href="/talents" className="font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-2 opacity-60 hover:opacity-100 transition-opacity self-center" style={{ color: "var(--color-fg)" }}>
                          Explore creators
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-40 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: "name",  label: "Full name",     type: "text",  placeholder: "Sara Malik"    },
                    { id: "email", label: "Email address", type: "email", placeholder: "hello@you.com" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label htmlFor={id} className="eyebrow !text-[10px]">{label}</label>
                      <input
                        id={id} required type={type} placeholder={placeholder}
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                        className="bg-transparent border-b border-(--color-border) py-3 text-base outline-none text-(--color-fg) placeholder:text-(--color-muted-fg)/40 focus:border-(--color-accent) transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>

                {/* Subject toggle */}
                <div className="flex flex-col gap-3">
                  <span id="subject-label" className="eyebrow !text-[10px]">I am…</span>
                  <div
                    role="group"
                    aria-labelledby="subject-label"
                    className="grid grid-cols-2 sm:inline-flex sm:flex-wrap gap-1 p-1 rounded-2xl sm:rounded-full border-2"
                    style={{
                      borderColor: "var(--color-fg)",
                      background: "var(--color-bg)",
                      boxShadow: "4px 4px 0 0 var(--color-fg)",
                    }}
                  >
                    {subjectOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={form.subject === opt.value}
                        onClick={() => setForm((f) => ({ ...f, subject: opt.value }))}
                        className="px-4 py-2.5 sm:px-5 sm:py-2 rounded-xl sm:rounded-full font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer text-center"
                        style={
                          form.subject === opt.value
                            ? { background: "var(--color-fg)", color: "var(--color-bg)" }
                            : { background: "transparent", color: "var(--color-fg)", opacity: 0.5 }
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="eyebrow !text-[10px]">Message</label>
                  <textarea
                    id="message" required rows={5} placeholder="Tell us what's on your mind…"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="bg-transparent border-b border-(--color-border) py-3 text-base outline-none resize-none text-(--color-fg) placeholder:text-(--color-muted-fg)/40 focus:border-(--color-accent) transition-colors duration-200"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-40 hidden sm:block">
                    We reply within 24 hours, always.
                  </p>
                  <button
                    ref={btnRef}
                    type="submit"
                    disabled={!form.subject}
                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Send message
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info panel — dark sticker */}
          <aside
            className="ct-reveal sticker flex flex-col justify-between gap-10 p-8 md:p-12"
            data-tone="ink"
          >
            <div className="space-y-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] mb-3"
                  style={{ color: "color-mix(in srgb, var(--color-bg) 50%, transparent)" }}>
                  Email us
                </p>
                <a
                  href="mailto:hello@icons.studio"
                  className="inline-flex items-center gap-2 font-display italic text-xl transition-opacity duration-200 hover:opacity-75"
                  style={{ color: "var(--color-bg)" }}
                >
                  <Mail className="w-4 h-4 shrink-0" /> hello@icons.studio
                </a>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] mb-3"
                  style={{ color: "color-mix(in srgb, var(--color-bg) 50%, transparent)" }}>
                  Press &amp; media
                </p>
                <a
                  href="mailto:press@icons.studio"
                  className="inline-flex items-center gap-2 font-display italic text-xl transition-opacity duration-200 hover:opacity-75"
                  style={{ color: "var(--color-bg)" }}
                >
                  <Mail className="w-4 h-4 shrink-0" /> press@icons.studio
                </a>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] mb-4"
                  style={{ color: "color-mix(in srgb, var(--color-bg) 50%, transparent)" }}>
                  Follow along
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { Icon: Instagram, label: "Instagram", href: "https://instagram.com/icons" },
                    { Icon: Twitter,   label: "Twitter",   href: "https://x.com/icons" },
                    { Icon: Linkedin,  label: "LinkedIn",  href: "https://linkedin.com/company/icons-studio" },
                  ].map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-60"
                      style={{
                        border: "1px solid color-mix(in srgb, var(--color-bg) 25%, transparent)",
                        color: "var(--color-bg)",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div
              className="font-display italic leading-[0.8] select-none -mr-2 -mb-2"
              style={{
                fontSize: "clamp(4rem,8vw,6.5rem)",
                color: "var(--color-bg)",
                opacity: 0.07,
              }}
            >
              icons.
            </div>
          </aside>
        </div>
      </section>

      {/* ── OFFICES ──────────────────────────────────────────────── */}
      <SectionShell eyebrow="Find us" title="Three offices, one team." className="bracket-frame">
        <div className="ct-offices-grid pb-3 pr-3">
          {offices.map((o) => (
            <article key={o.city} className="ct-reveal sticker flex flex-col gap-6 p-8" data-tone={o.tone}>
              {/* Map placeholder */}
              <div
                className="aspect-[4/3] rounded-xl relative overflow-hidden flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.06)" }}
              >
                <MapPin className="w-10 h-10 opacity-20" strokeWidth={1.5} />
                <span
                  className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,0,0,0.08)" }}
                >
                  {o.country}
                </span>
              </div>
              <div>
                <h3 className="font-display italic text-3xl leading-tight mb-1">{o.city}</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-60">{o.address}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 border-t border-(--color-border) bracket-frame"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-4 opacity-50 ct-reveal">
            faq
          </div>
          <h2 className="ct-reveal font-display italic text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] mb-14">
            Quick answers.
          </h2>

          <div className="border-t-2" style={{ borderColor: "var(--color-fg)" }}>
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="ct-reveal border-b-2" style={{ borderColor: "var(--color-fg)" }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                  >
                    <span className="font-display italic text-lg md:text-xl leading-snug">{f.q}</span>
                    <ChevronDown
                      className="shrink-0 transition-transform duration-300"
                      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                      width={20} height={20}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: open ? "200px" : "0px" }}
                  >
                    <p className="font-sans text-base leading-relaxed pb-5 opacity-70">{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-6 md:px-12 dot-grid bracket-frame border-t border-(--color-border)"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-4xl mx-auto relative">
          <Sparkle size={56} fill="var(--accent2)" className="absolute -top-4 -left-4 md:-left-10 -rotate-12 pointer-events-none" />
          <Sparkle size={44} fill="var(--accent3)" className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none" />

          <div
            className="sticker p-10 md:p-16 text-center flex flex-col items-center gap-8"
            data-tone="ink"
          >
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
              <Link
                href="/talents"
                className="btn-ghost"
                style={{
                  background: "transparent",
                  color: "var(--color-bg)",
                  borderColor: "var(--color-bg)",
                  boxShadow: "4px 4px 0 0 var(--color-accent)",
                }}
              >
                Join as creator
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
