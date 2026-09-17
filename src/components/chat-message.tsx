"use client";

import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/lib/types";
import { FollowUpOptions } from "./follow-up-options";
import { CollegeRecommendations } from "./college-recommendations";

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectOption?: (value: string, label: string) => void;
  isLatest?: boolean;
}

export function ChatMessage({
  message,
  onSelectOption,
  isLatest = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "animate-fade-in-up w-full",
        isUser ? "flex justify-end" : "flex justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%]",
          isUser ? "ml-auto" : "mr-auto"
        )}
      >
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
              : "bg-white border border-[#E5E7EB] text-[#111111]"
          )}
        >
          {/* Content with newlines preserved */}
          <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
            {message.content}
          </div>
        </div>

        {/* Follow-up options */}
        {!isUser &&
          message.followUpOptions &&
          message.followUpOptions.length > 0 &&
          isLatest &&
          onSelectOption && (
            <div className="mt-3">
              <p className="mb-2 text-sm font-medium text-[#6B7280]">
                What&apos;s your current academic level?
              </p>
              <FollowUpOptions
                options={message.followUpOptions}
                onSelect={onSelectOption}
              />
            </div>
          )}

        {/* Recommendations */}
        {!isUser &&
          message.recommendations &&
          message.recommendations.length > 0 && (
            <div className="mt-4">
              <CollegeRecommendations
                universities={message.recommendations}
              />
            </div>
          )}
      </div>
    </div>
  );
}

// ─── Typing Indicator ───

export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="mb-1.5 text-xs font-medium text-[#4F46E5]">
          CollegeAI
        </div>
        <div className="inline-flex items-center gap-1 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3">
          <span className="typing-dot h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[#9CA3AF]" />
          <span className="typing-dot h-2 w-2 rounded-full bg-[#9CA3AF]" />
        </div>
      </div>
    </div>
  );
}
