"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType, SubjectScore } from "@/lib/types";
import { FollowUpOptions } from "./follow-up-options";
import { CollegeRecommendations } from "./college-recommendations";
import { DegreePicker } from "./degree-picker";
import { ExamMultiSelect } from "./exam-multiselect";
import { PercentageForm } from "./percentage-form";

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectOption?: (value: string, label: string) => void;
  onSelectDegree?: (degreeId: string, label: string) => void;
  onSelectExams?: (examIds: string[], examLabels: string[], noExam: boolean) => void;
  onSubmitPercentage?: (scores: SubjectScore[]) => void;
  isLatest?: boolean;
}

const bubbleVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.6 },
  },
};

export function ChatMessage({
  message,
  onSelectOption,
  onSelectDegree,
  onSelectExams,
  onSubmitPercentage,
  isLatest = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const showWidget = !isUser && isLatest;

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={cn("w-full", isUser ? "flex justify-end" : "flex justify-start")}
    >
      <div className={cn("max-w-[85%] sm:max-w-[75%]", isUser ? "ml-auto" : "mr-auto")}>
        {/* Role label */}
        <div
          className={cn(
            "mb-1.5 text-xs font-medium",
            isUser ? "text-right text-[#9CA3AF]" : "text-left text-[#4F46E5]"
          )}
        >
          {isUser ? "You" : "CollegeAI"}
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isUser
              ? "bg-[#111111] text-white"
              : "border border-[#E5E7EB] bg-white text-[#111111]"
          )}
        >
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
        </div>

        {/* Interactive widgets — only on the latest AI message */}
        {showWidget && message.widget === "chips" && message.followUpOptions && onSelectOption && (
          <div className="mt-3">
            <FollowUpOptions options={message.followUpOptions} onSelect={onSelectOption} />
          </div>
        )}

        {showWidget && message.widget === "degree" && message.degreeOptions && onSelectDegree && (
          <DegreePicker options={message.degreeOptions} onSelect={onSelectDegree} />
        )}

        {showWidget && message.widget === "exams" && message.examOptions && onSelectExams && (
          <ExamMultiSelect options={message.examOptions} onSubmit={onSelectExams} />
        )}

        {showWidget && message.widget === "percentage" && message.percentageSubjects && onSubmitPercentage && (
          <PercentageForm subjects={message.percentageSubjects} onSubmit={onSubmitPercentage} />
        )}

        {/* Recommendations */}
        {!isUser && message.recommendations && message.recommendations.length > 0 && (
          <div className="mt-4">
            <CollegeRecommendations universities={message.recommendations} note={message.resultsNote} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Typing Indicator ───

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="mb-1.5 text-xs font-medium text-[#4F46E5]">CollegeAI</div>
        <div className="inline-flex items-center gap-1 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3">
          <span className="typing-dot h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[#9CA3AF]" />
        </div>
      </div>
    </motion.div>
  );
}
