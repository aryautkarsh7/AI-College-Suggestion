"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { ExamOption } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ExamMultiSelectProps {
  options: ExamOption[];
  onSubmit: (examIds: string[], examLabels: string[], noExam: boolean) => void;
  disabled?: boolean;
}

export function ExamMultiSelect({ options, onSubmit, disabled = false }: ExamMultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    if (disabled || submitted) return;
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const handleSubmit = () => {
    if (submitted || selected.length === 0) return;
    setSubmitted(true);
    const labels = options.filter((o) => selected.includes(o.id)).map((o) => o.name);
    onSubmit(selected, labels, false);
  };

  const handleSkip = () => {
    if (submitted) return;
    setSubmitted(true);
    onSubmit([], [], true);
  };

  return (
    <div className="mt-3 space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option, i) => {
          const isSelected = selected.includes(option.id);
          return (
            <motion.button
              key={option.id}
              type="button"
              disabled={disabled || submitted}
              onClick={() => toggle(option.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
              whileTap={{ scale: 0.96 }}
              title={option.fullName}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium shadow-sm transition-all duration-200",
                isSelected
                  ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                  : "border-[#E5E7EB] bg-white text-[#374151] hover:border-[#4F46E5]/40 hover:bg-[#EEF2FF]/60",
                "disabled:pointer-events-none disabled:opacity-60"
              )}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {isSelected && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="inline-flex overflow-hidden"
                  >
                    <Check size={13} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
              {option.name}
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={disabled || submitted || selected.length === 0}
          onClick={handleSubmit}
          className={cn(
            "rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200",
            "hover:bg-[#4338CA] active:scale-[0.98]",
            "disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          Continue {selected.length > 0 ? `(${selected.length})` : ""}
        </button>
        <button
          type="button"
          disabled={disabled || submitted}
          onClick={handleSkip}
          className="text-sm text-[#9CA3AF] underline-offset-4 hover:text-[#6B7280] hover:underline disabled:pointer-events-none disabled:opacity-40"
        >
          I haven&apos;t cleared any exam yet
        </button>
      </div>
    </div>
  );
}
