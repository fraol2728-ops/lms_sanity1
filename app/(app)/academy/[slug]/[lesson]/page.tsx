import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademyLessonContent, AcademySidebar } from "@/components/academy";
import type {
  AcademyCourseDetailData,
  AcademyLessonDetailData,
  AcademyResource,
} from "@/components/academy/types";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";

const ACADEMY_LESSON_QUERY = `*[_type == "academyLesson" && slug.current == $lesson][0]{
  title,
  "slug": slug.current,
  content,
  resources,
  tasks,
  "course": course->{
    title,
    "slug": slug.current,
    description,
    duration,
    level,
    location,
    "lessons": *[_type == "academyLesson" && references(^._id)] | order(title asc) {
      title,
      "slug": slug.current
    }
  }
}`;

interface AcademyLessonPageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

function normalizeResources(resources: unknown): AcademyResource[] {
  if (!Array.isArray(resources)) {
    return [];
  }

  return resources.flatMap((resource) => {
    if (typeof resource === "string") {
      return [{ label: resource }];
    }

    if (!resource || typeof resource !== "object") {
      return [];
    }

    const value = resource as {
      title?: string;
      label?: string;
      name?: string;
      url?: string;
      href?: string;
      file?: { asset?: { url?: string } };
    };

    return [
      {
        label:
          value.title ??
          value.label ??
          value.name ??
          value.url ??
          "Download resource",
        href: value.url ?? value.href ?? value.file?.asset?.url ?? null,
      },
    ];
  });
}

function normalizeTasks(tasks: unknown): string[] {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.flatMap((task) => {
    if (typeof task === "string") {
      return [task];
    }

    if (!task || typeof task !== "object") {
      return [];
    }

    const value = task as {
      title?: string;
      task?: string;
      label?: string;
      text?: string;
    };
    const label = value.title ?? value.task ?? value.label ?? value.text;

    return label ? [label] : [];
  });
}

async function getAcademyLesson(lesson: string) {
  const { data } = await sanityFetch({
    query: ACADEMY_LESSON_QUERY,
    params: { lesson },
  });

  if (!data?.course) {
    return null;
  }

  return {
    ...(data as Omit<AcademyLessonDetailData, "resources" | "tasks"> & {
      course: AcademyCourseDetailData;
      resources: unknown;
      tasks: unknown;
    }),
    resources: normalizeResources(data.resources),
    tasks: normalizeTasks(data.tasks),
  } satisfies AcademyLessonDetailData;
}

export async function generateMetadata({
  params,
}: AcademyLessonPageProps): Promise<Metadata> {
  const { slug, lesson } = await params;
  const result = await getAcademyLesson(lesson);

  if (!result || result.course.slug !== slug) {
    return {
      title: "Academy Lesson Not Found",
    };
  }

  return {
    title: result.title,
    alternates: {
      canonical: `/academy/${slug}/${lesson}`,
    },
  };
}

export default async function AcademyLessonPage({
  params,
}: AcademyLessonPageProps) {
  const { slug, lesson } = await params;
  const result = await getAcademyLesson(lesson);

  if (!result || result.course.slug !== slug) {
    notFound();
  }

  const lessonIndex = result.course.lessons.findIndex(
    (courseLesson) => courseLesson.slug === result.slug,
  );
  const nextLesson =
    lessonIndex >= 0 ? (result.course.lessons[lessonIndex + 1] ?? null) : null;

  return (
    <div className="min-h-screen overflow-hidden bg-[#040816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-[120px]" />
        <div className="absolute bottom-[-18%] right-[-8%] h-[520px] w-[520px] rounded-full bg-fuchsia-500/12 blur-[140px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <Button
            asChild
            variant="ghost"
            className="rounded-full border border-white/10 bg-white/[0.03] text-slate-200 hover:bg-cyan-400/10 hover:text-cyan-100"
          >
            <Link href={`/academy/${result.course.slug}`}>Back to course</Link>
          </Button>
        </div>

        <section className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <AcademySidebar
            course={result.course}
            activeLessonSlug={result.slug}
          />
          <AcademyLessonContent lesson={result} nextLesson={nextLesson} />
        </section>
      </main>
    </div>
  );
}
