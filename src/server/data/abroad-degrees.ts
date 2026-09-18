import { DegreeOption } from "@/lib/types";

// Broad field-of-study catalog for the study-abroad track. No entrance-exam
// step applies here — international admissions run on GPA/IELTS/SAT etc.,
// which is out of scope for this build.
export const ABROAD_DEGREES: DegreeOption[] = [
  { id: "computer-science", name: "Computer Science", category: "Technology", emoji: "💻" },
  { id: "artificial-intelligence", name: "Artificial Intelligence & ML", category: "Technology", emoji: "🤖" },
  { id: "data-science", name: "Data Science & Analytics", category: "Technology", emoji: "📈" },
  { id: "engineering", name: "Engineering", category: "Engineering", emoji: "🛠️" },
  { id: "business", name: "Business & Management", category: "Business", emoji: "💼" },
  { id: "medicine", name: "Medicine & Health Sciences", category: "Medical", emoji: "🩺" },
];

export function getAbroadDegreeById(id: string): DegreeOption | undefined {
  return ABROAD_DEGREES.find((d) => d.id === id);
}
