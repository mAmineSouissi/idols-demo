"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { cn } from "@/lib/utils";
import { sponsors } from "../data/sponsors";

interface SponsorsProps {
  className?: string;
}

export const Sponsors = ({ className }: SponsorsProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center mb-10 w-full",
        className
      )}
    >
      <AnimatedTooltip items={sponsors} />
    </div>
  );
};
