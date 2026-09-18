import { NextRequest, NextResponse } from "next/server";
import { INDIA_DEGREES } from "@/server/data/india-degrees";
import { ABROAD_DEGREES } from "@/server/data/abroad-degrees";

export async function GET(request: NextRequest) {
  const track = request.nextUrl.searchParams.get("track");
  const degrees = track === "abroad" ? ABROAD_DEGREES : INDIA_DEGREES;
  return NextResponse.json({ degrees });
}
