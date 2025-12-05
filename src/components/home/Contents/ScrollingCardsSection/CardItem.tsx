import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardItemProps {
  className?: string;
  title?: string;
  badge?: string;
  description?: string;
  src?: string;
  bgColor?: string;
  textColor?: string;
  accent?: string;
}

export const CardItem = ({
  className,
  title,
  badge,
  description,
  src,
  bgColor,
  textColor,
}: CardItemProps) => {
  return (
    <Card
      className={cn(
        "h-[400px]! rounded-md! shadow-2xl! my-2! group transition-all duration-300 hover:shadow-3xl border-0 -pr-4 pl-4",
        textColor,
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      <CardContent className="flex flex-row items-center h-full w-full gap-3 px-6 justify-between">
        {/* Left side - Text content */}
        <div className="flex flex-col justify-between w-1/2 pr-4">
          <div>
            {badge && (
              <span className="inline-flex px-3 py-1 font-medium bg-black/5 dark:bg-white/10">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-bold mt-3 mb-3 leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm leading-relaxed opacity-85">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right side - Image (fit without cropping, subtle hover zoom) */}
        <div className="w-fit relative overflow-hidden rounded-md items-end justify-end bg-black/5 dark:bg-white/5">
          <div className="relative w-[270px] flex items-center justify-center p-4">
            {src && (
              <img
                src={src}
                alt={title ?? ""}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-md rounded-md"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
