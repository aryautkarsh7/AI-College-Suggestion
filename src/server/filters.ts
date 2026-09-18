import { ConversationContext, SubjectScore, Track, University } from "@/lib/types";
import { INDIA_DEGREES, getIndiaDegreeById } from "./data/india-degrees";
import { ABROAD_DEGREES, getAbroadDegreeById } from "./data/abroad-degrees";
import { INDIA_COLLEGES, IndiaCollegeRaw } from "./data/india-colleges";
import { ABROAD_UNIVERSITIES } from "./data/abroad-universities";

// ─── Text detection (used only on the free-text "initial" turn) ───

const trackKeywords: Record<Track, string[]> = {
  india: ["india", "indian", "domestic", "bangalore", "bengaluru", "mumbai", "delhi", "karnataka", "hyderabad", "chennai", "pune"],
  abroad: ["abroad", "overseas", "foreign", "germany", "canada", "usa", "us ", "united states", "uk", "united kingdom", "australia", "switzerland", "netherlands", "singapore"],
};

export function detectTrack(text: string): Track | undefined {
  const lower = text.toLowerCase();
  for (const [track, keywords] of Object.entries(trackKeywords) as [Track, string[]][]) {
    if (keywords.some((kw) => lower.includes(kw))) return track;
  }
  return undefined;
}

export function detectDegreeId(text: string, track: Track): string | undefined {
  const lower = text.toLowerCase();
  const catalog = track === "india" ? INDIA_DEGREES : ABROAD_DEGREES;
  const found = catalog.find((d) => lower.includes(d.name.toLowerCase().split(" ")[0]) || lower.includes(d.id));
  return found?.id;
}

const countryKeywords: Record<string, string[]> = {
  Germany: ["germany", "german", "deutschland", "berlin", "munich"],
  Canada: ["canada", "canadian", "toronto", "vancouver", "waterloo"],
  "United States": ["usa", "us", "united states", "america", "american"],
  "United Kingdom": ["uk", "united kingdom", "england", "london", "british", "britain"],
  Australia: ["australia", "australian", "melbourne", "sydney"],
  Switzerland: ["switzerland", "swiss", "zurich"],
  Netherlands: ["netherlands", "dutch", "holland", "delft"],
  Singapore: ["singapore"],
};

export function detectCountry(text: string): string | undefined {
  const lower = text.toLowerCase();
  for (const [country, keywords] of Object.entries(countryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) return country;
  }
  return undefined;
}

// ─── Percentage helpers ───

export function averagePercentage(scores?: SubjectScore[]): number | undefined {
  if (!scores || scores.length === 0) return undefined;
  const valid = scores.filter((s) => Number.isFinite(s.percentage));
  if (valid.length === 0) return undefined;
  return valid.reduce((sum, s) => sum + s.percentage, 0) / valid.length;
}

function parseFeeLakhs(feeRange: string): number {
  const matches = [...feeRange.matchAll(/([\d.]+)\s*L/gi)].map((m) => parseFloat(m[1]));
  if (matches.length > 0) return Math.max(...matches);
  return 0; // nominal government fee, effectively "under any budget"
}

const budgetMaxLakhs: Record<string, number> = {
  under_10l: 10,
  "10_20l": 20,
  "20_30l": 30,
  "30l_plus": Infinity,
};

// ─── India matching ───

interface ScoredCollege {
  college: IndiaCollegeRaw;
  score: number;
}

function scoreIndiaCollege(college: IndiaCollegeRaw, context: ConversationContext): number {
  let score = 0;

  if (context.exams && context.exams.length > 0) {
    const overlap = college.examsAccepted.some((e) => context.exams!.includes(e));
    score += overlap ? 3 : -2;
  }

  const avg = averagePercentage(context.subjectScores);
  const tierBonus = { elite: 2, premier: 1, emerging: 0 }[college.tier];
  if (avg !== undefined) {
    if (avg >= 90) score += tierBonus + 2;
    else if (avg >= 75) score += Math.min(tierBonus, 1) + 1;
    else if (college.tier === "elite") score -= 1;
    else score += 0.5;
  } else {
    score += tierBonus;
  }

  if (context.budget && budgetMaxLakhs[context.budget] !== undefined) {
    const fee = parseFeeLakhs(college.feeRange);
    score += fee <= budgetMaxLakhs[context.budget] ? 1 : -1;
  }

  return score;
}

function toUniversity(college: IndiaCollegeRaw, context: ConversationContext, score: number): University {
  const degree = getIndiaDegreeById(context.degreeId ?? "");
  const matchLevel: University["matchLevel"] =
    score >= 4 ? "Strong preference match" : score >= 1 ? "Good preference match" : "Explore further";

  return {
    id: college.id,
    name: college.name,
    location: `${college.city}, ${college.state}`,
    country: "India",
    countryFlag: "🇮🇳",
    course: degree?.name ?? "—",
    type: college.type,
    tuitionRange: college.feeRange,
    matchLevel,
    description: college.blurb,
    examsAccepted: college.examsAccepted,
  };
}

export function filterIndiaColleges(context: ConversationContext): { results: University[]; note: string } {
  const degreeId = context.degreeId;
  let candidates = degreeId ? INDIA_COLLEGES.filter((c) => c.courses.includes(degreeId)) : INDIA_COLLEGES;

  if (candidates.length === 0) candidates = INDIA_COLLEGES;

  const scored: ScoredCollege[] = candidates.map((college) => ({
    college,
    score: scoreIndiaCollege(college, context),
  }));

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 6);
  const results = top.map(({ college, score }) => toUniversity(college, context, score));

  const note =
    "This is an indicative shortlist based on your inputs, not an official cutoff prediction — always confirm eligibility and cutoffs on the official college/exam websites before applying.";

  return { results, note };
}

// ─── Abroad matching ───

export function filterAbroadUniversities(context: ConversationContext): University[] {
  let results = [...ABROAD_UNIVERSITIES];

  if (context.country) {
    if (context.country === "Europe") {
      results = results.filter((u) => ["Germany", "Switzerland", "Netherlands", "United Kingdom"].includes(u.country));
    } else {
      results = results.filter((u) => u.country === context.country);
    }
  }

  const degree = context.degreeId ? getAbroadDegreeById(context.degreeId) : undefined;
  if (degree) {
    const key = degree.name.toLowerCase();
    results = results.filter(
      (u) => u.course.toLowerCase().includes(key) || key.includes(u.course.toLowerCase())
    );
  }

  if (results.length === 0) {
    results = ABROAD_UNIVERSITIES.slice(0, 4);
  }

  return results.slice(0, 6);
}
