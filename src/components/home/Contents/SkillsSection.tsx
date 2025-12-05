import { motion } from "framer-motion";
import Carousel from "@/components/shared/Carousel";

const skills = [
  {
    title: "Creator Matching",
    description:
      "AI-powered matching connects brands with the right creators based on audience fit, niche, engagement, and campaign goals. We continuously learn from performance data to improve pairing accuracy.",
    icon: "👥",
  },
  {
    title: "Campaign Management",
    description:
      "Plan, launch, and manage UGC campaigns end-to-end. Collaborate with creators, approve content, track deliverables, and monitor results in a single workflow.",
    icon: "📊",
  },
  {
    title: "Analytics & Insights",
    description:
      "Actionable analytics: CPM, CTR, conversions, audience demographics, sentiment analysis, and ROI tracking — all visualized to help you make data-informed decisions.",
    icon: "📈",
  },
  {
    title: "Content Strategy",
    description:
      "We craft creator-friendly briefs, tone of voice, platform-specific guidelines, and review checklists to ensure content quality and brand consistency across campaigns.",
    icon: "✨",
  },
];

export const SkillsSection = () => {
  return (
    <section className="py-32 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[3.5rem] text-accent-2 dark:text-accent uppercase tracking-wider">
            Our Expertise
          </span>
          <h2 className="text-[1.5rem] md:text-6xl font-bold mt-3 text-secondary">
            What We Do Best
          </h2>
        </motion.div>

        {/* Carousel (react-bits) */}
        <div className="flex justify-center">
          <Carousel
            items={skills.map((s, i) => ({
              title: s.title,
              description: s.description,
              id: i + 1,
              icon: <span className="text-2xl">{s.icon}</span>,
            }))}
            baseWidth={720}
            autoplay
            autoplayDelay={3500}
            pauseOnHover
            loop
            round={false}
          />
        </div>
      </div>

      {/* Background decoration */}
      {/* <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" /> */}
      {/* <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent-2/5 rounded-full blur-[100px] pointer-events-none" /> */}
    </section>
  );
};
