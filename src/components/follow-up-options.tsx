"use client";

import { cn } from "@/lib/utils";
import { FollowUpOption } from "@/lib/types";

interface FollowUpOptionsProps {
  options: FollowUpOption[];
  onSelect: (value: string, label: string) => void;
  disabled?: boolean;
}

export function FollowUpOptions({
  options,
  onSelect,
  disabled = false,
}: FollowUpOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value, option.label)}
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5",
            "text-sm font-medium text-[#111111] shadow-sm",
            "transition-all duration-200 ease-out",
            "hover:border-[#4F46E5] hover:bg-[#EEF2FF] hover:text-[#4F46E5]",
            "active:scale-[0.98]",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {option.emoji && <span>{option.emoji}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
