import { NextRequest, NextResponse } from "next/server";
import { INDIA_EXAMS, getExamsByIds } from "@/server/data/india-exams";
import { getIndiaDegreeById } from "@/server/data/india-degrees";

export async function GET(request: NextRequest) {
  const degreeId = request.nextUrl.searchParams.get("degree");

  if (!degreeId) {
    return NextResponse.json({ exams: INDIA_EXAMS });
  }

  const degree = getIndiaDegreeById(degreeId);
  if (!degree) {
    return NextResponse.json({ error: `Unknown degree id: ${degreeId}` }, { status: 404 });
  }

  return NextResponse.json({ exams: getExamsByIds(degree.examIds ?? []) });
}
