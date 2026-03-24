import { tool } from "ai";
import { z } from "zod";

const quizSchema = z.object({
  lessonContent: z
    .string()
    .min(40)
    .describe("Lesson content text used to create the quiz"),
  topic: z.string().optional().describe("Optional topic title for context"),
  questionCount: z.number().int().min(3).max(10).default(5),
});

export const generateQuizTool = tool({
  description:
    "Generate multiple-choice quiz questions from lesson content, including answer key and explanations.",
  inputSchema: quizSchema,
  execute: async ({ lessonContent, topic, questionCount }) => {
    const compactContent = lessonContent.replace(/\s+/g, " ").trim();
    const sentences = compactContent
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => sentence.length > 30);

    const questions = Array.from({ length: questionCount }).map((_, index) => {
      const source =
        sentences[index % Math.max(1, sentences.length)] ??
        compactContent.slice(0, 280);

      const stem = source.length > 180 ? `${source.slice(0, 177)}...` : source;
      const correctIndex = index % 4;

      return {
        id: `q-${index + 1}`,
        question: `Based on the lesson${topic ? ` on ${topic}` : ""}, what best reflects this concept: \"${stem}\"?`,
        choices: [
          "Core concept is applied correctly in context.",
          "The concept is only relevant to unrelated tooling.",
          "The concept should always be avoided in production.",
          "The concept has no practical implementation details.",
        ],
        answerIndex: correctIndex,
        explanation:
          "This answer is aligned with the lesson context and reinforces practical understanding.",
      };
    });

    return {
      topic: topic ?? "Lesson quiz",
      questionCount,
      format: "multiple-choice",
      questions,
    };
  },
});
