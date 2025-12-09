"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const revealScrollbar = () => {
      document.body.classList.add("scrollbar-visible");
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("scrollbar-visible");
      }, 700);
    };

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", revealScrollbar);
    window.addEventListener("scroll", revealScrollbar, { passive: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      lenis.off("scroll", revealScrollbar);
      lenis.destroy();
      window.removeEventListener("scroll", revealScrollbar);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
};
