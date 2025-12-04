import { motion } from "framer-motion";
import { CenterContent } from "./CenterContent";
import { UpperContent } from "./UpperContent";
import { BottomContent } from "./BottomContent";

export const WeAreSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-1 flex-col justify-center items-center content-center"
    >
      <UpperContent />
      <CenterContent />
      <BottomContent />
    </motion.div>
  );
};
