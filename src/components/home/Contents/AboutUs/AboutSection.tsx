import { motion } from "framer-motion";
import { AboutUsCard } from "./AboutUsCard";

export const AboutSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[8rem] underline md:text-7xl mb-6">
            ABOUT US
          </h2>
          <AboutUsCard />
        </motion.div>
      </div>
    </section>
  );
};
