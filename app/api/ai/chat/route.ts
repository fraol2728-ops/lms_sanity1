import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { auth } from "@clerk/nextjs/server";
import { createTutorAgent } from "@/lib/ai/agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LegacyMessage = {
  role?: string;
  content?: string;
};

type RequestBody = {
  message?: string;
  messages?: unknown[];
};

function roleFromInput(role: unknown): UIMessage["role"] {
  if (role === "assistant" || role === "system") {
    return role;
  }

  return "user";
}

function extractTextMessage(item: unknown): { role: UIMessage["role"]; text: string } | null {
  if (!item || typeof item !== "object") {
    return null;
  }

  const candidate = item as LegacyMessage & { parts?: Array<{ type?: string; text?: string }> };

  if (typeof candidate.content === "string" && candidate.content.trim()) {
    return {
      role: roleFromInput(candidate.role),
      text: candidate.content.trim(),
    };
  }

  if (Array.isArray(candidate.parts)) {
    const text = candidate.parts
      .filter((part) => part?.type === "text" && typeof part.text === "string")
      .map((part) => part.text?.trim())
      .filter((value): value is string => Boolean(value))
      .join("\n")
      .trim();

    if (text) {
      return {
        role: roleFromInput(candidate.role),
        text,
      };
    }
  }

  return null;
}

function toUiMessages(input: RequestBody): UIMessage[] {
  const normalized = (input.messages ?? [])
    .map(extractTextMessage)
    .filter((item): item is { role: UIMessage["role"]; text: string } => Boolean(item))
    .map((message, index) => ({
      id: `msg-${index}`,
      role: message.role,
      parts: [{ type: "text" as const, text: message.text }],
    }));

  if (normalized.length > 0) {
    return normalized;
  }

  const message = input.message?.trim();

  return message
    ? [
        {
          id: "msg-0",
          role: "user",
          parts: [{ type: "text" as const, text: message }],
        },
      ]
    : [];
}

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const { userId, has } = await auth();

  if (!userId) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }

  const messages = toUiMessages(body);

  if (messages.length === 0) {
    return jsonResponse({ error: "A valid message is required." }, 400);
  }

  const isUltra = Boolean(has?.({ plan: "ultra" }));

  return createAgentUIStreamResponse({
    agent: createTutorAgent(isUltra),
    messages,
  });
}
