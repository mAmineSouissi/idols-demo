import { motion } from "framer-motion";
import Carousel from "@/components/shared/Carousel";
import { Users, BarChart3, TrendingUp, Sparkles } from "lucide-react";

const skills = [
  {
    title: "Creator Matching",
    description:
      "AI-powered matching connects brands with the right creators based on audience fit, niche, engagement, and campaign goals. We continuously learn from performance data to improve pairing accuracy.",
    icon: <Users className="w-8 h-8 text-(--color-fg)" />,
  },
  {
    title: "Campaign Management",
    description:
      "Plan, launch, and manage UGC campaigns end-to-end. Collaborate with creators, approve content, track deliverables, and monitor results in a single workflow.",
    icon: <BarChart3 className="w-8 h-8 text-(--color-fg)" />,
  },
  {
    title: "Analytics & Insights",
    description:
      "Actionable analytics: CPM, CTR, conversions, audience demographics, sentiment analysis, and ROI tracking — all visualized to help you make data-informed decisions.",
    icon: <TrendingUp className="w-8 h-8 text-(--color-fg)" />,
  },
  {
    title: "Content Strategy",
    description:
      "We craft creator-friendly briefs, tone of voice, platform-specific guidelines, and review checklists to ensure content quality and brand consistency across campaigns.",
    icon: <Sparkles className="w-8 h-8 text-(--color-fg)" />,
  },
];

export const SkillsSection = () => {
  return (
    <section className="py-32 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-[3.5rem] text-accent-2 dark:text-accent uppercase tracking-wider">
            Our Expertise
          </span>
          <h2 className="text-[1.5rem] md:text-6xl font-bold mt-3 text-secondary">
            What We Do Best
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <Carousel
            items={skills.map((s, i) => ({
              title: s.title,
              description: s.description,
              id: i + 1,
              icon: s.icon,
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
    </section>
  );
};
