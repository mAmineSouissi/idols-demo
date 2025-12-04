import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  onThemeChange: (theme: "dark" | "light") => void;
}

export const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
  const [activeTheme, setActiveTheme] = useState<"dark" | "light">("dark");

  const handleToggle = (theme: "dark" | "light") => {
    setActiveTheme(theme);
    onThemeChange(theme);
  };

  return (
    <motion.div
      className="inline-flex items-center gap-1 glass rounded-full px-2 py-2 border border-(--color-border) shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.button
        onClick={() => handleToggle("dark")}
        className="px-8 py-3 rounded-full font-semibold transition-all relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {activeTheme === "dark" && (
          <motion.div
            layoutId="activeTheme"
            className="absolute inset-0 bg-(--color-accent) rounded-full"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        )}
        <motion.span
          className="relative z-10 font-bold tracking-wide"
          style={{ color: activeTheme === "dark" ? "#000000" : undefined }}
          animate={{
            color: activeTheme === "dark" ? "#000000" : "#000000",
          }}
          transition={{ duration: 0.3 }}
        >
          Creator
        </motion.span>
      </motion.button>

      <motion.button
        onClick={() => handleToggle("light")}
        className={cn(
          "px-8 py-3 rounded-full font-semibold transition-all relative overflow-hidden"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {activeTheme === "light" && (
          <motion.div
            layoutId="activeTheme"
            className="absolute inset-0 bg-(--color-accent-2) rounded-full"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        )}
        <motion.span
          className="relative z-10 font-bold tracking-wide"
          animate={{
            color: activeTheme === "light" ? "#ffffff" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          Brand
        </motion.span>
      </motion.button>
    </motion.div>
  );
};
