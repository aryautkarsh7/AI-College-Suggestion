"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Plus, Mic, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIChatBoxProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  compact?: boolean;
}

export function AIChatBox({
  onSubmit,
  placeholder = "Ask anything about colleges, courses, countries, or your future…",
  disabled = false,
  value: controlledValue,
  onChange: controlledOnChange,
  compact = false,
}: AIChatBoxProps) {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (v: string) => {
    if (controlledOnChange) {
      controlledOnChange(v);
    } else {
      setInternalValue(v);
    }
  };

  const hasContent = value.trim().length > 0;

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = compact ? 80 : 120;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [value, compact]);

  const handleSubmit = () => {
    if (!hasContent || disabled) return;
    onSubmit(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        "relative w-full",
        compact ? "max-w-3xl" : "max-w-[700px]"
      )}
    >
      <div
        className={cn(
          "flex items-end gap-2 rounded-2xl border bg-white shadow-sm transition-all duration-200",
          compact ? "px-3 py-2" : "px-4 py-3",
          isFocused
            ? "border-[#4F46E5]/40 shadow-[0_0_0_3px_rgba(79,70,229,0.08)] ring-1 ring-[#4F46E5]/10"
            : "border-[#E5E7EB] hover:border-[#D1D5DB]"
        )}
      >
        {/* Plus / Attachment icon */}
        <button
          type="button"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg text-[#9CA3AF] transition-colors hover:text-[#6B7280]",
            compact ? "h-8 w-8" : "h-9 w-9"
          )}
          tabIndex={-1}
        >
          <Plus size={compact ? 18 : 20} />
        </button>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent outline-none",
            "placeholder:text-[#9CA3AF]",
            "disabled:opacity-50",
            compact
              ? "py-1.5 text-sm leading-relaxed"
              : "py-1.5 text-base leading-relaxed"
          )}
        />

        {/* Mic icon */}
        <button
          type="button"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg text-[#9CA3AF] transition-colors hover:text-[#6B7280]",
            compact ? "h-8 w-8" : "h-9 w-9"
          )}
          tabIndex={-1}
        >
          <Mic size={compact ? 16 : 18} />
        </button>

        {/* Send button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!hasContent || disabled}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl transition-all duration-200",
            compact ? "h-8 w-8" : "h-9 w-9",
            hasContent
              ? "bg-[#4F46E5] text-white shadow-sm hover:bg-[#4338CA] active:scale-95"
              : "bg-[#F3F4F6] text-[#9CA3AF]"
          )}
        >
          <ArrowUp size={compact ? 16 : 18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Subtle hint text */}
      {!compact && (
        <p className="mt-2 text-center text-xs text-[#9CA3AF]">
          AI-powered guidance for studying in India and abroad
        </p>
      )}
    </div>
  );
}
