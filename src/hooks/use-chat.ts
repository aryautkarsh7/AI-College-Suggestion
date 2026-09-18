"use client";

import { useCallback, useRef, useState } from "react";
import {
  ChatMessage,
  ChatTurnPayload,
  ConversationContext,
  ConversationStage,
  SubjectScore,
} from "@/lib/types";

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

  const appendUserMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsChatMode(true);
  }, []);

  const advance = useCallback(async (message: string, payload?: ChatTurnPayload) => {
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context: contextRef.current, payload }),
      });

      if (!res.ok) throw new Error(`Chat request failed with status ${res.status}`);

      const { response, updatedContext } = await res.json();
      contextRef.current = updatedContext;

      const delay = response.delay ?? 800;
      await new Promise((resolve) => setTimeout(resolve, delay));

      setIsTyping(false);
      const aiMessage: ChatMessage = {
        id: generateId(),
        role: "ai",
        content: response.text,
        timestamp: new Date(),
        followUpOptions: response.followUpOptions,
        recommendations: response.recommendations,
        widget: response.widget,
        degreeOptions: response.degreeOptions,
        examOptions: response.examOptions,
        percentageSubjects: response.percentageSubjects,
        resultsNote: response.resultsNote,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setIsTyping(false);
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "ai",
        content: "Sorry, I couldn't reach CollegeAI just now. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      appendUserMessage(text);
      advance(text);
    },
    [appendUserMessage, advance]
  );

  const selectOption = useCallback(
    (value: string, label: string) => {
      appendUserMessage(label);
      advance(value);
    },
    [appendUserMessage, advance]
  );

  const selectDegree = useCallback(
    (degreeId: string, label: string) => {
      appendUserMessage(label);
      advance(degreeId, { degreeId });
    },
    [appendUserMessage, advance]
  );

  const selectExams = useCallback(
    (examIds: string[], examLabels: string[], noExam: boolean) => {
      const label = noExam ? "I haven't cleared any exam yet" : examLabels.join(", ");
      appendUserMessage(label);
      advance("", { exams: examIds, noExam });
    },
    [appendUserMessage, advance]
  );

  const submitPercentage = useCallback(
    (scores: SubjectScore[]) => {
      const label = scores.map((s) => `${s.subject}: ${s.percentage}%`).join(" · ");
      appendUserMessage(label);
      advance("", { subjectScores: scores });
    },
    [appendUserMessage, advance]
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
    selectDegree,
    selectExams,
    submitPercentage,
    resetChat,
  };
}
