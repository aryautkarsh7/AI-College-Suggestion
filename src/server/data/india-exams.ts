import { ExamOption } from "@/lib/types";

// Real Indian UG entrance exams, grouped implicitly by which degrees reference them
// in india-degrees.ts. This is a curated reference catalog, not a live feed.
export const INDIA_EXAMS: ExamOption[] = [
  { id: "jee-main", name: "JEE Main", fullName: "Joint Entrance Examination – Main" },
  { id: "jee-advanced", name: "JEE Advanced", fullName: "Joint Entrance Examination – Advanced (for IITs)" },
  { id: "bitsat", name: "BITSAT", fullName: "Birla Institute of Technology and Science Admission Test" },
  { id: "comedk", name: "COMEDK UGET", fullName: "Consortium of Medical, Engineering and Dental Colleges of Karnataka UGET" },
  { id: "viteee", name: "VITEEE", fullName: "VIT Engineering Entrance Examination" },
  { id: "srmjeee", name: "SRMJEEE", fullName: "SRM Joint Engineering Entrance Examination" },
  { id: "mhtcet", name: "MHT-CET", fullName: "Maharashtra Common Entrance Test" },
  { id: "kcet", name: "KCET", fullName: "Karnataka Common Entrance Test" },
  { id: "neet-ug", name: "NEET-UG", fullName: "National Eligibility cum Entrance Test (Undergraduate)" },
  { id: "nata", name: "NATA", fullName: "National Aptitude Test in Architecture" },
  { id: "jee-paper2", name: "JEE Main Paper 2", fullName: "JEE Main Paper 2 (B.Arch / B.Planning)" },
  { id: "uceed", name: "UCEED", fullName: "Undergraduate Common Entrance Exam for Design" },
  { id: "nid-dat", name: "NID DAT", fullName: "National Institute of Design Admission Test" },
  { id: "nift-ee", name: "NIFT Entrance Exam", fullName: "National Institute of Fashion Technology Entrance Exam" },
  { id: "clat", name: "CLAT", fullName: "Common Law Admission Test" },
  { id: "ailet", name: "AILET", fullName: "All India Law Entrance Test" },
  { id: "lsat-india", name: "LSAT India", fullName: "Law School Admission Test – India" },
  { id: "cuet", name: "CUET UG", fullName: "Common University Entrance Test (Undergraduate)" },
  { id: "ipmat", name: "IPMAT", fullName: "Integrated Program in Management Aptitude Test" },
  { id: "set", name: "SET", fullName: "Symbiosis Entrance Test" },
];

export function getExamById(id: string): ExamOption | undefined {
  return INDIA_EXAMS.find((e) => e.id === id);
}

export function getExamsByIds(ids: string[]): ExamOption[] {
  return ids.map(getExamById).filter((e): e is ExamOption => Boolean(e));
}
