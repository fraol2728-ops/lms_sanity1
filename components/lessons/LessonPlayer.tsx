"use client";

import { motion } from "framer-motion";
import { BookText } from "lucide-react";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";
import { LessonCompleteButton } from "./LessonCompleteButton";
import { LessonContent } from "./LessonContent";
import { MuxVideoPlayer } from "./MuxVideoPlayer";

interface LessonPlayerProps {
  lesson: NonNullable<LESSON_BY_ID_QUERYResult>;
  userId: string | null;
  isCompleted: boolean;
}

export function LessonPlayer({
  lesson,
  userId,
  isCompleted,
}: LessonPlayerProps) {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
      >
        <h1 className="text-3xl font-bold text-white">
          {lesson.title ?? "Untitled Lesson"}
        </h1>
        {lesson.description && (
          <p className="mt-2 text-zinc-400">{lesson.description}</p>
        )}
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-2xl border border-cyan-500/30 bg-[#07101d] p-3 shadow-[0_8px_40px_rgba(34,211,238,0.12)]"
      >
        <MuxVideoPlayer
          playbackId={lesson.video?.asset?.playbackId}
          title={lesson.title ?? undefined}
        />
      </motion.div>

      {lesson.content && (
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <div className="mb-5 flex items-center gap-2">
            <BookText className="h-4 w-4 text-cyan-400" />
            <h2 className="font-semibold text-white">Lesson Notes</h2>
          </div>
          <LessonContent content={lesson.content} />
        </motion.section>
      )}

      {userId && (
        <div className="flex justify-end">
          <LessonCompleteButton
            lessonId={lesson._id}
            lessonSlug={lesson.slug?.current ?? ""}
            isCompleted={isCompleted}
          />
        </div>
      )}
    </div>
  );
}
