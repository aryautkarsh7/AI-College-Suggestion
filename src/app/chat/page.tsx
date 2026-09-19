"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AIChatBox } from "@/components/ai-chat-box";
import { ChatMessage, TypingIndicator } from "@/components/chat-message";
import { GradientGlow } from "@/components/gradient-glow";
import { useChat } from "@/hooks/use-chat";

function ChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    messages,
    isTyping,
    sendMessage,
    selectOption,
    selectDegree,
    selectExams,
    submitPercentage,
  } = useChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialSentRef = useRef(false);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Kick off the conversation if we arrived with a query from the landing page
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !initialSentRef.current) {
      initialSentRef.current = true;
      sendMessage(q);
      router.replace("/chat");
    }
  }, [searchParams, sendMessage, router]);

  const handleSubmit = (text: string) => {
    sendMessage(text);
    setInputValue("");
  };

  // ─── EMPTY STATE — landed on /chat directly with nothing to say yet ───
  if (messages.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
        <Navbar />
        <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12">
          <GradientGlow />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full max-w-3xl flex-col items-center gap-8"
          >
            <Hero />
            <AIChatBox onSubmit={handleSubmit} value={inputValue} onChange={setInputValue} />
          </motion.div>
        </main>
      </div>
    );
  }

  // ─── CONVERSATION ───
  return (
    <div className="flex h-screen flex-col bg-[#FAFAFA]">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 pb-4">
          {messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSelectOption={selectOption}
              onSelectDegree={selectDegree}
              onSelectExams={selectExams}
              onSubmitPercentage={submitPercentage}
              isLatest={index === messages.length - 1}
            />
          ))}

          <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-[#E5E7EB]/60 bg-[#FAFAFA]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3">
          <AIChatBox
            onSubmit={handleSubmit}
            value={inputValue}
            onChange={setInputValue}
            compact
            placeholder="Ask a follow-up question…"
          />
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatPageContent />
    </Suspense>
  );
}
