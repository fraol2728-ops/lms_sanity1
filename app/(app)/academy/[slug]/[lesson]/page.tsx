import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademyLessonContent, AcademySidebar } from "@/components/academy";
import { Button } from "@/components/ui/button";
import { getAcademyLesson } from "@/lib/academy-data";

interface AcademyLessonPageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

export async function generateMetadata({
  params,
}: AcademyLessonPageProps): Promise<Metadata> {
  const { slug, lesson } = await params;
  const result = getAcademyLesson(slug, lesson);

  if (!result) {
    return {
      title: "Academy Lesson Not Found",
    };
  }

  return {
    title: result.lesson.title,
    description: result.lesson.description,
    alternates: {
      canonical: `/academy/${slug}/${lesson}`,
    },
  };
}

export default async function AcademyLessonPage({
  params,
}: AcademyLessonPageProps) {
  const { slug, lesson } = await params;
  const result = getAcademyLesson(slug, lesson);

  if (!result) {
    notFound();
  }

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
            activeLessonSlug={result.lesson.slug}
          />
          <AcademyLessonContent
            course={result.course}
            module={result.module}
            lesson={result.lesson}
          />
        </section>
      </main>
    </div>
  );
}
