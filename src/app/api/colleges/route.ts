import { NextRequest, NextResponse } from "next/server";
import { ConversationContext, SubjectScore } from "@/lib/types";
import { filterAbroadUniversities, filterIndiaColleges } from "@/server/filters";

// Standalone search endpoint — lets you query the same matching engine the
// chat uses without going through the conversational flow. Handy for a
// future filters page, or for hitting the backend directly.
//
// GET /api/colleges?track=india&degree=btech&exams=jee-main,comedk&budget=10_20l
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const track = params.get("track") === "abroad" ? "abroad" : "india";
  const degreeId = params.get("degree") ?? undefined;
  const exams = params.get("exams")?.split(",").filter(Boolean);
  const budget = params.get("budget") ?? undefined;
  const country = params.get("country") ?? undefined;

  const context: ConversationContext = {
    stage: "show_results",
    track,
    degreeId,
    exams,
    budget,
    country,
  };

  if (track === "india") {
    const { results, note } = filterIndiaColleges(context);
    return NextResponse.json({ results, note });
  }

  const results = filterAbroadUniversities(context);
  return NextResponse.json({ results });
}

interface CollegeSearchBody {
  track?: "india" | "abroad";
  degreeId?: string;
  exams?: string[];
  subjectScores?: SubjectScore[];
  budget?: string;
  country?: string;
}

export async function POST(request: NextRequest) {
  let body: CollegeSearchBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const context: ConversationContext = {
    stage: "show_results",
    track: body.track ?? "india",
    degreeId: body.degreeId,
    exams: body.exams,
    subjectScores: body.subjectScores,
    budget: body.budget,
    country: body.country,
  };

  if (context.track === "india") {
    const { results, note } = filterIndiaColleges(context);
    return NextResponse.json({ results, note });
  }

  const results = filterAbroadUniversities(context);
  return NextResponse.json({ results });
}
