import { AIResponse, ChatTurnPayload, ConversationContext, FollowUpOption } from "@/lib/types";
import { INDIA_DEGREES, getIndiaDegreeById } from "./data/india-degrees";
import { ABROAD_DEGREES } from "./data/abroad-degrees";
import { getExamsByIds } from "./data/india-exams";
import { detectCountry, detectTrack, filterAbroadUniversities, filterIndiaColleges } from "./filters";

type TurnResult = { response: AIResponse; updatedContext: ConversationContext };

function getBudgetLabel(value: string): string {
  const map: Record<string, string> = {
    under_10l: "Under ₹10 lakh/year",
    "10_20l": "₹10–20 lakh/year",
    "20_30l": "₹20–30 lakh/year",
    "30l_plus": "₹30 lakh+/year",
  };
  return map[value] || value;
}

function getLevelLabel(value: string): string {
  const map: Record<string, string> = {
    high_school: "Undergraduate",
    bachelors: "Bachelor's degree",
    masters: "Master's degree",
    other: "Other",
  };
  return map[value] || value;
}

const TRACK_OPTIONS: FollowUpOption[] = [
  { label: "Study in India", value: "india", emoji: "🇮🇳" },
  { label: "Study abroad", value: "abroad", emoji: "🌍" },
];

const BUDGET_OPTIONS: FollowUpOption[] = [
  { label: "Under ₹10L", value: "under_10l", emoji: "💰" },
  { label: "₹10 – 20L", value: "10_20l", emoji: "💰" },
  { label: "₹20 – 30L", value: "20_30l", emoji: "💰" },
  { label: "₹30L+", value: "30l_plus", emoji: "💰" },
];

const LEVEL_OPTIONS: FollowUpOption[] = [
  { label: "12th / High School", value: "high_school", emoji: "🎒" },
  { label: "Bachelor's", value: "bachelors", emoji: "🎓" },
  { label: "Master's", value: "masters", emoji: "📚" },
  { label: "Other", value: "other", emoji: "📋" },
];

export function processTurn(message: string, context: ConversationContext, payload?: ChatTurnPayload): TurnResult {
  const newContext: ConversationContext = { ...context };

  switch (context.stage) {
    case "initial": {
      newContext.originalQuery = message;
      const track = detectTrack(message);
      if (track) newContext.track = track;
      const country = detectCountry(message);
      if (country) newContext.country = country;

      if (!newContext.track) {
        newContext.stage = "ask_track";
        return {
          response: {
            text: "Hey! I'm CollegeAI 👋 Are you looking to study in India or abroad?",
            followUpOptions: TRACK_OPTIONS,
            widget: "chips",
            delay: 900,
          },
          updatedContext: newContext,
        };
      }

      return startDegreeStage(newContext);
    }

    case "ask_track": {
      newContext.track = detectTrack(message) ?? "india";
      return startDegreeStage(newContext);
    }

    case "ask_degree": {
      const degreeId = payload?.degreeId ?? message;
      newContext.degreeId = degreeId;

      if (newContext.track === "india") {
        const degree = getIndiaDegreeById(degreeId);
        const examOptions = getExamsByIds(degree?.examIds ?? []);
        newContext.stage = "ask_exams";
        return {
          response: {
            text: `Great — ${degree?.name ?? "that course"}. Have you cleared any entrance exams for it? Select all that apply.`,
            widget: "exams",
            examOptions,
            delay: 800,
          },
          updatedContext: newContext,
        };
      }

      newContext.stage = "ask_level";
      return {
        response: {
          text: "Got it. What's your current academic level?",
          followUpOptions: LEVEL_OPTIONS,
          widget: "chips",
          delay: 800,
        },
        updatedContext: newContext,
      };
    }

    case "ask_exams": {
      newContext.exams = payload?.exams ?? [];
      newContext.noExam = payload?.noExam ?? newContext.exams.length === 0;
      const degree = getIndiaDegreeById(newContext.degreeId ?? "");
      newContext.stage = "ask_percentage";
      return {
        response: {
          text: "Thanks! Now share your Class 12 marks so I can gauge how competitive a shortlist to build.",
          widget: "percentage",
          percentageSubjects: degree?.subjects ?? ["Class 12 Overall %"],
          delay: 700,
        },
        updatedContext: newContext,
      };
    }

    case "ask_percentage": {
      newContext.subjectScores = payload?.subjectScores ?? [];
      newContext.stage = "ask_budget";
      return {
        response: {
          text: "Almost there — what's your approximate budget per year?",
          followUpOptions: BUDGET_OPTIONS,
          widget: "chips",
          delay: 700,
        },
        updatedContext: newContext,
      };
    }

    case "ask_level": {
      newContext.level = message;
      newContext.stage = "ask_budget";
      return {
        response: {
          text: `Got it — you're at the ${getLevelLabel(message)} level. What's your approximate budget per year?`,
          followUpOptions: BUDGET_OPTIONS,
          widget: "chips",
          delay: 800,
        },
        updatedContext: newContext,
      };
    }

    case "ask_budget": {
      newContext.budget = message;
      newContext.stage = "show_results";
      return buildResults(newContext, "Here's what I found for you:");
    }

    case "show_results":
    case "refining": {
      newContext.stage = "refining";
      const lower = message.toLowerCase();

      if (lower.includes("cheaper") || lower.includes("affordable") || lower.includes("low cost")) {
        newContext.budget = "under_10l";
        return buildResults(newContext, "Sure! Here are some more affordable options:");
      }

      if (lower.includes("compare")) {
        return {
          response: {
            text: "I'd be happy to help you compare! The side-by-side comparison view is coming soon — for now you can bookmark a few and compare manually.",
            delay: 700,
          },
          updatedContext: newContext,
        };
      }

      const track = detectTrack(message);
      if (track && track !== newContext.track) {
        newContext.track = track;
        return startDegreeStage(newContext);
      }
      const country = detectCountry(message);
      if (country) newContext.country = country;

      return buildResults(newContext, "Here are some updated recommendations based on your preferences:");
    }

    default: {
      return {
        response: {
          text: "I'm here to help! Tell me what you're looking for, and I'll find the best options for you.",
          delay: 600,
        },
        updatedContext: { ...context, stage: "initial" },
      };
    }
  }
}

function startDegreeStage(context: ConversationContext): TurnResult {
  const newContext: ConversationContext = { ...context, stage: "ask_degree" };
  const degreeOptions = newContext.track === "india" ? INDIA_DEGREES : ABROAD_DEGREES;
  return {
    response: {
      text:
        newContext.track === "india"
          ? "Which course or degree are you aiming for?"
          : "Which field would you like to study abroad?",
      widget: "degree",
      degreeOptions,
      delay: 700,
    },
    updatedContext: newContext,
  };
}

function buildResults(context: ConversationContext, intro: string): TurnResult {
  if (context.track === "india") {
    const { results, note } = filterIndiaColleges(context);
    return {
      response: {
        text: `${intro}\n\n${summaryLine(context)}`,
        recommendations: results,
        resultsNote: note,
        delay: 1400,
      },
      updatedContext: context,
    };
  }

  const results = filterAbroadUniversities(context);
  return {
    response: {
      text: `${intro}\n\n${summaryLine(context)}`,
      recommendations: results,
      delay: 1400,
    },
    updatedContext: context,
  };
}

function summaryLine(context: ConversationContext): string {
  const parts: string[] = [];
  if (context.track === "india") {
    const degree = getIndiaDegreeById(context.degreeId ?? "");
    if (degree) parts.push(`🎓 ${degree.name}`);
    if (context.exams && context.exams.length > 0) {
      parts.push(`📝 ${getExamsByIds(context.exams).map((e) => e.name).join(", ")}`);
    } else if (context.noExam) {
      parts.push("📝 No entrance exam cleared yet");
    }
    const avg = context.subjectScores?.length
      ? (context.subjectScores.reduce((s, x) => s + x.percentage, 0) / context.subjectScores.length).toFixed(1)
      : undefined;
    if (avg) parts.push(`📊 ${avg}% average`);
  } else {
    const degree = ABROAD_DEGREES.find((d) => d.id === context.degreeId);
    if (degree) parts.push(`🎓 ${degree.name}`);
    if (context.country) parts.push(`📍 ${context.country}`);
    if (context.level) parts.push(`📚 ${getLevelLabel(context.level)}`);
  }
  if (context.budget) parts.push(`💰 ${getBudgetLabel(context.budget)}`);
  return parts.join("\n");
}
