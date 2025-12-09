import { ThemeToggle } from "./ThemeToggle";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ShinyText from "@/components/shared/ShinyText";
import TextType from "@/components/shared/TextType";

interface HeroSectionProps {
  onThemeChange: (theme: "dark" | "light") => void;
}

export const HeroSection = ({ onThemeChange }: HeroSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ opacity, scale }}
      >
        <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-(--color-accent) rounded-md blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-(--color-accent-2) rounded-md blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>

      {/* Photo overlay background */}
      <div className="absolute inset-0 opacity-28 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/twoHands.png')] bg-size-[60%] bg-no-repeat bg-center blur-md" />
        {/* Edge blur overlays to hide watermark without covering the center art */}
        <div className="absolute left-0 top-0 h-full w-2/5 bg-gradient-to-r from-[var(--color-bg)] from-10% via-[var(--color-bg)] via-50% to-transparent" />
        <div className="absolute right-0 top-0 h-full w-2/5 bg-gradient-to-l from-[var(--color-bg)] from-10% via-[var(--color-bg)] via-50% to-transparent" />
      </div>

      <motion.div style={{ opacity, y }} className="text-center mb-10 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-8xl font-bold text-(--color-fg) tracking-tight"
        >
          <ShinyText
            text="Idols"
            className="text-[8rem] md:text-8xl font-bold text-(--color-fg)"
          />
          <span className="text-[8rem] text-(--color-accent)">.</span>
        </motion.h1>
        <TextType
          text={[
            "The UGC platform",
            "Where creativity meets opportunity.",
            "Join us today!",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          className="text-[3rem]"
          cursorCharacter="|"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="text-center max-w-5xl z-10 mt-4"
        style={{ opacity }}
      >
        <ThemeToggle onThemeChange={onThemeChange} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer group z-10"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="text-sm text-(--color-fg) uppercase tracking-wider">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-6 h-6 text-(--color-muted) group-hover:text-(--color-accent-2) transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};
