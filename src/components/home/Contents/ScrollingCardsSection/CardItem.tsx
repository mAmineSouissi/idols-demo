import Card from "@/components/Card";

interface CardItemProps {
  className?: string;
  title?: string;
  badge?: string;
  description?: string;
  src?: string;
}

export const CardItem = ({
  className,
  title,
  badge,
  description,
  src,
}: CardItemProps) => {
  return (
    <>
      <Card>
        <div className="flex h-full w-full gap-3 px-6">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-between w-1/2 pr-4">
            <div>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-black/5 dark:bg-white/10">
                {badge}
              </span>
              <h2 className="text-3xl font-bold mt-3 mb-3 leading-tight">
                {title}
              </h2>
              <p className="text-sm leading-relaxed opacity-85">
                {description}
              </p>
            </div>
            {/* Decorative star element */}
            <div className="relative w-20 h-20 opacity-20 transition-transform duration-300 group-hover:translate-y-1 group-hover:rotate-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,10 61,39 90,39 67,57 73,86 50,70 27,86 33,57 10,39 39,39"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          {/* Right side - Image (fit without cropping, subtle hover zoom) */}
          <div className="w-1/2 relative overflow-hidden rounded-[22px] m-0 p-4 flex items-center justify-center bg-black/5 dark:bg-white/5">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={src}
                alt={title}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-md rounded-md"
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
