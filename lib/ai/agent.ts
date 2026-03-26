import { createOpenAI } from "@ai-sdk/openai";
import { ToolLoopAgent } from "ai";
import { generateQuizTool } from "./tools/generateQuiz";
import { generateRoadmapTool } from "./tools/generateRoadmap";
import { searchContentTool } from "./tools/searchContent";

const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Cyber Camp AI",
  },
});

const BASE_INSTRUCTIONS = `You are Sonny's Academy AI tutor.
Help learners with concise, clear, and practical guidance.

Rules:
- Always prioritize course-catalog truth from tools over assumptions.
- If content is missing in the catalog, say so directly.
- For links, only use URLs returned by tools.
- Keep answers helpful, structured, and learning-focused.`;

const ULTRA_APPENDIX = `Ultra users can access advanced support:
- Use searchContent for grounded answers.
- Use generateQuiz when asked for quizzes or practice.
- Use generateRoadmap for learning plans based on goals.`;

const FREE_APPENDIX = `Free users should receive guidance using available search results and concise recommendations.
Do not mention hidden internal plan logic.`;

export function createTutorAgent(isUltra: boolean) {
  return new ToolLoopAgent({
    model: openrouter("gpt-3.5-turbo"),
    instructions: `${BASE_INSTRUCTIONS}\n\n${isUltra ? ULTRA_APPENDIX : FREE_APPENDIX}`,
    tools: {
      searchContent: searchContentTool,
      ...(isUltra ? { generateQuiz: generateQuizTool } : {}),
      ...(isUltra ? { generateRoadmap: generateRoadmapTool } : {}),
    },
  });
}
