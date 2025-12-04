import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface UpperContentProps {
  className?: string;
}

const textLines = [
  { text: "WE ARE WE ARE", size: "text-sm" },
  { text: "IDOLS IDOLS", size: "text-2xl" },
  { text: "AND WE'RE AND WE'RE", size: "text-sm" },
  { text: "HERE TO HERE TO", size: "text-sm" },
  { text: "STEAL THE STEAL THE", size: "text-sm" },
  { text: "SPOTLIGHT. SPOTLIGHT.", size: "text-sm" },
];

export const UpperContent = ({ className }: UpperContentProps) => {
  return (
    <div
      className={cn("justify-center content-center items-center", className)}
    >
      <motion.div
        className="text-center mb-4 space-y-1"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {textLines.map((line, index) => (
          <motion.p
            key={index}
            className={`${line.size} font-bold text-(--color-fg)`}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            {line.text}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
};
