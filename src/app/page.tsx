"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AIChatBox } from "@/components/ai-chat-box";
import { SuggestionChips } from "@/components/suggestion-chips";
import { ExploreSection } from "@/components/explore-section";
import { DestinationCards } from "@/components/destination-cards";
import { TrustSection } from "@/components/trust-section";
import { Footer } from "@/components/footer";
import { GradientGlow } from "@/components/gradient-glow";

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const goToChat = (text: string) => {
    router.push(`/chat?q=${encodeURIComponent(text)}`);
  };

  const handleChipClick = (prompt: string) => {
    setInputValue(prompt);
  };

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

            <AIChatBox onSubmit={goToChat} value={inputValue} onChange={setInputValue} />

            <SuggestionChips onChipClick={handleChipClick} />
          </motion.div>
        </div>

        {/* Below-fold sections */}
        <div className="space-y-20 pb-20">
          <ExploreSection />
          <DestinationCards onDestinationClick={goToChat} />
          <TrustSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
