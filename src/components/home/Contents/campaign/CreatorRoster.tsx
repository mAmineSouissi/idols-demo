import { useRef } from "react";
import gsap from "gsap";
import { Sparkle } from "@/components/ui/Sparkle";
import { useEntrance } from "@/hooks/animations";
import { dur, ease } from "@/lib/motion";

type Creator = {
  handle: string;
  niche: string;
  followers: string;
  tone: "accent" | "pink" | "blue" | "yellow" | "cream";
  rate: string;
};

const CREATORS: Creator[] = [
  { handle: "@maeve.studies", niche: "Study / GRWM", followers: "412K", tone: "accent", rate: "$1.2K / reel" },
  { handle: "@kxng.cooks", niche: "Food / one-pot", followers: "1.1M", tone: "pink", rate: "$3.4K / reel" },
  { handle: "@iz.fits", niche: "Streetwear hauls", followers: "286K", tone: "blue", rate: "$900 / reel" },
  { handle: "@ren.makes", niche: "DIY / crafts", followers: "528K", tone: "yellow", rate: "$1.6K / reel" },
  { handle: "@dani.runs", niche: "Run-tok", followers: "192K", tone: "cream", rate: "$650 / reel" },
  { handle: "@sol.thrifts", niche: "Y2K thrift", followers: "740K", tone: "accent", rate: "$2.1K / reel" },
];

export const CreatorRoster = () => {
  const ref = useRef<HTMLElement>(null);

  useEntrance({
    scope: ref,
    selector: ".roster-eyebrow",
    x: -20,
    duration: dur.fast + 0.15,
    ease: ease.out,
    scrollTrigger: { start: "top 80%" },
  });

  useEntrance({
    scope: ref,
    selector: ".roster-headline",
    y: 30,
    duration: dur.base + 0.1,
    ease: "power3.out",
    scrollTrigger: { start: "top 75%" },
  });

  useEntrance({
    scope: ref,
    selector: ".roster-card",
    y: 50,
    scale: 0.9,
    rotate: () => gsap.utils.random(-5, 5),
    duration: 0.75,
    ease: "back.out(1.7)",
    stagger: 0.08,
    scrollTrigger: { start: "top 65%" },
    // Let the inline base rotation from JSX take over after entrance.
    clearProps: false,
  });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 md:px-12 overflow-hidden bracket-frame"
      style={{ background: "var(--panel-2)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <div className="roster-eyebrow font-mono text-[12px] tracking-[0.32em] uppercase mb-6">
              05 · the roster
            </div>
            <h2 className="roster-headline font-display italic text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] max-w-3xl">
              Real talent. <br /> Real rates.
            </h2>
          </div>

          <div className="font-script text-2xl md:text-3xl text-(--color-fg) max-w-xs">
            — yes, the rates are public on&nbsp;purpose
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
          {CREATORS.map((c, i) => (
            <article
              key={c.handle}
              data-tone={c.tone}
              className="roster-card sticker p-6 md:p-7 flex flex-col gap-5 min-h-[280px]"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.6}deg)` }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-14 h-14 rounded-full border-2 border-(--color-fg) flex items-center justify-center font-display text-xl italic"
                  style={{ background: "var(--panel)" }}
                >
                  {c.handle[1]?.toUpperCase()}
                </div>
                <Sparkle size={36} fill="var(--accent4)" strokeWidth={6} />
              </div>

              <div>
                <div className="font-display italic text-2xl md:text-[1.6rem] leading-[1.05] tracking-[-0.02em]">
                  {c.handle}
                </div>
                <div className="font-mono text-[11px] tracking-[0.25em] uppercase mt-1 opacity-80">
                  {c.niche}
                </div>
              </div>

              <div className="mt-auto flex items-end justify-between gap-3 pt-3 border-t-2 border-(--color-fg)/20">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-70">
                    followers
                  </div>
                  <div className="font-display italic text-2xl leading-none mt-1">
                    {c.followers}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-70">
                    avg
                  </div>
                  <div className="font-display italic text-xl leading-none mt-1">
                    {c.rate}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
