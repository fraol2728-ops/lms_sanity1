import { tool } from "ai";
import { defineQuery } from "next-sanity";
import { z } from "zod";
import { sanityFetch } from "@/sanity/lib/live";

const ROADMAP_QUERY = defineQuery(`*[_type == "course"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  tier,
  modules[]-> {
    _id,
    title,
    lessons[]-> {
      _id,
      title,
      "slug": slug.current
    }
  }
}`);

const roadmapSchema = z.object({
  goal: z.string().min(3).describe("User learning goal"),
  maxCourses: z.number().int().min(1).max(6).default(3),
});

type RoadmapCourse = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tier: string;
  modules?: Array<{
    _id: string;
    title: string;
    lessons?: Array<{ _id: string; title: string; slug: string | null }>;
  }>;
};

function scoreByGoal(course: RoadmapCourse, terms: string[]): number {
  let score = 0;
  const haystacks = [course.title, course.description];

  for (const term of terms) {
    for (const text of haystacks) {
      if (text?.toLowerCase().includes(term)) score += 30;
    }

    for (const module of course.modules ?? []) {
      if (module.title.toLowerCase().includes(term)) score += 20;
      for (const lesson of module.lessons ?? []) {
        if (lesson.title.toLowerCase().includes(term)) score += 8;
      }
    }
  }

  return score;
}

export const generateRoadmapTool = tool({
  description:
    "Generate a structured learning roadmap from the existing course catalog for a user goal.",
  inputSchema: roadmapSchema,
  execute: async ({ goal, maxCourses }) => {
    const { data } = await sanityFetch({ query: ROADMAP_QUERY });
    const terms = goal
      .toLowerCase()
      .split(/\s+/)
      .map((term) => term.trim())
      .filter((term) => term.length > 1);

    const ranked = (data as RoadmapCourse[])
      .map((course) => ({ course, score: scoreByGoal(course, terms) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, maxCourses);

    const milestones = ranked.map(({ course }, index) => ({
      stage: index + 1,
      title: course.title,
      objective: course.description,
      tier: course.tier,
      courseUrl: `/courses/${course.slug}`,
      modules: (course.modules ?? []).map((module) => ({
        title: module.title,
        lessons: (module.lessons ?? []).map((lesson) => ({
          title: lesson.title,
          lessonUrl: lesson.slug ? `/lessons/${lesson.slug}` : null,
        })),
      })),
    }));

    return {
      goal,
      summary:
        milestones.length > 0
          ? `Created a ${milestones.length}-stage roadmap aligned to the goal.`
          : "No matching courses found. Try a more specific goal.",
      milestones,
    };
  },
});
