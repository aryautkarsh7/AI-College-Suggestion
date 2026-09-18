"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AIChatBox } from "@/components/ai-chat-box";
import { SuggestionChips } from "@/components/suggestion-chips";
import { ChatMessage, TypingIndicator } from "@/components/chat-message";
import { ExploreSection } from "@/components/explore-section";
import { DestinationCards } from "@/components/destination-cards";
import { TrustSection } from "@/components/trust-section";
import { Footer } from "@/components/footer";
import { GradientGlow } from "@/components/gradient-glow";
import { useChat } from "@/hooks/use-chat";

export default function HomePage() {
  const {
    messages,
    isTyping,
    isChatMode,
    sendMessage,
    selectOption,
    selectDegree,
    selectExams,
    submitPercentage,
    resetChat,
  } = useChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isChatMode && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isChatMode]);

  const handleSubmit = (text: string) => {
    sendMessage(text);
    setInputValue("");
  };

  const handleChipClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleDestinationClick = (prompt: string) => {
    sendMessage(prompt);
  };

  // ─── CHAT MODE ───
  if (isChatMode) {
    return (
      <div className="flex h-screen flex-col bg-[#FAFAFA]">
        {/* Navbar */}
        <Navbar onLogoClick={resetChat} />

        {/* Chat messages area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
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

        {/* Fixed bottom input */}
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

  // ─── LANDING MODE ───
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      {/* Navbar */}
      <Navbar />

      {/* Main hero area */}
      <main className="flex flex-1 flex-col">
        {/* Hero + Search centered, with the animated gradient glow behind it */}
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12 sm:py-20">
          <GradientGlow />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full max-w-3xl flex-col items-center gap-8"
          >
            <Hero />

            <AIChatBox onSubmit={handleSubmit} value={inputValue} onChange={setInputValue} />

            <SuggestionChips onChipClick={handleChipClick} />
          </motion.div>
        </div>

        {/* Below-fold sections */}
        <div className="space-y-20 pb-20">
          <ExploreSection />
          <DestinationCards onDestinationClick={handleDestinationClick} />
          <TrustSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
