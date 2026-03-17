"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCompletedLessonIds,
  progressEventName,
  saveCompletedLessonIds,
} from "@/components/lesson/progress-storage";
import { Button } from "@/components/ui/button";

interface CompleteButtonProps {
  courseId: string;
  lessonId: string;
}

export function CompleteButton({ courseId, lessonId }: CompleteButtonProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const syncState = () => {
      setIsCompleted(getCompletedLessonIds(courseId).includes(lessonId));
    };

    const handleProgressUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ courseId: string }>;
      if (customEvent.detail?.courseId === courseId) {
        syncState();
      }
    };

    syncState();
    window.addEventListener("storage", syncState);
    window.addEventListener(progressEventName, handleProgressUpdate);

    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener(progressEventName, handleProgressUpdate);
    };
  }, [courseId, lessonId]);

  const markAsComplete = () => {
    if (isCompleted) {
      return;
    }

    const completedLessonIds = getCompletedLessonIds(courseId);
    saveCompletedLessonIds(courseId, [...completedLessonIds, lessonId]);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
      <Button
        onClick={markAsComplete}
        disabled={isCompleted}
        className={
          isCompleted
            ? "rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
            : "rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.35)] hover:bg-cyan-500/20"
        }
      >
        {isCompleted ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Completed ✔
          </>
        ) : (
          <>
            <Circle className="mr-2 h-4 w-4" /> Mark Lesson as Complete
          </>
        )}
      </Button>
    </motion.div>
  );
}
