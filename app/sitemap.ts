import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";

const COURSE_SLUGS_QUERY = `*[_type == "course" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
const ACADEMY_SLUGS_QUERY = `*[_type == "academyCourse" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/programs"), lastModified: now, changeFrequency: "daily", priority: 0.96 },
    { url: absoluteUrl("/paths"), lastModified: now, changeFrequency: "weekly", priority: 0.94 },
    { url: absoluteUrl("/docs"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/courses"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/academy"), lastModified: now, changeFrequency: "daily", priority: 0.88 },
    { url: absoluteUrl("/community"), lastModified: now, changeFrequency: "weekly", priority: 0.82 },
    { url: absoluteUrl("/ai"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/pricing"), lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: absoluteUrl("/leaderboard"), lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: absoluteUrl("/notes"), lastModified: now, changeFrequency: "daily", priority: 0.65 },
    {
      url: absoluteUrl("/cybersecurity-course-ethiopia"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: absoluteUrl("/ethical-hacking-addis-ababa"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: absoluteUrl("/networking-training-ethiopia"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },
  ];

  try {
    const [{ data: courses }, { data: academyCourses }] = await Promise.all([
      sanityFetch({ query: COURSE_SLUGS_QUERY }) as Promise<{
        data: { slug: string; _updatedAt: string }[];
      }>,
      sanityFetch({ query: ACADEMY_SLUGS_QUERY }) as Promise<{
        data: { slug: string; _updatedAt: string }[];
      }>,
    ]);

    const courseRoutes = (courses ?? []).flatMap((course) => [
      {
        url: absoluteUrl(`/courses/${course.slug}`),
        lastModified: new Date(course._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.84,
      },
      {
        url: absoluteUrl(`/programs/${course.slug}`),
        lastModified: new Date(course._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.84,
      },
    ]);

    const academyRoutes = (academyCourses ?? []).map((course) => ({
      url: absoluteUrl(`/academy/${course.slug}`),
      lastModified: new Date(course._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.82,
    }));

    return [...staticRoutes, ...courseRoutes, ...academyRoutes];
  } catch {
    return staticRoutes;
  }
}
