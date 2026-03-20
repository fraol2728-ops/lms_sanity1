import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message?.trim();

    // ✅ Validate input (VERY IMPORTANT)
    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    // ✅ Add cybersecurity system prompt
    const prompt = `
You are an expert cybersecurity tutor.

- Explain clearly and simply
- Give real-world examples
- Focus on ethical hacking, networking, and security
- Be concise but helpful

User question:
${message}
`;

    // ✅ Correct Gemini request format
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;
    const text = response.text();

    // ✅ Fallback safety
    if (!text) {
      return Response.json({
        text: "⚠️ AI returned an empty response.",
      });
    }

    return Response.json({ text });
  } catch (error: any) {
    console.error("AI ERROR:", error);

    // ✅ Better error handling
    return Response.json(
      {
        error: "AI request failed",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
