import { motion } from "framer-motion";
import { Button } from "@/components/ui/moving-border";
import { ArrowRight, Zap, Users, Rocket } from "lucide-react";

export const PlatformSection = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Deploy campaigns in minutes, not weeks",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Creator Network",
      description: "Connect with thousands of vetted creators",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Scale Results",
      description: "Grow your brand with proven UGC strategies",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-(--color-bg)/50 to-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-(--color-fg) tracking-wider uppercase">
            trusted by leading brands and creators
          </p>
          <div className="mt-6 flex justify-center gap-8 opacity-50">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-(--color-accent) to-(--color-accent-2) opacity-20"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
