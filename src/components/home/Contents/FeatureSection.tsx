import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  theme: "creator" | "brand";
}

export const FeatureSection = ({ title, subtitle, children, theme }: FeatureSectionProps) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            {title.split(" ").map((word, index) => {
              const isItalic = word.startsWith("_") && word.endsWith("_");
              const cleanWord = isItalic ? word.slice(1, -1) : word;
              return (
                <span key={index}>
                  {isItalic ? (
                    <span className={`italic font-light ${theme === "creator" ? "text-lime-500" : "text-purple-600"}`}>
                      {cleanWord}
                    </span>
                  ) : (
                    cleanWord
                  )}{" "}
                </span>
              );
            })}
          </h2>
          {subtitle && (
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
};
