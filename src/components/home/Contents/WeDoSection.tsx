import { motion } from "framer-motion";


export const WeDoSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-24 items-center"
        >
          <div>
            <h2 className="text-8xl font-bold mb-8 text-(--color-accent)">
              WE
            </h2>
            <p className="text-lg leading-relaxed text-(--color-muted)">
              Empower creators to monetize their creativity and build
              sustainable careers through brand partnerships.
            </p>
          </div>
          <div>
            <h2 className="text-8xl font-bold mb-8 text-(--color-accent)">
              DO
            </h2>
            <p className="text-lg leading-relaxed text-(--color-muted)">
              Help brands reach authentic audiences through creator-led
              campaigns that drive real engagement and conversions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
