"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SubjectScore } from "@/lib/types";

interface PercentageFormProps {
  subjects: string[];
  onSubmit: (scores: SubjectScore[]) => void;
  disabled?: boolean;
}

export function PercentageForm({ subjects, onSubmit, disabled = false }: PercentageFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const setValue = (subject: string, raw: string) => {
    if (raw === "" || (/^\d{0,3}(\.\d{0,2})?$/.test(raw) && Number(raw) <= 100)) {
      setValues((prev) => ({ ...prev, [subject]: raw }));
    }
  };

  const filled = subjects.every((s) => values[s] !== undefined && values[s] !== "");

  const handleSubmit = () => {
    if (submitted || !filled) return;
    setSubmitted(true);
    const scores: SubjectScore[] = subjects.map((subject) => ({
      subject,
      percentage: Number(values[subject]),
    }));
    onSubmit(scores);
  };

  return (
    <div className="mt-3 space-y-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {subjects.map((subject, i) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2.5 shadow-sm transition-colors duration-200",
              "focus-within:border-[#4F46E5]/40 focus-within:shadow-[0_0_0_3px_rgba(79,70,229,0.08)]"
            )}
          >
            <label className="text-sm text-[#374151]">{subject}</label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                inputMode="decimal"
                disabled={disabled || submitted}
                value={values[subject] ?? ""}
                onChange={(e) => setValue(subject, e.target.value)}
                placeholder="—"
                className="w-14 bg-transparent text-right text-sm font-medium text-[#111111] outline-none placeholder:text-[#D1D5DB]"
              />
              <span className="text-sm text-[#9CA3AF]">%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        disabled={disabled || submitted || !filled}
        onClick={handleSubmit}
        className={cn(
          "rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200",
          "hover:bg-[#4338CA] active:scale-[0.98]",
          "disabled:pointer-events-none disabled:opacity-40"
        )}
      >
        Continue
      </button>
    </div>
  );
}
