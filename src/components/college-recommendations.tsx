"use client";

import { motion } from "framer-motion";
import { University } from "@/lib/types";
import { CollegeCard } from "./college-card";
import { Info } from "lucide-react";

interface CollegeRecommendationsProps {
  universities: University[];
  note?: string;
}

export function CollegeRecommendations({ universities, note }: CollegeRecommendationsProps) {
  if (!universities || universities.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[#6B7280]">Colleges to explore</p>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {universities.map((uni, index) => (
          <CollegeCard key={uni.id} university={uni} index={index} />
        ))}
      </div>
      {note && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: universities.length * 0.06 + 0.2 }}
          className="flex items-start gap-1.5 rounded-xl bg-[#F5F5F5] px-3 py-2.5 text-xs text-[#6B7280]"
        >
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>{note}</span>
        </motion.div>
      )}
    </div>
  );
}
