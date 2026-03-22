import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";

const COURSE_SLUGS_QUERY = `*[_type == "course" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
const ACADEMY_SLUGS_QUERY = `*[_type == "academyCourse" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: new Date(), priority: 1 },
    { url: absoluteUrl("/courses"), lastModified: new Date(), priority: 0.95 },
    { url: absoluteUrl("/academy"), lastModified: new Date(), priority: 0.9 },
    { url: absoluteUrl("/paths"), lastModified: new Date(), priority: 0.85 },
    { url: absoluteUrl("/docs"), lastModified: new Date(), priority: 0.8 },
    { url: absoluteUrl("/ai"), lastModified: new Date(), priority: 0.8 },
    { url: absoluteUrl("/pricing"), lastModified: new Date(), priority: 0.75 },
    { url: absoluteUrl("/community"), lastModified: new Date(), priority: 0.7 },
    {
      url: absoluteUrl("/cybersecurity-course-ethiopia"),
      lastModified: new Date(),
      priority: 0.88,
    },
    {
      url: absoluteUrl("/ethical-hacking-addis-ababa"),
      lastModified: new Date(),
      priority: 0.88,
    },
    {
      url: absoluteUrl("/networking-training-ethiopia"),
      lastModified: new Date(),
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

    return [
      ...staticRoutes,
      ...(courses ?? []).map((course) => ({
        url: absoluteUrl(`/courses/${course.slug}`),
        lastModified: new Date(course._updatedAt),
        priority: 0.84,
      })),
      ...(academyCourses ?? []).map((course) => ({
        url: absoluteUrl(`/academy/${course.slug}`),
        lastModified: new Date(course._updatedAt),
        priority: 0.82,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
