import { DegreeOption } from "@/lib/types";

// Curated catalog of popular Indian UG degree paths, the subjects worth
// capturing a Class 12 percentage for, and the entrance exams that map to them.
export const INDIA_DEGREES: DegreeOption[] = [
  {
    id: "btech",
    name: "B.Tech / B.E. — Engineering",
    category: "Engineering",
    emoji: "🛠️",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    examIds: ["jee-main", "jee-advanced", "bitsat", "comedk", "viteee", "srmjeee", "mhtcet", "kcet"],
  },
  {
    id: "mbbs",
    name: "MBBS — Medicine",
    category: "Medical",
    emoji: "🩺",
    subjects: ["Physics", "Chemistry", "Biology"],
    examIds: ["neet-ug"],
  },
  {
    id: "bds",
    name: "BDS — Dental Surgery",
    category: "Medical",
    emoji: "🦷",
    subjects: ["Physics", "Chemistry", "Biology"],
    examIds: ["neet-ug"],
  },
  {
    id: "bpharm",
    name: "B.Pharm — Pharmacy",
    category: "Medical",
    emoji: "💊",
    subjects: ["Physics", "Chemistry", "Biology / Mathematics"],
    examIds: ["comedk", "mhtcet", "kcet"],
  },
  {
    id: "barch",
    name: "B.Arch — Architecture",
    category: "Design & Architecture",
    emoji: "🏛️",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    examIds: ["nata", "jee-paper2"],
  },
  {
    id: "bdes",
    name: "B.Des — Design",
    category: "Design & Architecture",
    emoji: "🎨",
    subjects: ["Class 12 Overall %"],
    examIds: ["uceed", "nid-dat", "nift-ee"],
  },
  {
    id: "law",
    name: "BA LLB / BBA LLB — Law",
    category: "Law",
    emoji: "⚖️",
    subjects: ["Class 12 Overall %"],
    examIds: ["clat", "ailet", "lsat-india"],
  },
  {
    id: "bba",
    name: "BBA — Management",
    category: "Commerce & Management",
    emoji: "📊",
    subjects: ["Class 12 Overall %"],
    examIds: ["cuet", "ipmat", "set"],
  },
  {
    id: "bcom",
    name: "B.Com — Commerce",
    category: "Commerce & Management",
    emoji: "💹",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    examIds: ["cuet"],
  },
  {
    id: "bsc",
    name: "B.Sc — Science",
    category: "Science",
    emoji: "🔬",
    subjects: ["Physics", "Chemistry", "Mathematics / Biology"],
    examIds: ["cuet"],
  },
  {
    id: "bca",
    name: "BCA — Computer Applications",
    category: "Science",
    emoji: "💻",
    subjects: ["Mathematics / Computer Science", "Class 12 Overall %"],
    examIds: ["cuet", "set"],
  },
  {
    id: "ba",
    name: "BA — Arts & Humanities",
    category: "Arts & Humanities",
    emoji: "📚",
    subjects: ["Class 12 Overall %"],
    examIds: ["cuet"],
  },
];

export function getIndiaDegreeById(id: string): DegreeOption | undefined {
  return INDIA_DEGREES.find((d) => d.id === id);
}
