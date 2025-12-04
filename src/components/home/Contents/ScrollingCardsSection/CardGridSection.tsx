import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { CardItem } from "./CardItem";

const cards = [
  {
    title: "UGC Brand Positioning Strategy",
    badge: "Strategy",
    description:
      "Authentic narratives that resonate with your target audience. Build trust through genuine creator stories and establish your brand's unique voice in the market.",
    src: "/card1.jpg",
    bgColor: "bg-[#E8E05C]",
    textColor: "text-[#1A1A1A]",
    accent: "#E8E05C",
  },
  {
    title: "Audience & Community Targeting",
    badge: "Community",
    description:
      "Connect with the right creators and communities that align with your brand values. Data-driven insights to maximize engagement and reach your ideal customers.",
    src: "/card2.jpg",
    bgColor: "bg-linear-to-br from-[#FF6B4A] to-[#FF8E4A]",
    textColor: "text-white",
    accent: "#FF7A4A",
  },
  {
    title: "Content Strategy Guidelines",
    badge: "Guidelines",
    description:
      "Comprehensive frameworks for creating impactful UGC campaigns. From ideation to execution, we provide the tools and guidance for successful creator partnerships.",
    src: "/card3.jpg",
    bgColor: "bg-[#2B7FD9]",
    textColor: "text-white",
    accent: "#2B7FD9",
  },
];

export const CardGridSection = () => {
  return (
    <ScrollStack
      itemDistance={120}
      itemStackDistance={12}
      stackPosition="8%"
      scaleEndPosition="4%"
      baseScale={0.94}
      itemScale={0.02}
      rotationAmount={0}
      blurAmount={0}
      useWindowScroll={true}
    >
      {cards.map((card, index) => (
        <ScrollStackItem
          key={index}
          itemClassName={`${card.bgColor} ${card.textColor} !h-[420px] !rounded-[28px] !shadow-2xl !my-4 group transition-all duration-300 hover:shadow-3xl`}
        >
          {/* <div className="flex h-full w-full gap-3 px-6">
            <div className="flex flex-col justify-between w-1/2 pr-4">
              <div>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-black/5 dark:bg-white/10">
                  {card.badge}
                </span>
                <h2 className="text-3xl font-bold mt-3 mb-3 leading-tight">
                  {card.title}
                </h2>
                <p className="text-sm leading-relaxed opacity-85">
                  {card.description}
                </p>
              </div>

              <div className="relative w-20 h-20 opacity-20 transition-transform duration-300 group-hover:translate-y-1 group-hover:rotate-6">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,10 61,39 90,39 67,57 73,86 50,70 27,86 33,57 10,39 39,39"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            <div className="w-1/2 relative overflow-hidden rounded-[22px] m-0 p-4 flex items-center justify-center bg-black/5 dark:bg-white/5">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={card.src}
                  alt={card.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-md rounded-md"
                />
              </div>
            </div>
          </div> */}
          <CardItem
            title={card.title}
            badge={card.badge}
            description={card.description}
            src={card.src}
          />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
};
