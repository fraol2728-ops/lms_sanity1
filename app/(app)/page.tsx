import { auth } from "@clerk/nextjs/server";
import {
  CTA,
  ContinueLearning,
  Features,
  Footer,
  Hero,
  HowItWorks,
  PlatformPreview,
  PopularCourses,
  TrainingPaths,
} from "@/components/landing";
import { sanityFetch } from "@/sanity/lib/live";
import { DASHBOARD_COURSES_QUERY, FEATURED_COURSES_QUERY } from "@/sanity/lib/queries";
import type {
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
              return lessonTotal + (lesson.completedBy?.includes(userId) ? 1 : 0);
            }, 0) ?? 0;

          return courseTotal + moduleCompleted;
        }, 0) ?? 0;

      const progressPercent =
        totalLessons > 0 ? Math.min(100, (completedLessons / totalLessons) * 100) : 0;

      return {
        title: course.title ?? "Untitled Course",
        totalLessons,
        completedLessons,
        progressPercent,
        href: course.slug?.current ? `/courses/${course.slug.current}` : "/dashboard",
      };
    })
    .filter((course) => course.totalLessons > 0 && course.completedLessons < course.totalLessons)
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

export default async function Home() {
  const { userId } = await auth();

  const featuredCoursesPromise = sanityFetch({
    query: FEATURED_COURSES_QUERY,
  }) as Promise<{ data: FEATURED_COURSES_QUERYResult }>;

  const dashboardCoursesPromise = userId
    ? (sanityFetch({
        query: DASHBOARD_COURSES_QUERY,
        params: { userId },
      }) as Promise<{ data: DASHBOARD_COURSES_QUERYResult }>)
    : Promise.resolve({ data: [] as DASHBOARD_COURSES_QUERYResult });

  const [{ data: courses }, { data: dashboardCourses }] = await Promise.all([
    featuredCoursesPromise,
    dashboardCoursesPromise,
  ]);

  const continueCourse = userId ? getContinueCourse(dashboardCourses, userId) : null;

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <main>
        <Hero />
        <PlatformPreview />
        <Features />
        <TrainingPaths />
        <PopularCourses courses={courses ?? []} />
        <HowItWorks />
        <ContinueLearning continueCourse={continueCourse} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
