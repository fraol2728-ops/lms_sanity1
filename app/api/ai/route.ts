export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function jsonResponse(payload: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(payload), {
    status: init?.status ?? 200,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const rawRole =
        "role" in item && typeof item.role === "string"
          ? item.role.toLowerCase()
          : "";
      const content =
        "content" in item && typeof item.content === "string"
          ? item.content.trim()
          : "";

      if (!content) {
        return null;
      }

      const role: ChatMessage["role"] =
        rawRole === "user" ? "user" : "assistant";

      return { role, content };
    })
    .filter((message): message is ChatMessage => message !== null);
}

export async function GET() {
  return jsonResponse({
    ok: true,
    route: "/api/ai",
    message: "AI route is available. Send a POST request with a message.",
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message?: string;
      messages?: Array<{ role?: string; content?: string }>;
    };

    const apiKey = process.env.GROQ_API_KEY ?? process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return jsonResponse(
        { error: "Missing GROQ_API_KEY configuration." },
        { status: 500 },
      );
    }

    const message = body.message?.trim() ?? "";
    const history = normalizeMessages(body.messages);

    const lastMessage = history[history.length - 1];

    const chatMessages =
      history.length > 0
        ? history
        : message
          ? [{ role: "user", content: message }]
          : [];

    if (chatMessages.length === 0) {
      return jsonResponse(
        { error: "A valid message is required." },
        { status: 400 },
      );
    }

    if (!lastMessage && !message) {
      return jsonResponse(
        { error: "Message history is invalid." },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: chatMessages,
          stream: true,
        }),
      },
    );

    if (!response.ok || !response.body) {
      const data = (await response.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;

      const errorMessage =
        data?.error?.message ??
        `Groq request failed with status ${response.status}.`;

      return jsonResponse({ error: errorMessage }, { status: response.status });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = response.body.getReader();
    let buffer = "";
    let didStreamAnyText = false;

    const stream = new ReadableStream<Uint8Array>({
      async pull(controller) {
        try {
          const { done, value } = await reader.read();

          if (done) {
            if (!didStreamAnyText) {
              controller.enqueue(
                encoder.encode(
                  "I couldn't generate a response this time. Please try again.",
                ),
              );
            }
            controller.close();
            return;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.trim();

            if (!line || !line.startsWith("data:")) {
              continue;
            }

            const payload = line.slice(5).trim();

            if (payload === "[DONE]") {
              controller.close();
              return;
            }

            const parsed = JSON.parse(payload) as {
              choices?: Array<{
                delta?: { content?: string | null };
              }>;
            };

            const content = parsed.choices?.[0]?.delta?.content ?? "";

            if (!content) {
              continue;
            }

            didStreamAnyText = true;
            controller.enqueue(encoder.encode(content));
          }
        } catch (error) {
          console.error("AI stream parse error:", error);
          if (!didStreamAnyText) {
            controller.enqueue(
              encoder.encode(
                "I hit a temporary streaming issue. Please try your message again.",
              ),
            );
          }
          controller.close();
        }
      },
      cancel() {
        void reader.cancel();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    console.error("AI route error:", error);

    const details =
      error instanceof Error ? error.message : "Unexpected server error.";

    return jsonResponse(
      {
        error: "Failed to process AI request.",
        details,
      },
      { status: 500 },
    );
  }
}
