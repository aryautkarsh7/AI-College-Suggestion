"use client";

import { cn } from "@/lib/utils";

interface DestinationCardsProps {
  onDestinationClick: (prompt: string) => void;
}

const destinations = [
  { flag: "🇮🇳", name: "India", prompt: "I want to study in India" },
  {
    flag: "🇺🇸",
    name: "United States",
    prompt: "I want to study in the United States",
  },
  { flag: "🇨🇦", name: "Canada", prompt: "I want to study in Canada" },
  { flag: "🇩🇪", name: "Germany", prompt: "I want to study in Germany" },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    prompt: "I want to study in the United Kingdom",
  },
  {
    flag: "🇦🇺",
    name: "Australia",
    prompt: "I want to study in Australia",
  },
];

export function DestinationCards({ onDestinationClick }: DestinationCardsProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-[#111111] text-center mb-8 sm:text-3xl">
        Popular destinations
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {destinations.map((dest) => (
          <button
            key={dest.name}
            onClick={() => onDestinationClick(dest.prompt)}
            className={cn(
              "flex items-center gap-2.5 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3.5",
              "shadow-sm transition-all duration-200 ease-out",
              "hover:-translate-y-0.5 hover:border-[#4F46E5]/20 hover:shadow-md",
              "active:translate-y-0 active:shadow-sm"
            )}
          >
            <span className="text-2xl">{dest.flag}</span>
            <span className="text-sm font-medium text-[#111111]">
              {dest.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
