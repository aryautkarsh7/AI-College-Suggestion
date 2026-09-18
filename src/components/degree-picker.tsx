"use client";

import { motion } from "framer-motion";
import { DegreeOption } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DegreePickerProps {
  options: DegreeOption[];
  onSelect: (degreeId: string, label: string) => void;
  disabled?: boolean;
}

export function DegreePicker({ options, onSelect, disabled = false }: DegreePickerProps) {
  const categories = Array.from(new Set(options.map((o) => o.category)));

  return (
    <div className="mt-3 space-y-4">
      {categories.map((category, ci) => (
        <div key={category}>
          <p className="mb-2 text-xs font-medium tracking-wide text-[#9CA3AF] uppercase">
            {category}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {options
              .filter((o) => o.category === category)
              .map((option, i) => (
                <motion.button
                  key={option.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelect(option.id, option.name)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: ci * 0.05 + i * 0.03,
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-left shadow-sm",
                    "transition-colors duration-200 hover:border-[#4F46E5]/40 hover:bg-[#EEF2FF]/60 hover:shadow-md",
                    "disabled:pointer-events-none disabled:opacity-50"
                  )}
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span className="text-sm leading-snug font-medium text-[#111111]">
                    {option.name}
                  </span>
                </motion.button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
