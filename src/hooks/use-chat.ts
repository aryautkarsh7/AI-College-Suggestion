"use client";

import { useState, useCallback, useRef } from "react";
import { ChatMessage, ConversationContext, ConversationStage } from "@/lib/types";
import { processMessage } from "@/lib/mock-ai";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const contextRef = useRef<ConversationContext>({
    stage: "initial" as ConversationStage,
  });

  const sendMessage = useCallback(
    (text: string) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      if (!isChatMode) {
        setIsChatMode(true);
      }

      // Show typing indicator
      setIsTyping(true);

      // Process with mock AI
      const { response, updatedContext } = processMessage(
        text,
        contextRef.current
      );
      contextRef.current = updatedContext;

      // Simulate AI thinking delay
      const delay = response.delay || 1000;
      setTimeout(() => {
        setIsTyping(false);

        const aiMessage: ChatMessage = {
          id: generateId(),
          role: "ai",
          content: response.text,
          timestamp: new Date(),
          followUpOptions: response.followUpOptions,
          recommendations: response.recommendations,
        };

        setMessages((prev) => [...prev, aiMessage]);
      }, delay);
    },
    [isChatMode]
  );

  const selectOption = useCallback(
    (value: string, label: string) => {
      sendMessage(value);
    },
    [sendMessage]
  );

  const resetChat = useCallback(() => {
    setMessages([]);
    setIsChatMode(false);
    setIsTyping(false);
    contextRef.current = { stage: "initial" };
  }, []);

  return {
    messages,
    isTyping,
    isChatMode,
    sendMessage,
    selectOption,
    resetChat,
  };
}
