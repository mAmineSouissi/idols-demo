import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const PlatformSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-8">meet</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-12">
            the UGC platform
          </h3>
          <p className="text-xl opacity-80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where creativity meets opportunity. Join thousands of creators and
            brands building authentic connections and driving real results.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-(--color-accent) hover:opacity-90 text-black font-semibold px-8 py-6 rounded-full text-lg group hover:scale-105 transition-all"
          >
            <a href="/signup">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
