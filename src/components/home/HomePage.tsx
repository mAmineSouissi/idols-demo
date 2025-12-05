import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar/NavBar";
import { HeroSection } from "@/components/home/Contents/HeroSection";
import { WeAreSection } from "@/components/home/Contents/WeAreSection/WeAreSection";
import { ScrollingCardsSection } from "@/components/home/Contents/ScrollingCardsSection/ScrollingCardsSection";
import { HowSection } from "@/components/home/Contents/HowSection/HowSection";
import { WeDoSection } from "@/components/home/Contents/WeDoSection/WeDoSection";
import { AboutSection } from "@/components/home/Contents/AboutUs/AboutSection";
import { SkillsSection } from "@/components/home/Contents/SkillsSection";
import { PlatformSection } from "@/components/home/Contents/PlatformSection";

export const HomePage = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-(--color-bg) text-(--color-fg) transition-colors duration-500">
      {/* Navbar */}
      <Navbar />

      {/* Ambient background effect */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-(--color-accent) rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-(--color-accent-2) rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <main className="relative z-10">
        <HeroSection onThemeChange={handleThemeChange} />

        <WeAreSection />

        <ScrollingCardsSection />

        <HowSection />

        <WeDoSection />

        <AboutSection />

        <SkillsSection />

        <PlatformSection />
      </main>
    </div>
  );
};
