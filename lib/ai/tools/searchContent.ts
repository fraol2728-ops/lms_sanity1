import { tool } from "ai";
import { defineQuery } from "next-sanity";
import { z } from "zod";
import { sanityFetch } from "@/sanity/lib/live";

const ALL_COURSES_QUERY = defineQuery(`*[_type == "course"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  tier,
  "category": category->title,
  modules[]-> {
    _id,
    title,
    description,
    lessons[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      "contentText": pt::text(content)
    }
  }
}`);

const searchSchema = z.object({
  query: z.string().min(2).describe("Topic or question to find in course content"),
  maxResults: z
    .number()
    .int()
    .min(1)
    .max(10)
    .default(5)
    .describe("Maximum number of courses to return"),
});

type Lesson = {
  _id: string;
  title: string;
  slug: string | null;
  description: string | null;
  contentText: string | null;
};

type Module = {
  _id: string;
  title: string;
  description: string | null;
  lessons?: Lesson[];
};

type Course = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tier: "free" | "ultra" | string;
  category: string | null;
  modules?: Module[];
};

function contains(text: string | null | undefined, term: string): boolean {
  return Boolean(text?.toLowerCase().includes(term.toLowerCase()));
}

function scoreCourse(course: Course, terms: string[]): number {
  let score = 0;

  for (const term of terms) {
    if (contains(course.title, term)) score += 100;
    if (contains(course.description, term)) score += 45;
    if (contains(course.category, term)) score += 20;

    for (const module of course.modules ?? []) {
      if (contains(module.title, term)) score += 30;
      if (contains(module.description, term)) score += 10;

      for (const lesson of module.lessons ?? []) {
        if (contains(lesson.title, term)) score += 25;
        if (contains(lesson.description, term)) score += 10;
        if (contains(lesson.contentText, term)) score += 7;
      }
    }
  }

  return score;
}

function preview(text: string | null, max = 1200): string | null {
  if (!text) return null;
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export const searchContentTool = tool({
  description:
    "Search course/module/lesson content and return structured catalog results with relevance metadata.",
  inputSchema: searchSchema,
  execute: async ({ query, maxResults }) => {
    const { data } = await sanityFetch({ query: ALL_COURSES_QUERY });
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .map((term) => term.trim())
      .filter((term) => term.length > 1);

    if (terms.length === 0) {
      return {
        found: false,
        query,
        message: "Please provide at least one meaningful search term.",
        results: [],
      };
    }

    const ranked = (data as Course[])
      .map((course) => ({ course, score: scoreCourse(course, terms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);

    const results = ranked.map(({ course, score }) => ({
      relevanceScore: score,
      course: {
        id: course._id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        tier: course.tier,
        category: course.category,
        url: `/courses/${course.slug}`,
      },
      modules: (course.modules ?? []).map((module) => ({
        id: module._id,
        title: module.title,
        description: module.description,
        lessons: (module.lessons ?? []).map((lesson) => ({
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          slug: lesson.slug,
          url: lesson.slug ? `/lessons/${lesson.slug}` : null,
          contentPreview: preview(lesson.contentText),
        })),
      })),
    }));

    return {
      found: results.length > 0,
      query,
      message:
        results.length > 0
          ? `Found ${results.length} relevant course result${results.length === 1 ? "" : "s"}.`
          : "No relevant course content found.",
      results,
    };
  },
});
