import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Link2,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { LessonContent } from "@/components/lessons/LessonContent";
import { Badge } from "@/components/ui/badge";
import type { AcademyLessonDetailData } from "./types";

interface AcademyLessonContentProps {
  lesson: AcademyLessonDetailData;
  nextLesson?: {
    title: string;
    slug: string;
  } | null;
}

export function AcademyLessonContent({
  lesson,
  nextLesson,
}: AcademyLessonContentProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-cyan-400/15 bg-[#07111f]/85 p-6 shadow-[0_20px_90px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
            {lesson.course.title}
          </Badge>
          <Badge
            variant="outline"
            className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100"
          >
            Academy lesson
          </Badge>
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Physical lesson experience
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {lesson.title}
          </h1>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-[#0a1628] p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3 text-cyan-100">
          <FileText className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Lesson content</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <LessonContent content={lesson.content} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <InfoPanel icon={Link2} title="Resources">
          {lesson.resources.length ? (
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {lesson.resources.map((resource) => (
                <li
                  key={`${resource.label}-${resource.href ?? "local"}`}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  {resource.href ? (
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-100 transition hover:text-cyan-200"
                    >
                      <Download className="h-4 w-4" />
                      <span>{resource.label}</span>
                    </a>
                  ) : (
                    resource.label
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No lesson resources have been published yet." />
          )}
        </InfoPanel>

        <InfoPanel icon={CheckCircle2} title="Tasks">
          {lesson.tasks.length ? (
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {lesson.tasks.map((task) => (
                <li
                  key={task}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  {task}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No tasks have been assigned for this lesson yet." />
          )}
        </InfoPanel>
      </div>

      {nextLesson ? (
        <section className="rounded-[1.75rem] border border-cyan-400/15 bg-cyan-400/[0.05] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
            Continue learning
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Next lesson</h2>
              <p className="mt-1 text-slate-300">{nextLesson.title}</p>
            </div>
            <Link
              href={`/academy/${lesson.course.slug}/${nextLesson.slug}`}
              className="inline-flex items-center gap-2 self-start rounded-full border border-cyan-300/25 bg-cyan-300 px-5 py-3 font-medium text-[#04111d] transition hover:bg-cyan-200"
            >
              Open next lesson <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Link2;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[#0a1628] p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-100">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="text-sm leading-7 text-slate-400">{message}</p>;
}
