import { cn } from "@/lib/utils";

interface BottomContentProps {
  className?: string;
}
export const BottomContent = ({ className }: BottomContentProps) => {
  return (
    <div className={cn("mt-4 bg-black p-6", className)}>
      <p className="text-2xl font-extrabold text-black dark:text-white mb-3">
        IDOLS IS
      </p>
      <p className="text-sm font-bold uppercase text-black dark:text-white leading-relaxed mb-4">
        A CREATIVE PLAYGROUND WHERE IDEAS, STORIES, AND COLLABORATIONS COME TO
        LIFE
      </p>
      <p className="text-xs font-bold text-muted-foreground leading-tight mb-3 border-t border-primary pt-3">
        AT IDOLS, WE DON'T FAKE IT — WE CREATE IT. BUILDING A SPACE WHERE REAL
        CREATORS AND REAL BRANDS MEET THROUGH GENUINE CONTENT THAT ACTUALLY
        CONNECTS.
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        WE'RE NOT HERE FOR PERFECT FILTERS OR FORCED CAMPAIGNS — WE'RE HERE FOR
        STORIES THAT FEEL HUMAN, RAW, AND FULL OF ENERGY.
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed mt-2">
        EVERY POST, EVERY COLLAB, EVERY IDEA IS CRAFTED TO SPARK EMOTION, START
        CONVERSATIONS, AND MAKE IMPACT THAT LASTS.
      </p>
    </div>
  );
};
