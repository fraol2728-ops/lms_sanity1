"use client";

import { motion } from "framer-motion";
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
      <div className="space-y-6">
        <LessonProgress courseId={courseId} totalLessons={totalLessons} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-cyan-500/30 bg-[#07101d] p-3 shadow-[0_8px_40px_rgba(34,211,238,0.12)]"
        >
          <MuxVideoPlayer
            playbackId={lesson.video?.asset?.playbackId}
            title={lesson.title ?? undefined}
          />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl shadow-black/20"
        >
          <h1 className="text-3xl font-bold text-white">
            {lesson.title ?? "Untitled Lesson"}
          </h1>
          {lesson.description && (
            <p className="mt-3 text-zinc-300 leading-relaxed">
              {lesson.description}
            </p>
          )}
        </motion.section>

        {lesson.content && (
          <motion.section
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <BookText className="h-4 w-4 text-cyan-400" />
              <h2 className="font-semibold text-white">Lesson Notes</h2>
            </div>
            <LessonContent content={lesson.content} />
          </motion.section>
        )}

        <LessonResources lesson={lesson} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end"
        >
          <CompleteButton courseId={courseId} lessonId={lesson._id} />
          <NextLessonButton nextLesson={nextLesson} />
        </motion.div>
      </div>
    </>
  );
}
