import { Clock3, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AcademySidebar } from "@/components/academy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAcademyCourseBySlug } from "@/lib/academy-data";

interface AcademyCoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AcademyCoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getAcademyCourseBySlug(slug);

  if (!course) {
    return {
      title: "Academy Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.description,
    alternates: {
      canonical: `/academy/${course.slug}`,
    },
  };
}

export default async function AcademyCoursePage({
  params,
}: AcademyCoursePageProps) {
  const { slug } = await params;
  const course = getAcademyCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="min-h-screen overflow-hidden bg-[#040816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-[120px]" />
        <div className="absolute bottom-[-18%] right-[-8%] h-[520px] w-[520px] rounded-full bg-fuchsia-500/12 blur-[140px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="rounded-[2rem] border border-cyan-400/15 bg-[#07111f]/90 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
                  Academy course
                </Badge>
                <Badge
                  variant="outline"
                  className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100"
                >
                  {course.level}
                </Badge>
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {course.description}
              </p>
            </div>

            {firstLesson ? (
              <Button
                asChild
                className="h-11 rounded-full bg-cyan-300 px-6 text-[#04111d] hover:bg-cyan-200"
              >
                <Link href={`/academy/${course.slug}/${firstLesson.slug}`}>
                  Open first lesson
                </Link>
              </Button>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 text-sm text-slate-200 md:grid-cols-3">
            <MetaCard icon={Clock3} label="Duration" value={course.duration} />
            <MetaCard icon={MapPin} label="Location" value={course.location} />
            <MetaCard icon={ShieldCheck} label="Format" value={course.format} />
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <AcademySidebar course={course} />

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                Modules & lessons
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Physical course roadmap
              </h2>
            </div>

            <div className="space-y-5">
              {course.modules.map((module) => (
                <div
                  key={module.slug}
                  className="rounded-[1.75rem] border border-white/10 bg-[#07111f]/85 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.28)]"
                >
                  <div className="flex flex-col gap-3 border-b border-white/8 pb-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">
                        {module.duration}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {module.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                        {module.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson.slug}
                        href={`/academy/${course.slug}/${lesson.slug}`}
                        className="group rounded-3xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05]"
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-white transition-colors group-hover:text-cyan-100">
                              {lesson.title}
                            </h4>
                            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                              {lesson.description}
                            </p>
                          </div>
                          <span className="text-sm text-cyan-200">
                            {lesson.duration}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetaCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/8 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2 text-cyan-200">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-[0.22em]">{label}</span>
      </div>
      <p className="mt-3 text-sm text-slate-100">{value}</p>
    </div>
  );
}
