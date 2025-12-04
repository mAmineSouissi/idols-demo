import { motion } from "framer-motion";
import { User, Search, Package, Upload, Target, MessageCircle, BarChart, CreditCard } from "lucide-react";

interface HowItWorksProps {
  theme: "creator" | "brand";
}

const creatorSteps = [
  {
    icon: User,
    title: "Create your profile",
    description: "Showcase your niche, portfolio, and audience demographics to attract the right brands.",
  },
  {
    icon: Search,
    title: "Find collaborations",
    description: "Browse campaigns that match your style and apply to work with brands you love.",
  },
  {
    icon: Package,
    title: "Receive products",
    description: "Get products or compensation details directly through the platform.",
  },
  {
    icon: Upload,
    title: "Create & publish",
    description: "Produce amazing content, submit for approval, and get paid for your creativity.",
  },
];

const brandSteps = [
  {
    icon: Target,
    title: "Define your campaign",
    description: "Set objectives, budget, target audience, and content requirements for your campaign.",
  },
  {
    icon: Search,
    title: "Discover creators",
    description: "Find perfect creators based on audience match, engagement rate, and past performance.",
  },
  {
    icon: MessageCircle,
    title: "Collaborate seamlessly",
    description: "Invite creators, negotiate terms, and manage contracts all in one place.",
  },
  {
    icon: BarChart,
    title: "Track & optimize",
    description: "Monitor campaign performance in real-time with detailed analytics and ROI tracking.",
  },
];

export const HowItWorks = ({ theme }: HowItWorksProps) => {
  const steps = theme === "creator" ? creatorSteps : brandSteps;
  const accentColor = theme === "creator" ? "lime" : "purple";

  return (
    <section className="py-24 px-6 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-16"
        >
          How <span className={`italic font-light ${theme === "creator" ? "text-lime-500" : "text-purple-600"}`}>does it work?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    theme === "creator" ? "bg-lime-100" : "bg-purple-100"
                  }`}>
                    <Icon className={`w-7 h-7 ${theme === "creator" ? "text-lime-600" : "text-purple-600"}`} />
                  </div>
                  <div className={`text-sm font-bold mb-3 ${theme === "creator" ? "text-lime-600" : "text-purple-600"}`}>
                    {index + 1}.
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
