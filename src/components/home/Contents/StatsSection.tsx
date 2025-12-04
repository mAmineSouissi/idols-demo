import { motion } from "framer-motion";

const creatorStats = [
  { value: "100K+", label: "Active Creators" },
  { value: "500+", label: "Brand Partners" },
  { value: "$10M+", label: "Paid to Creators" },
  { value: "95%", label: "Success Rate" },
];

const brandStats = [
  { value: "500+", label: "Brands Trust Us" },
  { value: "100K+", label: "Creator Network" },
  { value: "5M+", label: "Campaign Reach" },
  { value: "3.5x", label: "Average ROI" },
];

export const StatsSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                duration: 0.7,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center cursor-pointer"
            >
              <div
                className={`text-5xl md:text-6xl font-bold mb-2 ${
                  theme === "creator" ? "text-lime-500" : "text-purple-600"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-foreground/70 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div> */}
        Stats Section
      </div>
    </section>
  );
};
