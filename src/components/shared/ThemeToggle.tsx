"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeToggle({ inline }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only run on client
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Theme"
      className={`rounded-full px-3 py-2 text-sm font-medium bg-(--color-panel) text-(--color-fg) border border-(--color-border) hover:opacity-90 transition-opacity ${
        inline ? "" : ""
      }`}
      disabled={!mounted}
    >
      {theme === "light" ? "Brand" : "Creator"}
    </button>
  );
}
