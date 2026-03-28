import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModulesSection } from "@/components/programs/ModulesSection";
import { ProgramHero } from "@/components/programs/ProgramHero";
import { Sidebar } from "@/components/programs/Sidebar";
import { absoluteUrl } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { COURSE_WITH_MODULES_QUERY } from "@/sanity/lib/queries";


interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

type LessonRaw = {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  completedBy?: string[] | null;
};

type ModuleRaw = {
  _id: string;
  title?: string | null;
  description?: string | null;
  lessons?: LessonRaw[] | null;
};

type ProgramCourse = {
  _id: string;
  title?: string | null;
  description?: string | null;
  tier?: string | null;
  modules?: ModuleRaw[] | null;
  moduleCount?: number | null;
  lessonCount?: number | null;
  thumbnail?: { asset?: { url?: string | null } | null } | null;
};


async function getCourse(slug: string, userId?: string | null) {
  const { data } = await sanityFetch({
    query: COURSE_WITH_MODULES_QUERY,
    params: { slug, userId: userId ?? null },
  });

  return data as ProgramCourse | null;
}


function tierToDifficulty(tier?: string | null) {
  if (tier === "ultra") return "Advanced";
  if (tier === "pro") return "Intermediate";
  return "Beginner";
}

export async function generateMetadata({
  params,
}: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return {
      title: "Program Not Found",
      description: "The requested program could not be found.",
    };
  }

  return {
    title: `${course.title ?? "Program"} | Program`,
    description: course.description ?? "Cybersecurity learning program.",
    alternates: {
      canonical: `/programs/${slug}`,
    },
    openGraph: {
      title: `${course.title ?? "Program"} | Program`,
      description: course.description ?? "Cybersecurity learning program.",
      url: absoluteUrl(`/programs/${slug}`),
      type: "website",
      images: course.thumbnail?.asset?.url
        ? [
            {
              url: course.thumbnail.asset.url,
              alt: `${course.title} thumbnail`,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  const course = await getCourse(slug, userId);

  if (!course) {
    notFound();
  }

  const modules = (course.modules ?? []).map((module) => ({
    id: module._id,
    title: module.title ?? "Untitled module",
    description: module.description ?? null,
    lessons: (module.lessons ?? []).map((lesson) => ({
      id: lesson._id,
      title: lesson.title ?? "Untitled lesson",
      slug: lesson.slug?.current ?? "",
    })),
  }));

  const lessons = modules.flatMap((module) => module.lessons);
  const completedLessons = userId
    ? (course.modules ?? [])
        .flatMap((module) => module.lessons ?? [])
        .filter((lesson) => lesson.completedBy?.includes(userId)).length
    : 0;

  const moduleCount = course.moduleCount ?? modules.length;
  const lessonCount = course.lessonCount ?? lessons.length;
  const progressPercent = lessonCount
    ? Math.max(10, Math.round((completedLessons / lessonCount) * 100))
    : 30;

  const firstLessonSlug = lessons[0]?.slug;
  const firstIncompleteLessonSlug = (course.modules ?? [])
    .flatMap((module) => module.lessons ?? [])
    .find((lesson) => (userId ? !lesson.completedBy?.includes(userId) : true))
    ?.slug?.current;

  const startHref = firstLessonSlug
    ? `/lessons/${firstLessonSlug}`
    : `/courses/${slug}`;
  const continueHref = firstIncompleteLessonSlug
    ? `/lessons/${firstIncompleteLessonSlug}`
    : startHref;

  const difficulty = tierToDifficulty(course.tier);
  const durationLabel = `~${Math.max(1, lessonCount * 15)} min`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B0F19] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ProgramHero
          title={course.title ?? "Cybersecurity Program"}
          description={course.description ?? null}
          difficulty={difficulty}
          moduleCount={moduleCount}
          durationLabel={durationLabel}
          startHref={startHref}
          continueHref={continueHref}
        />


        <div
          id="layout-grid"
          className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        >
          <div className="lg:col-span-2">
            <ModulesSection modules={modules} />
          </div>

          <div className="lg:col-span-1">
            <Sidebar
              title={course.title ?? "Cybersecurity Program"}
              thumbnailUrl={course.thumbnail?.asset?.url ?? null}
              moduleCount={moduleCount}
              lessonCount={lessonCount}
              durationLabel={durationLabel}
              startHref={startHref}
              continueHref={continueHref}
              progressPercent={progressPercent}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
