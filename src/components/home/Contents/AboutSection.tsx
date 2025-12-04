import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-12 tracking-wider">
            ABOUT US
          </h2>
          <p className="text-xl max-w-4xl mx-auto opacity-80 leading-relaxed mb-8">
            We believe in the power of authentic storytelling. Our platform
            bridges the gap between creative talent and brand vision, fostering
            partnerships that create meaningful content and drive real business
            results.
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-70 leading-relaxed">
            With a global network of creators and brands, we're building the
            future of user-generated content marketing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
