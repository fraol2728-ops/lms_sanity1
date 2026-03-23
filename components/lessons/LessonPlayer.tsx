"use client";

import { BookText } from "lucide-react";
import { AchievementTracker } from "@/components/achievements/AchievementTracker";
import { CompleteButton } from "@/components/lesson/CompleteButton";
import { LessonProgress } from "@/components/lesson/LessonProgress";
import { LessonResources } from "@/components/lesson/LessonResources";
import { NextLessonButton } from "@/components/lesson/NextLessonButton";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";
import { LessonContent } from "./LessonContent";
import { MuxVideoPlayer } from "./MuxVideoPlayer";

interface LessonPlayerProps {
  lesson: NonNullable<LESSON_BY_ID_QUERYResult>;
  courseId: string;
  totalLessons: number;
  nextLesson: { slug: string; title: string } | null;
}

export function LessonPlayer({
  lesson,
  courseId,
  totalLessons,
  nextLesson,
}: LessonPlayerProps) {
  return (
    <>
      <AchievementTracker courseId={courseId} totalLessons={totalLessons} />
      <div className="space-y-6 pb-8">
        <LessonProgress courseId={courseId} totalLessons={totalLessons} />

        <div className="overflow-hidden rounded-[1.75rem] border border-cyan-400/20 bg-[#07101d] p-3">
          <MuxVideoPlayer
            playbackId={lesson.video?.asset?.playbackId}
            title={lesson.title ?? undefined}
          />
        </div>

        <section className="rounded-[1.75rem] border border-white/10 bg-[#121a2b] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                Current lesson
              </p>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {lesson.title ?? "Untitled Lesson"}
              </h1>
              {lesson.description && (
                <p className="mt-4 leading-relaxed text-zinc-300">
                  {lesson.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {lesson.content && (
          <section className="rounded-[1.75rem] border border-white/10 bg-[#101827] p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                <BookText className="h-4 w-4" />
              </span>
              <div>
                <h2 className="font-semibold text-white">Lesson Notes</h2>
                <p className="text-sm text-zinc-400">
                  Review the key concepts and walkthrough details.
                </p>
              </div>
            </div>
            <LessonContent content={lesson.content} />
          </section>
        )}

        <LessonResources lesson={lesson} />

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
          <CompleteButton courseId={courseId} lessonId={lesson._id} />
          <NextLessonButton nextLesson={nextLesson} />
        </div>
      </div>
    </>
  );
}
