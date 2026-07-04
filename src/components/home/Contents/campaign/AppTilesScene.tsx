import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProfileCard from "@/components/ui/ProfileCard";

type Creator = {
  name: string;
  handle: string;
  title: string;
  status: string;
  avatarUrl: string;
  innerGradient: string;
  behindGlowColor: string;
};

const CREATORS: Creator[] = [
  {
    name: "Maeve Kim",
    handle: "maeve.studies",
    title: "Study / GRWM · 412K",
    status: "Available for collabs",
    avatarUrl: "https://i.pravatar.cc/400?img=44",
    innerGradient:
      "linear-gradient(145deg, rgba(197,255,61,0.22) 0%, rgba(8,8,8,0.96) 100%)",
    behindGlowColor: "rgba(197,255,61,0.45)",
  },
  {
    name: "Kxng Diallo",
    handle: "kxng.cooks",
    title: "Food / One-pot · 1.1M",
    status: "Booking Q3 2026",
    avatarUrl: "https://i.pravatar.cc/400?img=12",
    innerGradient:
      "linear-gradient(145deg, rgba(255,61,139,0.22) 0%, rgba(8,8,8,0.96) 100%)",
    behindGlowColor: "rgba(255,61,139,0.45)",
  },
  {
    name: "Iz Reyes",
    handle: "iz.fits",
    title: "Streetwear · 286K",
    status: "Open to brands",
    avatarUrl: "https://i.pravatar.cc/400?img=29",
    innerGradient:
      "linear-gradient(145deg, rgba(61,187,255,0.22) 0%, rgba(8,8,8,0.96) 100%)",
    behindGlowColor: "rgba(61,187,255,0.45)",
  },
  {
    name: "Ren Mako",
    handle: "ren.makes",
    title: "DIY / Crafts · 528K",
    status: "Available for collabs",
    avatarUrl: "https://i.pravatar.cc/400?img=53",
    innerGradient:
      "linear-gradient(145deg, rgba(255,218,61,0.22) 0%, rgba(8,8,8,0.96) 100%)",
    behindGlowColor: "rgba(255,218,61,0.45)",
  },
];

// Duplicate for seamless loop
const MARQUEE_CREATORS = [...CREATORS, ...CREATORS];

export const AppTilesScene = () => {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Headline word reveal on scroll
      gsap.from(".aptsection-word", {
        yPercent: 110,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });

      gsap.from(".aptsection-sub", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.45,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });

      // Marquee: scroll left infinitely
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 36,
          repeat: -1,
        });
      }
    },
    { scope: ref },
  );

  const words = ["One", "platform.", "Talent.", "Brands.", "Results."];

  return (
    <section
      ref={ref}
      className="relative pt-28 md:pt-36 pb-0 bg-(--color-fg) text-(--color-bg) overflow-hidden bracket-frame"
    >
      {/* Dot grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(245,241,234,0.06) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(197,255,61,0.1), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          right: "-8%",
          width: "420px",
          height: "420px",
          background:
            "radial-gradient(circle, rgba(255,61,139,0.08), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Headline */}
      <div className="px-6 max-w-7xl mx-auto">
        <h2
          className="aptsection-headline font-display leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 9vw, 10rem)" }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom mr-[0.2em] last:mr-0"
            >
              <span
                className="aptsection-word inline-block"
                style={{
                  color: word === "Talent." ? "var(--accent)" : undefined,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        <p
          className="aptsection-sub font-mono text-[11px] tracking-[0.28em] uppercase mt-14 md:mt-20 text-(--color-bg)/45"
          style={{ maxWidth: "38ch" }}
        >
          talent · brands · campaigns · payments · analytics — all in one place.
        </p>
      </div>

      {/* Creator cards marquee */}
      <div className="relative mt-16 md:mt-20 overflow-hidden">
        {/* Side fade masks */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 z-10 pointer-events-none"
          style={{
            width: "120px",
            background:
              "linear-gradient(to right, var(--color-fg), transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 z-10 pointer-events-none"
          style={{
            width: "120px",
            background:
              "linear-gradient(to left, var(--color-fg), transparent)",
          }}
        />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-5 px-5 pb-12"
          style={{ willChange: "transform" }}
        >
          {MARQUEE_CREATORS.map((creator, i) => (
            <div key={i} className="shrink-0" style={{ width: "286px" }}>
              <ProfileCard
                name={creator.name}
                handle={creator.handle}
                title={creator.title}
                status={creator.status}
                avatarUrl={creator.avatarUrl}
                innerGradient={creator.innerGradient}
                behindGlowColor={creator.behindGlowColor}
                behindGlowSize="45%"
                contactText=""
                showUserInfo
                enableTilt
                enableMobileTilt={false}
                maxHeight={400}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
