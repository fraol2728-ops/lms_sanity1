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
    mode: "real-ai",
    message: "AI route is available. Send a POST request with a message.",
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message?: string;
      messages?: Array<{ role?: string; content?: string }>;
    };

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

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return jsonResponse(
        {
          error:
            "OPENROUTER_API_KEY is missing. Configure it to enable real AI responses.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: chatMessages,
        }),
      },
    );

    const data = (await response.json().catch(() => null)) as {
      error?: { message?: string };
      choices?: Array<{
        message?: { content?: string | null };
      }>;
    } | null;

    if (!response.ok) {
      return jsonResponse(
        {
          error:
            data?.error?.message ??
            `OpenRouter request failed with status ${response.status}.`,
        },
        { status: response.status },
      );
    }

    const text = data?.choices?.[0]?.message?.content?.trim() ?? "";

    if (!text) {
      return jsonResponse(
        { error: "OpenRouter returned an empty response." },
        { status: 502 },
      );
    }

    return jsonResponse({ text });
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
