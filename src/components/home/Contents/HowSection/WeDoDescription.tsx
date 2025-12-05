import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WeDoDescriptionProps {
  className?: string;
}

export const WeDoDescription = ({ className }: WeDoDescriptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center",
        className
      )}
    >
      <h2 className="text-[250px] lg:text-8xl font-bold mb-3 text-primary leading-none">
        So
      </h2>
      <h3 className="text-[35px] lg:text-4xl font-bold mb-4 text-secondary">
        How Do We Make It Happen
      </h3>
      <p className="text-sm lg:text-base opacity-75 leading-relaxed text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis.
      </p>
    </motion.div>
  );
};
