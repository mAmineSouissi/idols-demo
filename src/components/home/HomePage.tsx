import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Preloader } from "@/components/shared/Preloader";
import { HeroCampaign } from "@/components/home/Contents/campaign/HeroCampaign";
import { AppTilesScene } from "@/components/home/Contents/campaign/AppTilesScene";
import { WhyGenZ } from "@/components/home/Contents/campaign/WhyGenZ";
import { HowSticker } from "@/components/home/Contents/campaign/HowSticker";
import { BrandsValueSection } from "@/components/home/Contents/campaign/BrandsValueSection";
import { BrandSocialProof } from "@/components/home/Contents/campaign/BrandSocialProof";
import { CtaSticker } from "@/components/home/Contents/campaign/CtaSticker";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const HomePage = () => {
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem("icons-intro-seen") ? false : true,
  );

  React.useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handlePreloaderComplete = React.useCallback(() => {
    sessionStorage.setItem("icons-intro-seen", "1");
    setLoading(false);
  }, []);

  if (!mounted) {
    return <div className="min-h-[300svh]" style={{ background: "var(--color-bg)" }} />;
  }

  return (
    <React.Fragment>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className="relative bg-(--color-bg) text-(--color-fg)"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <HeroCampaign ready={!loading} />
        <AppTilesScene />
        <WhyGenZ />
        <BrandSocialProof />
        <BrandsValueSection />
        <HowSticker />
        <CtaSticker />
      </div>
    </React.Fragment>
  );
};
