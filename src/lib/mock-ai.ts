import {
  AIResponse,
  ConversationContext,
  ConversationStage,
  FollowUpOption,
  University,
} from "./types";

// ─── Mock University Database ───

const mockUniversities: University[] = [
  {
    id: "tum",
    name: "Technical University of Munich",
    location: "Munich, Germany",
    country: "Germany",
    countryFlag: "🇩🇪",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "€0 – €150 / semester",
    matchLevel: "Strong preference match",
    description:
      "One of Europe's top technical universities with strong CS and AI programs.",
  },
  {
    id: "rwth",
    name: "RWTH Aachen University",
    location: "Aachen, Germany",
    country: "Germany",
    countryFlag: "🇩🇪",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "€0 – €300 / semester",
    matchLevel: "Good preference match",
    description:
      "Leading technical university known for engineering and computer science.",
  },
  {
    id: "tu-berlin",
    name: "Technical University of Berlin",
    location: "Berlin, Germany",
    country: "Germany",
    countryFlag: "🇩🇪",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "€0 – €320 / semester",
    matchLevel: "Good preference match",
    description:
      "Top-ranked university in Berlin with excellent research facilities.",
  },
  {
    id: "lmu",
    name: "LMU Munich",
    location: "Munich, Germany",
    country: "Germany",
    countryFlag: "🇩🇪",
    course: "Data Science & AI",
    type: "Public",
    tuitionRange: "€0 – €150 / semester",
    matchLevel: "Explore further",
    description:
      "One of Germany's oldest and most prestigious universities.",
  },
  {
    id: "utoronto",
    name: "University of Toronto",
    location: "Toronto, Canada",
    country: "Canada",
    countryFlag: "🇨🇦",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "CAD 58,000 / year",
    matchLevel: "Good preference match",
    description:
      "Canada's top university with world-renowned AI research labs.",
  },
  {
    id: "ubc",
    name: "University of British Columbia",
    location: "Vancouver, Canada",
    country: "Canada",
    countryFlag: "🇨🇦",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "CAD 44,000 / year",
    matchLevel: "Good preference match",
    description:
      "Leading research university on Canada's west coast.",
  },
  {
    id: "waterloo",
    name: "University of Waterloo",
    location: "Waterloo, Canada",
    country: "Canada",
    countryFlag: "🇨🇦",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "CAD 52,000 / year",
    matchLevel: "Strong preference match",
    description:
      "Famous for co-op programs and top-tier CS department.",
  },
  {
    id: "iiit-b",
    name: "IIIT Bangalore",
    location: "Bangalore, India",
    country: "India",
    countryFlag: "🇮🇳",
    course: "Computer Science",
    type: "Private",
    tuitionRange: "₹3.5L / year",
    matchLevel: "Strong preference match",
    description:
      "Top IT institute in India's tech hub with excellent placements.",
  },
  {
    id: "rvce",
    name: "RV College of Engineering",
    location: "Bangalore, India",
    country: "India",
    countryFlag: "🇮🇳",
    course: "Computer Science",
    type: "Private",
    tuitionRange: "₹2.5L / year",
    matchLevel: "Good preference match",
    description:
      "One of Karnataka's premier engineering colleges.",
  },
  {
    id: "iitb",
    name: "IIT Bombay",
    location: "Mumbai, India",
    country: "India",
    countryFlag: "🇮🇳",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "₹2L / year",
    matchLevel: "Strong preference match",
    description:
      "India's top engineering institute with world-class CS programs.",
  },
  {
    id: "eth",
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    country: "Switzerland",
    countryFlag: "🇨🇭",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "CHF 730 / semester",
    matchLevel: "Strong preference match",
    description:
      "One of the world's leading science and technology universities.",
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    location: "Melbourne, Australia",
    country: "Australia",
    countryFlag: "🇦🇺",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "AUD 46,000 / year",
    matchLevel: "Good preference match",
    description:
      "Australia's leading university with strong STEM programs.",
  },
  {
    id: "imperial",
    name: "Imperial College London",
    location: "London, United Kingdom",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    course: "Computing",
    type: "Public",
    tuitionRange: "£35,000 / year",
    matchLevel: "Strong preference match",
    description:
      "World-class computing department in the heart of London.",
  },
  {
    id: "delft",
    name: "TU Delft",
    location: "Delft, Netherlands",
    country: "Netherlands",
    countryFlag: "🇳🇱",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "€2,300 / year (EU)",
    matchLevel: "Good preference match",
    description:
      "Top technical university in the Netherlands with affordable tuition.",
  },
  {
    id: "kit",
    name: "Karlsruhe Institute of Technology",
    location: "Karlsruhe, Germany",
    country: "Germany",
    countryFlag: "🇩🇪",
    course: "Computer Science",
    type: "Public",
    tuitionRange: "€0 – €1,500 / semester",
    matchLevel: "Good preference match",
    description:
      "Strong CS and AI programs with close industry ties.",
  },
];

// ─── Keyword Detection ───

const countryKeywords: Record<string, string[]> = {
  Germany: ["germany", "german", "deutschland", "berlin", "munich", "bavari"],
  Canada: ["canada", "canadian", "toronto", "vancouver", "waterloo"],
  India: [
    "india",
    "indian",
    "bangalore",
    "bengaluru",
    "mumbai",
    "delhi",
    "karnataka",
    "hyderabad",
    "chennai",
    "pune",
  ],
  "United States": ["usa", "us", "united states", "america", "american"],
  "United Kingdom": [
    "uk",
    "united kingdom",
    "england",
    "london",
    "british",
    "britain",
  ],
  Australia: ["australia", "australian", "melbourne", "sydney"],
  Switzerland: ["switzerland", "swiss", "zurich"],
  Netherlands: ["netherlands", "dutch", "holland", "delft"],
  Europe: ["europe", "european"],
};

const fieldKeywords: Record<string, string[]> = {
  "Computer Science": [
    "computer science",
    "cs",
    "computing",
    "software",
    "programming",
    "coding",
  ],
  "Artificial Intelligence": ["ai", "artificial intelligence", "machine learning", "ml", "deep learning"],
  "Data Science": ["data science", "data analytics", "data engineering", "big data"],
  Engineering: ["engineering", "b.tech", "btech", "mechanical", "electrical", "civil"],
  Medicine: ["medicine", "medical", "mbbs", "doctor", "healthcare"],
  Business: ["business", "mba", "management", "finance", "marketing"],
};

function detectCountry(text: string): string | undefined {
  const lower = text.toLowerCase();
  for (const [country, keywords] of Object.entries(countryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return country;
    }
  }
  return undefined;
}

function detectField(text: string): string | undefined {
  const lower = text.toLowerCase();
  for (const [field, keywords] of Object.entries(fieldKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return field;
    }
  }
  return undefined;
}

function detectBudget(text: string): string | undefined {
  const lower = text.toLowerCase();
  if (lower.includes("affordable") || lower.includes("cheap") || lower.includes("low")) {
    return "Under ₹10L";
  }
  const budgetMatch = lower.match(/(\d+)\s*(?:lakh|l|lac)/);
  if (budgetMatch) {
    return `₹${budgetMatch[1]}L`;
  }
  return undefined;
}

// ─── Filter Universities ───

function filterUniversities(context: ConversationContext): University[] {
  let results = [...mockUniversities];

  if (context.country) {
    if (context.country === "Europe") {
      results = results.filter((u) =>
        ["Germany", "Switzerland", "Netherlands", "United Kingdom"].includes(
          u.country
        )
      );
    } else {
      results = results.filter((u) => u.country === context.country);
    }
  }

  if (context.field) {
    results = results.filter(
      (u) =>
        u.course.toLowerCase().includes(context.field!.toLowerCase()) ||
        context.field!.toLowerCase().includes(u.course.toLowerCase())
    );
  }

  // If no results after filtering, return some anyway for the prototype
  if (results.length === 0) {
    results = mockUniversities.slice(0, 3);
  }

  return results.slice(0, 4);
}

// ─── Conversation State Machine ───

export function processMessage(
  message: string,
  context: ConversationContext
): { response: AIResponse; updatedContext: ConversationContext } {
  const newContext = { ...context };

  // Always try to detect new info from the message
  const detectedCountry = detectCountry(message);
  const detectedField = detectField(message);
  const detectedBudget = detectBudget(message);

  if (detectedCountry) newContext.country = detectedCountry;
  if (detectedField) newContext.field = detectedField;
  if (detectedBudget) newContext.budget = detectedBudget;

  switch (context.stage) {
    case "initial": {
      newContext.originalQuery = message;
      newContext.stage = "ask_level";

      const parts: string[] = [];
      if (newContext.field) parts.push(`🎓 ${newContext.field}`);
      if (newContext.country) parts.push(`📍 ${newContext.country}`);
      if (newContext.budget) parts.push(`💰 Budget: ${newContext.budget}/year`);

      let responseText: string;
      if (parts.length > 0) {
        responseText = `Great choice! Based on what you've told me, you're looking for:\n\n${parts.join(
          "\n"
        )}\n\nI have a couple of questions to refine my recommendations.`;
      } else {
        responseText =
          "I'd love to help you find the right college! Let me ask you a few questions to understand what you're looking for.";
      }

      return {
        response: {
          text: responseText,
          followUpOptions: [
            { label: "12th / High School", value: "high_school", emoji: "🎒" },
            { label: "Bachelor's", value: "bachelors", emoji: "🎓" },
            { label: "Master's", value: "masters", emoji: "📚" },
            { label: "Other", value: "other", emoji: "📋" },
          ],
          delay: 1200,
        },
        updatedContext: newContext,
      };
    }

    case "ask_level": {
      newContext.level = message;
      newContext.stage = "ask_budget";

      const levelLabel =
        message === "high_school"
          ? "high school"
          : message === "bachelors"
          ? "bachelor's"
          : message === "masters"
          ? "master's"
          : message;

      return {
        response: {
          text: `Got it — you're at the ${levelLabel} level. What's your approximate budget per year?`,
          followUpOptions: [
            { label: "Under ₹10L", value: "under_10l", emoji: "💰" },
            { label: "₹10 – 20L", value: "10_20l", emoji: "💰" },
            { label: "₹20 – 30L", value: "20_30l", emoji: "💰" },
            { label: "₹30L+", value: "30l_plus", emoji: "💰" },
          ],
          delay: 800,
        },
        updatedContext: newContext,
      };
    }

    case "ask_budget": {
      newContext.budget = message;
      newContext.stage = "show_results";

      const universities = filterUniversities(newContext);

      const summaryParts: string[] = [];
      if (newContext.field) summaryParts.push(`🎓 ${newContext.field}`);
      if (newContext.country) summaryParts.push(`📍 ${newContext.country}`);
      summaryParts.push(`💰 Budget: ${getBudgetLabel(message)}`);
      if (newContext.level)
        summaryParts.push(`📚 ${getLevelLabel(newContext.level)}`);

      return {
        response: {
          text: `Here's what I found for you:\n\n${summaryParts.join(
            "\n"
          )}\n\nHere are some universities you could explore:`,
          recommendations: universities,
          delay: 1500,
        },
        updatedContext: newContext,
      };
    }

    case "show_results":
    case "refining": {
      newContext.stage = "refining";

      // Handle refinement commands
      const lower = message.toLowerCase();

      if (
        lower.includes("cheaper") ||
        lower.includes("affordable") ||
        lower.includes("low cost")
      ) {
        newContext.budget = "under_10l";
        const universities = filterUniversities(newContext);
        return {
          response: {
            text: "Sure! Here are some more affordable options that fit your preferences:",
            recommendations: universities,
            delay: 1000,
          },
          updatedContext: newContext,
        };
      }

      if (lower.includes("compare")) {
        return {
          response: {
            text: "I'd be happy to help you compare! The comparison feature is coming soon. For now, you can save universities and compare them side by side.",
            delay: 800,
          },
          updatedContext: newContext,
        };
      }

      // Detect new country/field
      if (detectedCountry || detectedField) {
        const universities = filterUniversities(newContext);
        const parts: string[] = [];
        if (newContext.country) parts.push(`in ${newContext.country}`);
        if (newContext.field) parts.push(`for ${newContext.field}`);

        return {
          response: {
            text: `Here are universities ${parts.join(" ")} that match your preferences:`,
            recommendations: universities,
            delay: 1000,
          },
          updatedContext: newContext,
        };
      }

      // Default refinement
      const universities = filterUniversities(newContext);
      return {
        response: {
          text: "Here are some updated recommendations based on your preferences:",
          recommendations: universities,
          delay: 1000,
        },
        updatedContext: newContext,
      };
    }

    default: {
      return {
        response: {
          text: "I'm here to help! Tell me what you're looking for in a college, and I'll find the best options for you.",
          delay: 600,
        },
        updatedContext: { ...context, stage: "initial" },
      };
    }
  }
}

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
