"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import {
  useScrollAnimation,
  useReducedMotion,
} from "@/hooks/useScrollAnimation";
import { fadeInUp } from "@/lib/motion-variants";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  variants = fadeInUp,
  delay = 0,
}: AnimatedSectionProps) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
