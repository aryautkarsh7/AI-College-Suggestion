"use client";

import { University } from "@/lib/types";
import { CollegeCard } from "./college-card";

interface CollegeRecommendationsProps {
  universities: University[];
}

export function CollegeRecommendations({
  universities,
}: CollegeRecommendationsProps) {
  if (!universities || universities.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[#6B7280]">
        Universities to explore
      </p>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {universities.map((uni, index) => (
          <CollegeCard key={uni.id} university={uni} index={index} />
        ))}
      </div>
    </div>
  );
}
