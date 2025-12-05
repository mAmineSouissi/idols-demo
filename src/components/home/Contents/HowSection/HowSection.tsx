"use client";
import { CrowdedPeeps } from "./CrowdedPeeps";
import { WeDoDescription } from "./WeDoDescription";

export const HowSection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="bg-transparent rounded-md shadow-2xl overflow-hidden">
          <div className="flex flex-row lg:flex-row items-center justify-between min-h-[500px]">
            <WeDoDescription className="w-1/3" />
            <CrowdedPeeps />
          </div>
        </div>
      </div>
    </section>
  );
};
