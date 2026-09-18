"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SuggestionChipsProps {
  onChipClick: (prompt: string) => void;
}

const chips = [
  { emoji: "🎓", label: "Study in India", prompt: "I want to study in India" },
  { emoji: "🌍", label: "Study abroad", prompt: "I want to study abroad" },
  { emoji: "🛠️", label: "Engineering (B.Tech)", prompt: "I want to do B.Tech in India" },
  { emoji: "🩺", label: "Medicine (MBBS)", prompt: "I want to do MBBS in India" },
  { emoji: "⚖️", label: "Law", prompt: "I want to study law in India" },
  { emoji: "💰", label: "Affordable colleges", prompt: "Show me affordable colleges" },
  { emoji: "🇩🇪", label: "Study in Germany", prompt: "I want to study in Germany" },
];

export function SuggestionChips({ onChipClick }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-4">
      {chips.map((chip, i) => (
        <motion.button
          key={chip.label}
          onClick={() => onChipClick(chip.prompt)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2",
            "text-sm text-[#6B7280] shadow-sm",
            "transition-colors duration-200 ease-out",
            "hover:border-[#4F46E5]/30 hover:text-[#4F46E5] hover:shadow-md"
          )}
        >
          <span>{chip.emoji}</span>
          <span>{chip.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
