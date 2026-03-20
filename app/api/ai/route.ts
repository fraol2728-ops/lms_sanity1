function buildOfflineResponse(message: string) {
  return [
    "AI Lab is running in offline fallback mode right now, so this is a simulated cybersecurity tutor response.",
    "",
    `Your question: "${message}"`,
    "",
    "Quick guidance:",
    "- Start by defining the system, threat, or workflow you are analyzing.",
    "- Identify the likely attack surface, affected assets, and the business impact.",
    "- Apply one practical next step such as enabling logs, tightening access controls, patching exposed services, or validating alerts with known indicators.",
    "",
    "If you want, ask a narrower follow-up like:",
    "- How do I investigate a phishing email?",
    "- How do I harden a Linux server?",
    "- How do I build an incident response checklist?",
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { message?: string };
    const message = body.message?.trim();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ text: buildOfflineResponse(message) });
    }

    const prompt = `
You are an expert cybersecurity tutor.

- Explain clearly and simply
- Give real-world examples
- Focus on ethical hacking, networking, and security
- Be concise but helpful

User question:
${message}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Gemini API request failed with status ${response.status}`,
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text?.trim() ?? "")
        .filter(Boolean)
        .join("\n")
        .trim() ?? "";

    if (!text) {
      return Response.json({ text: buildOfflineResponse(message) });
    }

    return Response.json({ text });
  } catch (error) {
    console.error("AI ERROR:", error);

    const details =
      error instanceof Error ? error.message : "Unknown AI request failure";

    return Response.json(
      {
        text: buildOfflineResponse("Please retry your question."),
        error: "AI request failed",
        details,
      },
      { status: 200 },
    );
  }
}
