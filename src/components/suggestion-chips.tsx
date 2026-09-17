"use client";

import { cn } from "@/lib/utils";

interface SuggestionChipsProps {
  onChipClick: (prompt: string) => void;
}

const chips = [
  { emoji: "🎓", label: "Study in India", prompt: "I want to study in India" },
  { emoji: "🌍", label: "Study abroad", prompt: "I want to study abroad" },
  {
    emoji: "💻",
    label: "Computer Science",
    prompt: "Find Computer Science colleges for me",
  },
  {
    emoji: "💰",
    label: "Affordable universities",
    prompt: "Show me affordable universities",
  },
  {
    emoji: "🇩🇪",
    label: "Study in Germany",
    prompt: "I want to study in Germany",
  },
  {
    emoji: "🇨🇦",
    label: "Study in Canada",
    prompt: "I want to study in Canada",
  },
  {
    emoji: "🏫",
    label: "Colleges in Karnataka",
    prompt: "Show me colleges in Karnataka, India",
  },
];

export function SuggestionChips({ onChipClick }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-4">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onChipClick(chip.prompt)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2",
            "text-sm text-[#6B7280] shadow-sm",
            "transition-all duration-200 ease-out",
            "hover:-translate-y-0.5 hover:border-[#4F46E5]/30 hover:text-[#4F46E5] hover:shadow-md",
            "active:translate-y-0 active:shadow-sm"
          )}
        >
          <span>{chip.emoji}</span>
          <span>{chip.label}</span>
        </button>
      ))}
    </div>
  );
}
