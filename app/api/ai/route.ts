type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      message?: string;
      messages?: Array<{ role?: string; content?: string }>;
    };

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing OPENROUTER_API_KEY configuration." },
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
      return Response.json(
        { error: "A valid message is required." },
        { status: 400 },
      );
    }

    if (!lastMessage && !message) {
      return Response.json(
        { error: "Message history is invalid." },
        { status: 400 },
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
      const errorMessage =
        data?.error?.message ??
        `OpenRouter request failed with status ${response.status}.`;

      return Response.json(
        { error: errorMessage },
        { status: response.status },
      );
    }

    const text = data?.choices?.[0]?.message?.content?.trim() ?? "";

    if (!text) {
      return Response.json(
        { error: "OpenRouter returned an empty response." },
        { status: 502 },
      );
    }

    return Response.json({ text });
  } catch (error) {
    console.error("AI route error:", error);

    const details =
      error instanceof Error ? error.message : "Unexpected server error.";

    return Response.json(
      {
        error: "Failed to process AI request.",
        details,
      },
      { status: 500 },
    );
  }
}
