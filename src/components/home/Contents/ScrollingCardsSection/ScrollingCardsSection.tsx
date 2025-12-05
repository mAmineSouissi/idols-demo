import ScrollStack, { ScrollStackItem } from "@/components/shared/ScrollStack";
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

export const ScrollingCardsSection = () => {
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
        <ScrollStackItem key={index}>
          <CardItem
            title={card.title}
            badge={card.badge}
            description={card.description}
            src={card.src}
            bgColor={card.accent}
          />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
};
