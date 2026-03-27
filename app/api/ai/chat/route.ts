import { google } from "@ai-sdk/google";
import { generateText } from "ai";

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

function roleFromInput(role: unknown): "assistant" | "user" | "system" {
  if (role === "assistant" || role === "system") {
    return role;
  }

  return "user";
}

function extractTextMessage(
  item: unknown,
): { role: "assistant" | "user" | "system"; text: string } | null {
  if (!item || typeof item !== "object") {
    return null;
  }

  const candidate = item as LegacyMessage & {
    parts?: Array<{ type?: string; text?: string }>;
  };

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

function toMessages(
  input: RequestBody,
): Array<{ role: "assistant" | "user" | "system"; content: string }> {
  const normalized = (input.messages ?? [])
    .map(extractTextMessage)
    .filter(
      (item): item is { role: "assistant" | "user" | "system"; text: string } =>
        Boolean(item),
    )
    .map((message) => ({
      role: message.role,
      content: message.text,
    }));

  if (normalized.length > 0) {
    return normalized;
  }

  const message = input.message?.trim();

  return message
    ? [
        {
          role: "user" as const,
          content: message,
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
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }

  const messages = toMessages(body);

  if (messages.length === 0) {
    return jsonResponse({ error: "A valid message is required." }, 400);
  }

  try {
    const result = await generateText({
      model: google("gemini-2.5-flash-lite"),
      system: `You are XyberSec's AI Assistant.
Help learners with comprehensive guidance on IT, technology, programming, cybersecurity, development, and multiple tech domains.

Your Role:
- Answer questions about software development, web development, cloud computing, databases, networking, security, DevOps, IT best practices, and more
- Provide concise, clear, and practical guidance tailored to the user's knowledge level
- Explain complex concepts in simple, understandable terms
- Offer code examples and best practices when relevant
- Be versatile and supportive across various IT/tech topics

Rules:
- Always prioritize accuracy and clarity
- Provide helpful, structured, and learning-focused responses
- Offer practical examples and best practices`,
      messages: messages as any,
    });

    // Stream the result back as Server-Sent Events
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        try {
          // Send start event
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "start" })}\n\n`));

          // Split text into chunks and stream them
          const text = result.text || "";
          const chunkSize = 50;
          for (let i = 0; i < text.length; i += chunkSize) {
            const chunk = text.substring(i, i + chunkSize);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "text-delta", id: "0", delta: chunk })}\n\n`,
              ),
            );
          }

          // Send finish event
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "finish", finishReason: "stop" })}\n\n`,
            ),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Agent error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Internal server error" },
      500,
    );
  }
}
