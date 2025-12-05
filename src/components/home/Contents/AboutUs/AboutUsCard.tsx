import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export const AboutUsCard = () => {
  return (
    <Card className="bg-transparent border-none overflow-hidden">
      <CardContent>
        <div className="flex flex-row items-stretch">
          {/* Left image */}
          <motion.div
            className="w-1/2 relative overflow-hidden rounded-md"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full h-full">
              <Image
                src="/about.jpg"
                alt="About Us"
                width={1000}
                height={700}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right content */}
          <motion.div
            className="w-1/2 p-4 flex flex-col justify-center text-left gap-4"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[3rem] text-accent-2 dark:text-accent">
              About Us
            </span>
            <h3 className="text-[2.5rem] lg:text-5xl font-extrabold text-accent-2 dark:text-accent leading-tight">
              We Always Make The Best
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground dark:text-(--color-fg)">
              We believe in the power of authentic storytelling. Our platform
              bridges the gap between creative talent and brand vision,
              fostering partnerships that create meaningful content and drive
              real business results.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground dark:text-(--color-fg)">
              With a global network of creators and brands, we're building the
              future of user-generated content marketing — focused on quality,
              creativity, and measurable impact.
            </p>

            <div className="mt-4">
              <motion.button
                whileHover={{ translateY: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-block bg-accent-2 dark:bg-accent text-foreground px-8 py-3 rounded-full font-medium shadow-lg"
              >
                CONTACT US
              </motion.button>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};
