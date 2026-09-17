"use client";

import { cn } from "@/lib/utils";
import { University } from "@/lib/types";
import { MapPin, GraduationCap, Building2, Bookmark, ArrowRight, Scale } from "lucide-react";

interface CollegeCardProps {
  university: University;
  index?: number;
}

export function CollegeCard({ university, index = 0 }: CollegeCardProps) {
  const matchColors: Record<string, { bg: string; text: string; border: string }> = {
    "Strong preference match": {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
    },
    "Good preference match": {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    "Explore further": {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
    },
  };

  const matchStyle = matchColors[university.matchLevel] || matchColors["Explore further"];

  return (
    <div
      className={cn(
        "animate-fade-in-up group rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm",
        "transition-all duration-200 ease-out",
        "hover:border-[#4F46E5]/20 hover:shadow-md hover:-translate-y-0.5",
        `stagger-${index + 1}`
      )}
      style={{ opacity: 0, animationFillMode: "forwards" }}
    >
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[#111111] leading-snug">
              {university.name}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-[#6B7280]">
              <MapPin size={14} className="shrink-0" />
              <span>
                {university.countryFlag} {university.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info row */}
      <div className="mb-3 flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-1 rounded-lg bg-[#F5F5F5] px-2.5 py-1 text-xs text-[#6B7280]">
          <GraduationCap size={12} />
          <span>{university.course}</span>
        </div>
        <div className="inline-flex items-center gap-1 rounded-lg bg-[#F5F5F5] px-2.5 py-1 text-xs text-[#6B7280]">
          <Building2 size={12} />
          <span>{university.type} University</span>
        </div>
      </div>

      {/* Tuition */}
      <p className="mb-3 text-sm text-[#6B7280]">
        Tuition: <span className="font-medium text-[#111111]">{university.tuitionRange}</span>
      </p>

      {/* Match tag */}
      <div className="mb-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
            matchStyle.bg,
            matchStyle.text,
            matchStyle.border
          )}
        >
          {university.matchLevel}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl bg-[#4F46E5] px-4 py-2",
            "text-sm font-medium text-white shadow-sm",
            "transition-all duration-200 hover:bg-[#4338CA] active:scale-[0.98]"
          )}
        >
          View University
          <ArrowRight size={14} />
        </button>
        <button
          className={cn(
            "inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] px-3 py-2",
            "text-sm text-[#6B7280] shadow-sm",
            "transition-all duration-200 hover:border-[#4F46E5]/30 hover:text-[#4F46E5]"
          )}
        >
          <Scale size={14} />
          Compare
        </button>
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-xl border border-[#E5E7EB] p-2",
            "text-[#9CA3AF] shadow-sm",
            "transition-all duration-200 hover:border-[#4F46E5]/30 hover:text-[#4F46E5]"
          )}
        >
          <Bookmark size={14} />
        </button>
      </div>
    </div>
  );
}
