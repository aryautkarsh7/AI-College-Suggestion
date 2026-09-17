// ─── Chat Types ───

export type MessageRole = "user" | "ai";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  followUpOptions?: FollowUpOption[];
  recommendations?: University[];
  isTyping?: boolean;
}

export interface FollowUpOption {
  label: string;
  value: string;
  emoji?: string;
}

// ─── University Types ───

export interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  countryFlag: string;
  course: string;
  type: "Public" | "Private";
  tuitionRange: string;
  matchLevel: "Strong preference match" | "Good preference match" | "Explore further";
  description?: string;
}

// ─── AI Response Types ───

export interface AIResponse {
  text: string;
  followUpOptions?: FollowUpOption[];
  recommendations?: University[];
  delay?: number;
}

// ─── Conversation State ───

export type ConversationStage =
  | "initial"
  | "field_detected"
  | "ask_level"
  | "ask_budget"
  | "ask_preference"
  | "show_results"
  | "refining";

export interface ConversationContext {
  stage: ConversationStage;
  field?: string;
  country?: string;
  region?: string;
  level?: string;
  budget?: string;
  preference?: string;
  originalQuery?: string;
}

// ─── Suggestion Chip ───

export interface SuggestionChip {
  emoji: string;
  label: string;
  prompt: string;
}

// ─── Explore Card ───

export interface ExploreCard {
  icon: string;
  title: string;
  description: string;
}

// ─── Destination ───

export interface Destination {
  flag: string;
  name: string;
  prompt: string;
}
