import { google } from "@ai-sdk/google";
import { ToolLoopAgent } from "ai";
import { generateQuizTool } from "./tools/generateQuiz";
import { generateRoadmapTool } from "./tools/generateRoadmap";
import { searchContentTool } from "./tools/searchContent";

const BASE_INSTRUCTIONS = `You are Cyber Camp's AI tutor.
Help learners with concise, clear, and practical guidance on cybersecurity.

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
    model: google("gemini-1.5-flash"),
    instructions: `${BASE_INSTRUCTIONS}\n\n${isUltra ? ULTRA_APPENDIX : FREE_APPENDIX}`,
    tools: {
      searchContent: searchContentTool,
      ...(isUltra ? { generateQuiz: generateQuizTool } : {}),
      ...(isUltra ? { generateRoadmap: generateRoadmapTool } : {}),
    },
  });
}
