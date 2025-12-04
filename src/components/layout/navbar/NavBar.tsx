"use client";
import React from "react";
import { MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = React.useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine logo based on theme
  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/logoWhite.png" : "/logoBlack.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 w-full z-50 bg-(--color-bg) shadow-[0_2px_20px_0_rgba(0,0,0,0.08)] dark:shadow-[0_2px_20px_0_rgba(0,0,0,0.3)]",
        className
      )}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex items-center justify-between h-24 relative px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Logo on the far left */}
          <Link href="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative w-[220px] h-[70px] hover:opacity-90 transition-opacity"
            >
              {mounted && (
                <Image
                  src={logoSrc}
                  alt="Idols Logo"
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </motion.div>
          </Link>

          {/* Center menu with simple items - no dropdowns */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <nav className="flex items-center gap-1">
              <MenuItem
                setActive={setActive}
                active={active}
                item="Creator"
                simple
              />
              <MenuItem
                setActive={setActive}
                active={active}
                item="Brand"
                simple
              />
              <MenuItem
                setActive={setActive}
                active={active}
                item="Blog"
                simple
              />
            </nav>
          </div>

          {/* Join Us button on the far right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="default"
              size="sm"
              className="relative overflow-hidden group px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-xl"
              asChild
            >
              <Link href="/join">
                <span className="relative z-10">Join Us</span>
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
