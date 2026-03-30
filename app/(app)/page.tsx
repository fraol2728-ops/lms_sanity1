import { auth } from "@clerk/nextjs/server";
import {
  ContinueLearning,
  CTA,
  Features,
  Footer,
  Hero,
  HowItWorks,
  PlatformPreview,
  PopularCourses,
  TrainingPaths,
} from "@/components/landing";
import { RoadmapSection } from "@/components/roadmap/roadmap-section";
import { ProgramShowcaseList } from "@/components/sections/program-showcase-list";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import {
  ALL_COURSES_QUERY,
  DASHBOARD_COURSES_QUERY,
  FEATURED_COURSES_QUERY,
} from "@/sanity/lib/queries";
import type {
  ALL_COURSES_QUERYResult,
  DASHBOARD_COURSES_QUERYResult,
  FEATURED_COURSES_QUERYResult,
} from "@/sanity.types";

function getContinueCourse(
  courses: DASHBOARD_COURSES_QUERYResult,
  userId: string,
): {
  title: string;
  progressLabel: string;
  progressPercent: number;
  href: string;
} | null {
  const withProgress = courses
    .map((course) => {
      const totalLessons = course.lessonCount ?? 0;
      const completedLessons =
        course.modules?.reduce((courseTotal, module) => {
          const moduleCompleted =
            module.lessons?.reduce((lessonTotal, lesson) => {
              return (
                lessonTotal + (lesson.completedBy?.includes(userId) ? 1 : 0)
              );
            }, 0) ?? 0;

          return courseTotal + moduleCompleted;
        }, 0) ?? 0;

      const progressPercent =
        totalLessons > 0
          ? Math.min(100, (completedLessons / totalLessons) * 100)
          : 0;

      return {
        title: course.title ?? "Untitled Course",
        totalLessons,
        completedLessons,
        progressPercent,
        href: course.slug?.current
          ? `/courses/${course.slug.current}`
          : "/dashboard",
      };
    })
    .filter(
      (course) =>
        course.totalLessons > 0 &&
        course.completedLessons < course.totalLessons,
    )
    .sort((a, b) => b.progressPercent - a.progressPercent);

  const selected = withProgress[0];
  if (!selected) {
    return null;
  }

  return {
    title: selected.title,
    progressLabel: `${selected.completedLessons}/${selected.totalLessons} lessons completed`,
    progressPercent: selected.progressPercent,
    href: selected.href,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Xybersec Academy Cybersecurity Learning Platform",
    description:
      "Xybersec Academy by DevFraol teaches cybersecurity through structured Xybersec roadmaps, hands-on labs, and guided tracks for red team, blue team, and web pentesting.",
    path: "/",
    keywords: [
      "xybersec academy",
      "xybersec",
      "cybersecurity platform",
      "red team roadmap",
      "blue team roadmap",
      "web pentesting",
    ],
  });
}

export default async function Home() {
  const { userId } = await auth();

  let courses: FEATURED_COURSES_QUERYResult = [];
  let allCourses: ALL_COURSES_QUERYResult = [];
  let dashboardCourses: DASHBOARD_COURSES_QUERYResult = [];

  try {
    const featuredCoursesPromise = sanityFetch({
      query: FEATURED_COURSES_QUERY,
    }) as Promise<{ data: FEATURED_COURSES_QUERYResult }>;

    const allCoursesPromise = sanityFetch({
      query: ALL_COURSES_QUERY,
    }) as Promise<{ data: ALL_COURSES_QUERYResult }>;

    const dashboardCoursesPromise = userId
      ? (sanityFetch({
          query: DASHBOARD_COURSES_QUERY,
          params: { userId },
        }) as Promise<{ data: DASHBOARD_COURSES_QUERYResult }>)
      : Promise.resolve({ data: [] as DASHBOARD_COURSES_QUERYResult });

    const [featuredResult, allCoursesResult, dashboardResult] =
      await Promise.all([
        featuredCoursesPromise,
        allCoursesPromise,
        dashboardCoursesPromise,
      ]);

    courses = featuredResult.data ?? [];
    allCourses = allCoursesResult.data ?? [];
    dashboardCourses = dashboardResult.data ?? [];
  } catch (error) {
    console.error("Failed to load homepage Sanity data", error);
  }

  const continueCourse = userId
    ? getContinueCourse(dashboardCourses, userId)
    : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Xybersec?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Xybersec is a cybersecurity learning platform for mastering offensive and defensive skills through structured roadmaps and practical labs.",
        },
      },
      {
        "@type": "Question",
        name: "Does Xybersec offer online cybersecurity training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The platform offers online tech and cybersecurity courses tailored for learners in Ethiopia, including hands-on content and guided learning paths.",
        },
      },
    ],
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
    ],
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <main aria-label="Xybersec homepage">
        <Hero courses={allCourses} />
        <RoadmapSection courses={allCourses} />
        <PopularCourses courses={courses} />
        <ProgramShowcaseList
          courses={allCourses.length ? allCourses : courses}
        />
        <PlatformPreview />
        <Features />
        <TrainingPaths />
        <HowItWorks />
        <ContinueLearning continueCourse={continueCourse} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
