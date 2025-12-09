"use client";
import React from "react";
import { MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { Button } from "@/components/ui/moving-border";

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
        "fixed top-0 inset-x-0 w-full bg-bg/65 z-50 shadow-[0_2px_20px_0_rgba(0,0,0,0.08)] dark:shadow-[0_2px_20px_0_rgba(0,0,0,0.3)]",
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
              className="relative w-[220px] h-[70px]"
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <nav className="flex items-center gap-1 bg-opacity-30">
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
          <div>
            <Button borderRadius="1rem" duration={3000}>
              Join Us
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
