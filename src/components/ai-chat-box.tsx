"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mic, ArrowUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIChatBoxProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  compact?: boolean;
}

const examplePrompts = [
  "I want to do B.Tech and cleared JEE Main…",
  "Find MBBS colleges that accept NEET-UG",
  "I want to study Computer Science in Germany",
  "Show me affordable law colleges that accept CLAT",
  "I want to study Data Science abroad",
];

export function AIChatBox({
  onSubmit,
  placeholder = "Ask anything about colleges, courses, exams, or your future…",
  disabled = false,
  value: controlledValue,
  onChange: controlledOnChange,
  compact = false,
}: AIChatBoxProps) {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (v: string) => {
    if (controlledOnChange) {
      controlledOnChange(v);
    } else {
      setInternalValue(v);
    }
  };

  const hasContent = value.trim().length > 0;

  // Cycle example prompts, Gemini-style, when the box is idle and empty
  useEffect(() => {
    if (compact || isFocused || hasContent) return;
    const interval = setInterval(() => {
      setExampleIndex((i) => (i + 1) % examplePrompts.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [compact, isFocused, hasContent]);

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
    <div className={cn("relative w-full", compact ? "max-w-3xl" : "max-w-[700px]")}>
      {/* Animated gradient glow ring, Gemini-style */}
      {!compact && (
        <motion.div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#EC4899] blur-2xl"
          animate={{ opacity: isFocused ? 0.4 : 0.14 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      <motion.div
        layout
        className={cn(
          "relative flex items-end gap-2 rounded-2xl border bg-white shadow-sm transition-colors duration-200",
          compact ? "px-3 py-2" : "px-4 py-3.5",
          isFocused
            ? "border-transparent shadow-[0_0_0_1.5px_#4F46E5,0_12px_30px_-10px_rgba(79,70,229,0.35)]"
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
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={compact ? placeholder : ""}
            disabled={disabled}
            rows={1}
            className={cn(
              "relative z-10 w-full resize-none bg-transparent outline-none",
              "placeholder:text-[#9CA3AF]",
              "disabled:opacity-50",
              compact ? "py-1.5 text-sm leading-relaxed" : "py-1.5 text-base leading-relaxed"
            )}
          />

          {/* Animated cycling placeholder, landing search bar only */}
          {!compact && !hasContent && (
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden py-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={exampleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="truncate text-base text-[#9CA3AF]"
                >
                  {examplePrompts[exampleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

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
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!hasContent || disabled}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl transition-all duration-200",
            compact ? "h-8 w-8" : "h-9 w-9",
            hasContent
              ? "bg-[#4F46E5] text-white shadow-sm hover:bg-[#4338CA]"
              : "bg-[#F3F4F6] text-[#9CA3AF]"
          )}
        >
          <ArrowUp size={compact ? 16 : 18} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      {/* Subtle hint text */}
      {!compact && (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-[#9CA3AF]">
          <Sparkles size={12} />
          Guided matching for India entrance exams & study abroad
        </p>
      )}
    </div>
  );
}
