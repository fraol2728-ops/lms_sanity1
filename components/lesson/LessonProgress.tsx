"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  getCompletedLessonIds,
  progressEventName,
} from "@/components/lesson/progress-storage";

interface LessonProgressProps {
  courseId: string;
  totalLessons: number;
}

export function LessonProgress({
  courseId,
  totalLessons,
}: LessonProgressProps) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const syncProgress = () => {
      const lessonIds = getCompletedLessonIds(courseId);
      setCompletedCount(Math.min(lessonIds.length, totalLessons));
    };

    const handleProgressUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ courseId: string }>;
      if (customEvent.detail?.courseId === courseId) {
        syncProgress();
      }
    };

    syncProgress();
    window.addEventListener("storage", syncProgress);
    window.addEventListener(progressEventName, handleProgressUpdate);

    return () => {
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener(progressEventName, handleProgressUpdate);
    };
  }, [courseId, totalLessons]);

  const percentage = useMemo(() => {
    if (totalLessons === 0) {
      return 0;
    }

    return Math.round((completedCount / totalLessons) * 100);
  }, [completedCount, totalLessons]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-cyan-500/30 bg-[#061222]/80 p-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
    >
      <div className="mb-2 flex items-center justify-between text-sm text-cyan-100">
        <span className="font-medium">Lesson Progress</span>
        <span>{percentage}% complete</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="h-full rounded-full bg-cyan-400"
        />
      </div>
    </motion.section>
  );
}
