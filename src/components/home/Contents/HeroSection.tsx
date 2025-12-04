import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ opacity, scale }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-(--color-accent) rounded-full blur-[150px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-(--color-accent-2) rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>

      <motion.div style={{ opacity, y }} className="text-center mb-16 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateX: 45 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            type: "spring",
            stiffness: 100,
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Logo />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-xl text-black max-w-2xl mx-auto"
        >
          Connect with brands. Create content. Build your empire.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="text-center max-w-5xl z-10"
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
        <span className="text-sm text-(--color-muted) uppercase tracking-wider">
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
          <ChevronDown className="w-6 h-6 text-(--color-accent) group-hover:text-(--color-accent-2) transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};
