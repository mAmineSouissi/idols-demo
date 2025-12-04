import { motion } from "framer-motion";

const skills = [
  { name: "Creator Matching", level: 95 },
  { name: "Campaign Management", level: 90 },
  { name: "Analytics & Insights", level: 88 },
  { name: "Content Strategy", level: 92 },
];

export const SkillsSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Our Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{ x: 10 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">{skill.name}</span>
                <span className="text-lg font-bold">{skill.level}%</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative h-3 bg-secondary rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full rounded-full bg-accent"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
