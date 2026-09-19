"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-medium text-[#4F46E5] shadow-sm"
      >
        <GraduationCap size={16} />
        Built for students choosing their next college
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl font-semibold tracking-tight text-[#111111] sm:text-5xl lg:text-6xl"
      >
        Choose the right{" "}
        <span className="bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
          college
        </span>{" "}
        for you
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-lg text-lg text-[#6B7280] sm:text-xl"
      >
        Tell me your degree, entrance exams, and marks — I&apos;ll match you with
        colleges in India and abroad that actually fit your goals and budget.
      </motion.p>
    </div>
  );
}
