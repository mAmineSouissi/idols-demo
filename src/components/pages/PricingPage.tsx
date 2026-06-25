"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, ChevronDown, Lock } from "lucide-react";
import { Sparkle } from "@/components/ui/Sparkle";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────── */

const BRAND_PLANS = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    badge: "Try it out",
    tone: "cream",
    highlight: false,
    trial: "14-day free trial",
    unlocks: "10 creator profiles",
    features: [
      "3 active campaigns",
      "Up to 10 creators per brief",
      "Basic analytics dashboard",
      "Email support",
      "48h brief-to-live",
    ],
    cta: "Start free trial",
    href: "/brief-builder",
  },
  {
    name: "Growth",
    price: "$799",
    period: "/mo",
    badge: "Most popular",
    tone: "accent",
    highlight: true,
    trial: "14-day free trial",
    unlocks: "30 creator profiles",
    features: [
      "10 active campaigns",
      "Up to 30 creators per brief",
      "Advanced analytics + exports",
      "Dedicated campaign manager",
      "Priority creator matching",
      "Custom brief templates",
    ],
    cta: "Get started",
    href: "/brief-builder",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    badge: "Agencies & large teams",
    tone: "ink",
    highlight: false,
    trial: "Tailored onboarding",
    unlocks: "Full roster — unlimited",
    features: [
      "Unlimited campaigns",
      "Unlimited creators",
      "White-glove onboarding",
      "SLA + API access",
      "Custom contracts",
      "Quarterly business reviews",
    ],
    cta: "Talk to us",
    href: "/contact",
  },
];

const CREATOR_TIERS = [
  {
    tier: "Rising",
    commission: "20%",
    keep: "80%",
    unlock: "New creators",
    tone: "cream",
    perks: [
      "Access to all brand briefs",
      "48h payout on delivery",
      "Creator dashboard",
      "Performance analytics",
    ],
  },
  {
    tier: "Icon",
    commission: "15%",
    keep: "85%",
    unlock: "After 5 delivered campaigns",
    tone: "accent",
    perks: [
      "Everything in Rising",
      "Priority brief matching",
      "Performance bonuses",
      "Verified profile badge",
    ],
  },
  {
    tier: "Elite",
    commission: "12%",
    keep: "88%",
    unlock: "After 20 delivered campaigns",
    tone: "pink",
    perks: [
      "Everything in Icon",
      "Invite-only premium briefs",
      "Direct brand relationships",
      "Dedicated account manager",
    ],
  },
  {
    tier: "Legend",
    commission: "10%",
    keep: "90%",
    unlock: "50+ campaigns · top performer",
    tone: "ink",
    perks: [
      "Everything in Elite",
      "Custom rate negotiations",
      "IRL Icons events & drops",
      "Brand equity deal access",
    ],
  },
];

const FAQS = [
  {
    q: "Is there a free trial for brands?",
    a: "Yes — all brand plans include a 14-day free trial. No credit card required to start. You can run real campaigns during the trial.",
  },
  {
    q: "Why is creator profile access gated behind payment?",
    a: "Creator data — audience breakdowns, past campaign results, and contact details — is exclusive to verified brand partners. This protects creators from spam and ensures every connection is a qualified opportunity.",
  },
  {
    q: "When do creators get paid?",
    a: "Within 48 hours of content approval. No invoice chasing, no 30-day net terms. Approval happens within 24h of delivery.",
  },
  {
    q: "Can I cancel or change plans anytime?",
    a: "Yes. All plans are billed monthly and cancel at the end of the billing period. Upgrade or downgrade instantly from your dashboard.",
  },
  {
    q: "How are creators vetted?",
    a: "Every creator is manually reviewed for content quality, engagement authenticity, and brand-safety before they can accept their first campaign. We also monitor ongoing.",
  },
  {
    q: "Does Icons take a cut from brand payments?",
    a: "The platform fee is built into creator payouts — brands pay the quoted rate, creators receive their tier percentage. No hidden fees on either side.",
  },
];

const LOCKED_CREATORS = [
  { init: "M", tone: "gradient-warm",   followers: "412K",  platform: "Instagram" },
  { init: "K", tone: "gradient-cool",   followers: "1.2M",  platform: "YouTube"   },
  { init: "P", tone: "gradient-accent", followers: "289K",  platform: "Instagram" },
  { init: "T", tone: "gradient-mono",   followers: "640K",  platform: "TikTok"    },
  { init: "N", tone: "gradient-warm",   followers: "186K",  platform: "YouTube"   },
  { init: "D", tone: "gradient-cool",   followers: "523K",  platform: "Instagram" },
  { init: "S", tone: "gradient-accent", followers: "94K",   platform: "TikTok"    },
  { init: "L", tone: "gradient-mono",   followers: "1.8M",  platform: "YouTube"   },
];

/* ─── Locked roster styles ───────────────────────────────────────── */
const LOCKED_STYLES = `
  .pr-locked-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--color-border); }
  @media (min-width: 640px)  { .pr-locked-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (min-width: 1024px) { .pr-locked-grid { grid-template-columns: repeat(8, 1fr); } }
  .pr-locked-card { aspect-ratio: 1/1.4; position: relative; overflow: hidden; }
`;

/* ─── FAQ Item ───────────────────────────────────────────────────── */
const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-2" style={{ borderColor: "var(--color-fg)" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display italic text-lg md:text-xl leading-snug">{q}</span>
        <ChevronDown
          aria-hidden
          className="shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          width={20} height={20}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
        aria-hidden={!open}
      >
        <p className="font-sans text-base leading-relaxed pb-5 opacity-70">{a}</p>
      </div>
    </div>
  );
};

/* ─── Page ───────────────────────────────────────────────────────── */
export const PricingPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [audience, setAudience] = useState<"brands" | "creators">("brands");

  useGSAP(
    () => {
      gsap.fromTo(".pricing-word > span",
        { opacity: 0, y: 48, rotate: 4 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.85, ease: "power3.out", stagger: 0.07, delay: 0.1, overwrite: "auto", clearProps: "transform,opacity" },
      );

      gsap.fromTo(".pricing-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.55 },
      );

      gsap.fromTo(".pricing-toggle",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.7 },
      );

      gsap.fromTo(".pr-locked-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.05,
          scrollTrigger: { trigger: ".pr-locked-section", start: "top 95%", once: true } },
      );

      gsap.fromTo(".pricing-card",
        { opacity: 0, y: 60, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "back.out(1.6)", stagger: 0.1,
          scrollTrigger: { trigger: ".pricing-cards", start: "top 95%", once: true } },
      );

      gsap.fromTo(".pricing-faq-item",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08,
          scrollTrigger: { trigger: ".pricing-faq", start: "top 95%", once: true } },
      );

      gsap.fromTo(".pricing-cta",
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".pricing-cta", start: "top 95%", once: true } },
      );
    },
    { scope: ref },
  );

  const headline = ["Simple", "pricing.", "No", "surprises."];

  return (
    <div ref={ref} className="relative">
      <style>{LOCKED_STYLES}</style>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative py-32 px-6 md:px-12 overflow-hidden bracket-frame dot-grid"
        style={{ background: "var(--color-bg)" }}
      >
        <Sparkle size={52} fill="var(--accent2)" className="absolute top-16 right-[10%] rotate-12 opacity-60 pointer-events-none" />
        <Sparkle size={40} fill="var(--accent4)" className="absolute bottom-16 left-[8%] -rotate-6 opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-8 opacity-50">
            pricing
          </div>

          <h1
            className="font-display italic leading-[0.88] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
          >
            {headline.map((word, i) => (
              <span
                key={i}
                className="pricing-word inline-block align-bottom mr-[0.22em] last:mr-0"
              >
                <span
                  className="inline-block"
                  style={i === 1 || i === 3 ? { color: "var(--color-accent)" } : undefined}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p className="pricing-sub font-script text-2xl md:text-3xl opacity-65 mb-16">
            — transparent rates for creators and brands alike
          </p>

          {/* Audience toggle */}
          <div
            role="group"
            aria-label="View pricing for"
            className="pricing-toggle inline-flex items-center gap-1 p-1 rounded-full border-2"
            style={{
              borderColor: "var(--color-fg)",
              background: "var(--color-bg)",
              boxShadow: "4px 4px 0 0 var(--color-fg)",
            }}
          >
            {(["brands", "creators"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAudience(tab)}
                aria-pressed={audience === tab}
                className="px-6 py-2 rounded-full font-mono text-[11px] tracking-[0.22em] uppercase transition-all duration-200"
                style={
                  audience === tab
                    ? { background: "var(--color-fg)", color: "var(--color-bg)" }
                    : { background: "transparent", color: "var(--color-fg)", opacity: 0.5 }
                }
              >
                For {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locked creator teaser — brands only ───────────────────── */}
      {audience === "brands" && (
        <section className="pr-locked-section relative overflow-hidden border-t border-b border-(--color-border)">
          {/* Blurred grid */}
          <div className="pr-locked-grid" style={{ filter: "blur(4px) brightness(0.6)", userSelect: "none" }}>
            {LOCKED_CREATORS.map((c, i) => (
              <div key={i} className="pr-locked-card">
                <div className={`${c.tone} absolute inset-0`} />
                <div aria-hidden className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                <span aria-hidden className="font-display absolute inset-0 flex items-center justify-center select-none"
                  style={{ fontSize: "4.5rem", opacity: 0.1, color: "var(--color-fg)", fontStyle: "italic" }}>
                  {c.init}
                </span>
                <div className="absolute top-3 right-3 font-mono text-[9px] px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.7)", color: "rgba(0,0,0,0.7)" }}>
                  {c.followers}
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] mb-0.5"
                    style={{ color: "rgba(0,0,0,0.45)" }}>{c.platform}</p>
                  <p className="font-display text-base leading-none" style={{ color: "rgba(0,0,0,0.6)" }}>████</p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.42)", backdropFilter: "blur(3px)" }}>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "var(--color-accent)", boxShadow: "0 0 0 8px color-mix(in srgb, var(--color-accent) 20%, transparent)" }}
            >
              <Lock className="w-6 h-6" style={{ color: "rgba(0,0,0,0.85)" }} strokeWidth={2.5} />
            </div>
            <div className="text-center px-6">
              <p className="font-display italic text-2xl md:text-3xl text-white leading-tight mb-2">
                10,000+ creator profiles
              </p>
              <p className="font-script text-lg md:text-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                — unlocked the moment your plan is active
              </p>
            </div>
            <div className="flex items-center gap-6 mt-2">
              {["Audience analytics", "Past campaigns", "Contact details", "Brand-safety score"].map(item => (
                <span key={item} className="hidden md:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Lock className="w-2.5 h-2.5" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Plans / Tiers ─────────────────────────────────────────── */}
      <section
        className="pricing-cards relative py-24 px-6 md:px-12 bracket-frame"
        style={{ background: "var(--color-panel)" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ── Brand plans ── */}
          {audience === "brands" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BRAND_PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className="pricing-card sticker flex flex-col gap-0 overflow-hidden"
                  data-tone={plan.tone}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 p-8 md:p-10 pb-0">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.28em] uppercase mb-2 opacity-60">
                        {plan.badge}
                      </div>
                      <div
                        className="font-display italic leading-none tracking-tight"
                        style={{ fontSize: "clamp(1.6rem,3vw,2.25rem)" }}
                      >
                        {plan.name}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display italic leading-none" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="font-mono text-xs opacity-50 ml-1">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Trial note */}
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-55 px-8 md:px-10 pt-4">
                    {plan.trial}
                  </div>

                  {/* Unlock callout */}
                  <div className="mx-8 md:mx-10 mt-5 mb-0 flex items-center gap-2 px-3 py-2.5 rounded-md"
                    style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.08)" }}>
                    <Lock className="w-3.5 h-3.5 shrink-0 opacity-60" strokeWidth={2.5} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
                      Unlocks {plan.unlocks}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 flex-1 p-8 md:p-10 pt-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-sans text-sm leading-snug">
                        <Check width={15} height={15} strokeWidth={2.5} className="shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="px-8 md:px-10 pb-8 md:pb-10">
                    <Link
                      href={plan.href}
                      className="btn-primary mt-2 justify-center"
                      style={
                        plan.tone === "ink"
                          ? { background: "var(--color-accent)", color: "#0a0a0a", borderColor: "var(--color-bg)", boxShadow: "4px 4px 0 0 var(--color-bg)" }
                          : plan.tone === "cream"
                          ? { background: "var(--color-fg)", color: "var(--color-bg)", borderColor: "var(--color-fg)" }
                          : undefined
                      }
                    >
                      {plan.cta}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Creator tiers ── */}
          {audience === "creators" && (
            <div>
              {/* Free to join callout */}
              <div
                className="pricing-card sticker p-6 md:p-8 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                data-tone="accent"
              >
                <div>
                  <div className="font-mono text-[10px] tracking-[0.28em] uppercase mb-1 opacity-70">
                    no upfront cost
                  </div>
                  <h2
                    className="font-display italic leading-none tracking-tight"
                    style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}
                  >
                    Free to join. Always.
                  </h2>
                </div>
                <p className="font-script text-xl md:text-2xl opacity-75 max-w-sm">
                  — we only earn when you earn. platform fee comes from your payout, not your pocket.
                </p>
              </div>

              {/* Tier cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {CREATOR_TIERS.map((tier, i) => (
                  <div
                    key={tier.tier}
                    className="pricing-card sticker flex flex-col gap-5 p-7"
                    data-tone={tier.tone}
                  >
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.28em] uppercase mb-2 opacity-60">
                        {tier.unlock}
                      </div>
                      <div
                        className="font-display italic leading-none tracking-tight"
                        style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)" }}
                      >
                        {tier.tier}
                      </div>
                    </div>

                    {/* Commission rate */}
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display italic leading-none"
                        style={{ fontSize: "clamp(2.5rem,4vw,3.5rem)" }}
                      >
                        {tier.keep}
                      </span>
                      <span className="font-mono text-xs opacity-55">yours</span>
                    </div>

                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">
                      {tier.commission} platform fee
                    </div>

                    <ul className="flex flex-col gap-2 mt-auto">
                      {tier.perks.map((p) => (
                        <li key={p} className="flex items-start gap-2 font-sans text-xs leading-snug">
                          <Check width={13} height={13} strokeWidth={2.5} className="shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    {i === 0 && (
                      <Link href="/talents/apply" className="btn-primary mt-2 justify-center text-sm">
                        Apply now
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-6 opacity-40 text-center">
                Tiers unlock automatically based on delivered campaigns — no applications required.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section
        className="pricing-faq relative py-24 px-6 md:px-12 bracket-frame"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-[12px] tracking-[0.32em] uppercase mb-4 opacity-50">
            faq
          </div>
          <h2 className="font-display italic text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] mb-14">
            Common questions.
          </h2>

          <div className="border-t-2" style={{ borderColor: "var(--color-fg)" }}>
            {FAQS.map((faq) => (
              <div key={faq.q} className="pricing-faq-item">
                <FaqItem q={faq.q} a={faq.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 px-6 md:px-12 dot-grid bracket-frame"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-4xl mx-auto relative">
          <Sparkle size={56} fill="var(--accent2)" className="absolute -top-4 -left-4 md:-left-10 -rotate-12 pointer-events-none" />
          <Sparkle size={44} fill="var(--accent3)" className="absolute -bottom-4 -right-4 md:-right-10 rotate-12 pointer-events-none" />

          <div
            className="pricing-cta sticker p-10 md:p-16 text-center flex flex-col items-center gap-8"
            data-tone="ink"
          >
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase opacity-60 flex items-center gap-2">
              <span>✦</span>
              <span>ready when you are</span>
              <span>✦</span>
            </div>

            <h2 className="font-display italic text-[clamp(2.2rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em]">
              Start today.<br />Pay when it works.
            </h2>

            <p className="font-script text-2xl md:text-3xl opacity-70">
              — no agency, no lock-in, no surprises
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/brief-builder" className="btn-primary">
                Post a brief
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/talents/apply"
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
