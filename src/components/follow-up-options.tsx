"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FollowUpOption } from "@/lib/types";

interface FollowUpOptionsProps {
  options: FollowUpOption[];
  onSelect: (value: string, label: string) => void;
  disabled?: boolean;
}

export function FollowUpOptions({ options, onSelect, disabled = false }: FollowUpOptionsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option, i) => (
        <motion.button
          key={option.value}
          onClick={() => onSelect(option.value, option.label)}
          disabled={disabled}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5",
            "text-sm font-medium text-[#111111] shadow-sm",
            "transition-colors duration-200 ease-out",
            "hover:border-[#4F46E5] hover:bg-[#EEF2FF] hover:text-[#4F46E5]",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {option.emoji && <span>{option.emoji}</span>}
          <span>{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
