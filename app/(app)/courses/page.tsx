import {
  type CatalogCourse,
  CoursesGrid,
} from "@/components/courses/CoursesGrid";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import {
  COURSES_CATEGORIES_QUERY,
  DASHBOARD_COURSES_QUERY,
} from "@/sanity/lib/queries";
import type { DASHBOARD_COURSES_QUERYResult } from "@/sanity.types";

export const metadata = buildMetadata({
  title: "Cybersecurity Courses Ethiopia",
  description:
    "Browse Dev Fraol Academy courses for ethical hacking, cybersecurity, Linux, and networking training in Ethiopia and online.",
  path: "/courses",
  keywords: [
    "fraol course",
    "cybersecurity course Ethiopia",
    "online tech courses Ethiopia",
  ],
});

interface CategoryResult {
  _id: string;
  title: string | null;
}

const inferDifficulty = (
  tier: string | null | undefined,
): CatalogCourse["difficulty"] => {
  if (tier === "ultra") return "Advanced";
  if (tier === "pro") return "Intermediate";
  return "Beginner";
};

export default async function CoursesPage() {
  const [{ data: coursesData }, { data: categoriesData }] = (await Promise.all([
    sanityFetch({
      query: DASHBOARD_COURSES_QUERY,
    }) as Promise<{ data: DASHBOARD_COURSES_QUERYResult }>,
    sanityFetch({
      query: COURSES_CATEGORIES_QUERY,
    }) as Promise<{ data: CategoryResult[] }>,
  ])) as [{ data: DASHBOARD_COURSES_QUERYResult }, { data: CategoryResult[] }];

  const categories = categoriesData
    .filter((category) => Boolean(category.title))
    .map((category) => ({
      id: category._id,
      title: category.title ?? "General",
    }));

  const courses: CatalogCourse[] = coursesData
    .filter((course) => Boolean(course.slug?.current))
    .map((course) => {
      const lessonCount = course.lessonCount ?? 0;
      const estimatedHours = Math.max(1, Math.ceil(lessonCount / 4));

      return {
        id: course._id,
        slug: course.slug?.current ?? "",
        title: course.title ?? "Untitled Course",
        instructor: course.category?.title
          ? `${course.category.title} Team`
          : "Dev Fraol Academy Instructor",
        difficulty: inferDifficulty(course.tier),
        category: course.category?.title ?? "General",
        lessonCount,
        durationLabel: `${estimatedHours} ${estimatedHours === 1 ? "Hour" : "Hours"}`,
        thumbnailUrl: course.thumbnail?.asset?.url,
      };
    });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dev Fraol Academy courses",
    itemListElement: courses.map((course, index) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      url: `${siteConfig.url}/courses/${course.slug}`,
      educationalLevel: course.difficulty,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${siteConfig.url}/courses`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <StructuredData data={itemListSchema} />
      <StructuredData data={breadcrumbSchema} />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <section className="mb-10 rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-600/20 via-fuchsia-500/10 to-cyan-500/5 p-10 text-center shadow-xl shadow-violet-950/30">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Cybersecurity Courses
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-zinc-200/90">
            Master ethical hacking, penetration testing, Linux, and networking
            skills with structured cybersecurity training in Ethiopia.
          </p>
        </section>

        <CoursesGrid courses={courses} categories={categories} />
      </main>
    </div>
  );
}
