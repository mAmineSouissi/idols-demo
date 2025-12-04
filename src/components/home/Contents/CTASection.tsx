import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  theme: "creator" | "brand";
}

export const CTASection = ({ theme }: CTASectionProps) => {
  const isCreator = theme === "creator";
  
  return (
    <section className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center shadow-2xl ${
          isCreator ? "gradient-creator" : "gradient-brand"
        }`}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          {isCreator ? (
            <>
              Join <span className="italic font-light">100K+ creators</span>
            </>
          ) : (
            <>
              Start your <span className="italic font-light">campaign today</span>
            </>
          )}
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
          {isCreator 
            ? "Connect with top brands and monetize your creativity"
            : "Reach millions through authentic creator partnerships"
          }
        </p>
        <Button 
          size="lg"
          className="bg-white text-foreground hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-xl group"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </section>
  );
};
