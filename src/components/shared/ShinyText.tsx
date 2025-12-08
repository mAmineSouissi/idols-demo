"use client";

import * as React from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type ShinyTextProps = React.ComponentProps<"span"> & {
  text: string;
  gradient?: string;
  neon?: boolean;
  transition?: Transition;
};

function ShinyText({
  text,
  className,
  gradient = "linear-gradient(90deg, currentColor 0%, rgba(255,255,255,0.95) 50%, currentColor 100%)",
  neon = false,
  transition = { duration: 3, repeat: Infinity, ease: "linear" },
  ...props
}: ShinyTextProps) {
  const baseStyle: React.CSSProperties = {
    backgroundImage: gradient,
    color: "var(--color-fg)",
    textShadow: "0 0 1px rgba(0,0,0,0.25)",
  };

  return (
    <span
      data-slot="shiny-text"
      className={cn("relative inline-block", className)}
      {...(props as any)}
    >
      <motion.span
        className="m-0 text-transparent bg-clip-text bg-[length:200%_100%]"
        style={baseStyle}
        animate={{ backgroundPositionX: ["0%", "200%"] }}
        transition={transition}
      >
        {text}
      </motion.span>

      {neon && (
        <motion.span
          className="m-0 absolute top-0 left-0 text-transparent bg-clip-text blur-[8px] mix-blend-plus-lighter bg-[length:200%_100%]"
          style={baseStyle}
          animate={{ backgroundPositionX: ["0%", "200%"] }}
          transition={transition}
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}

export default ShinyText;
