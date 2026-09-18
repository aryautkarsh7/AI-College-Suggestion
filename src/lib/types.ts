// ─── Chat Types ───

export type MessageRole = "user" | "ai";

export type ChatWidget = "chips" | "degree" | "exams" | "percentage" | "none";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  followUpOptions?: FollowUpOption[];
  recommendations?: University[];
  isTyping?: boolean;
  widget?: ChatWidget;
  widgetLabel?: string;
  degreeOptions?: DegreeOption[];
  examOptions?: ExamOption[];
  percentageSubjects?: string[];
  resultsNote?: string;
}

export interface FollowUpOption {
  label: string;
  value: string;
  emoji?: string;
}

// ─── Track / Degree / Exam Types ───

export type Track = "india" | "abroad";

export interface DegreeOption {
  id: string;
  name: string;
  category: string;
  emoji: string;
  subjects?: string[];
  examIds?: string[];
}

export interface ExamOption {
  id: string;
  name: string;
  fullName: string;
}

export interface SubjectScore {
  subject: string;
  percentage: number;
}

// ─── University Types ───

export interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  countryFlag: string;
  course: string;
  type: "Public" | "Private" | "Government" | "Deemed";
  tuitionRange: string;
  matchLevel: "Strong preference match" | "Good preference match" | "Explore further";
  description?: string;
  examsAccepted?: string[];
  nirfRank?: number;
}

// ─── AI Response Types ───

export interface AIResponse {
  text: string;
  followUpOptions?: FollowUpOption[];
  recommendations?: University[];
  delay?: number;
  widget?: ChatWidget;
  widgetLabel?: string;
  degreeOptions?: DegreeOption[];
  examOptions?: ExamOption[];
  percentageSubjects?: string[];
  resultsNote?: string;
}

// ─── Conversation State ───

export type ConversationStage =
  | "initial"
  | "ask_track"
  | "ask_degree"
  | "ask_exams"
  | "ask_percentage"
  | "ask_level"
  | "ask_budget"
  | "show_results"
  | "refining";

export interface ConversationContext {
  stage: ConversationStage;
  track?: Track;
  degreeId?: string;
  exams?: string[];
  noExam?: boolean;
  subjectScores?: SubjectScore[];
  field?: string;
  country?: string;
  region?: string;
  level?: string;
  budget?: string;
  preference?: string;
  originalQuery?: string;
}

// ─── Chat API Payload ───

export interface ChatTurnPayload {
  degreeId?: string;
  exams?: string[];
  noExam?: boolean;
  subjectScores?: SubjectScore[];
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
