import { PixelImage } from "@/components/ui/shadcn-io/pixel-image";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface LeftContentProps {
  className?: string;
}

export const CenterContent = ({ className }: LeftContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const weX = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100]);
  const areX = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <div
      ref={ref}
      className="flex flex-row w-full justify-between items-center px-4 py-20"
    >
      <motion.div
        className={cn("shrink-0 px-12", className)}
        style={{ x: weX }}
      >
        <motion.h1
          className="text-[180px] md:text-[240px] leading-none font-bold text-bg-foreground dark:text-accent-2"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          WE
        </motion.h1>
        <motion.div
          className="mt-8 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            NO LIMITS (01)
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            JUST IMPACT
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex justify-center"
        style={{ scale: imageScale, rotate: imageRotate }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.3 }}
        >
          <PixelImage src="/dwayneJoson.jpg" grid="6x4" />
        </motion.div>
      </motion.div>

      <motion.div className="shrink px-12" style={{ x: areX }}>
        <motion.h2
          className="text-[180px] md:text-[240px] leading-none font-bold text-bg-foreground dark:text-accent"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          ARE
        </motion.h2>
        <motion.div
          className="mt-8 max-w-xs text-right"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            (02) BOLD IDEAS
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            KILLER EXECUTION
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
