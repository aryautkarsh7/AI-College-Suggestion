"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl font-semibold tracking-tight text-[#111111] sm:text-5xl lg:text-6xl"
      >
        Where do you want to{" "}
        <span className="bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
          study
        </span>
        ?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-lg text-lg text-[#6B7280] sm:text-xl"
      >
        Pick your degree, tell me your entrance exams and marks — I&apos;ll shortlist
        colleges that actually fit.
      </motion.p>
    </div>
  );
}
