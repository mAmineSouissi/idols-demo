import { motion } from "framer-motion";

export const WeDoSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-row justify-between items-center w-full px-8 gap-x-6 py-24">
        <div>
          <h2 className="text-[250px] font-bold mb-8 text-secondary/60 dark:text-accent leading-none">
            WE
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed dark:text-base text-(--color-fg)">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
            nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
            ex ea commodo consequat.
          </p>
        </div>
        <div>
          <h2 className="text-[250px] font-bold mb-8 text-primary/60 leading-none">
            DO
          </h2>
        </div>
      </div>
    </motion.div>
  );
};
