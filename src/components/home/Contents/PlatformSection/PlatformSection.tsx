import { Sponsors } from "./Sponsors";

export const PlatformSection = () => {
  return (
    <div className="text-center -mt-16">
      <p className="text-sm text-(--color-fg) pb-6 tracking-wider uppercase">
        trusted by leading brands and creators
      </p>
      <Sponsors className="mt-8" />
    </div>
  );
};
