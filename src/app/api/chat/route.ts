import { NextRequest, NextResponse } from "next/server";
import { ChatTurnPayload, ConversationContext } from "@/lib/types";
import { processTurn } from "@/server/engine";

interface ChatRequestBody {
  message: string;
  context: ConversationContext;
  payload?: ChatTurnPayload;
}

export async function POST(request: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body.message !== "string" || !body.context || typeof body.context.stage !== "string") {
    return NextResponse.json({ error: "Expected { message, context }" }, { status: 400 });
  }

  const { response, updatedContext } = processTurn(body.message, body.context, body.payload);

  return NextResponse.json({ response, updatedContext });
}
