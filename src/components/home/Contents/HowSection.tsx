import { motion } from "framer-motion";

export const HowSection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-7xl md:text-8xl font-bold mb-6 text-(--color-accent)">
            So
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-12">
            How Do We Make It Happen
          </h3>
          <p className="text-lg max-w-3xl mx-auto opacity-80 leading-relaxed">
            Through a seamless platform that connects creators and brands, we
            facilitate authentic partnerships that drive engagement, build
            communities, and deliver measurable results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
