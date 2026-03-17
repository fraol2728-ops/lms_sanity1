"use client";

import { GatedFallback } from "@/components/courses/GatedFallback";
import { LessonSidebar } from "@/components/lesson/LessonSidebar";
import { hasTierAccess, useUserTier } from "@/lib/hooks/use-user-tier";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";
import { LessonLayout } from "./LessonLayout";
import { LessonPlayer } from "./LessonPlayer";

interface LessonPageContentProps {
  lesson: NonNullable<LESSON_BY_ID_QUERYResult>;
  userId: string | null;
}

export function LessonPageContent({
  lesson,
  userId: _userId,
}: LessonPageContentProps) {
  const userTier = useUserTier();
  const courses = lesson.courses ?? [];
  const accessibleCourse = courses.find((course) =>
    hasTierAccess(userTier, course.tier),
  );
  const hasAccess = !!accessibleCourse;
  const activeCourse = accessibleCourse ?? courses[0];

  const modules = activeCourse?.modules;
  let nextLesson: { slug: string; title: string } | null = null;
  const allLessons: Array<{ id: string; slug: string; title: string }> = [];

  if (modules) {
    for (const module of modules) {
      for (const nestedLesson of module.lessons ?? []) {
        allLessons.push({
          id: nestedLesson._id,
          slug: nestedLesson.slug?.current ?? "",
          title: nestedLesson.title ?? "Untitled Lesson",
        });
      }
    }

    const currentIndex = allLessons.findIndex((item) => item.id === lesson._id);
    nextLesson =
      currentIndex < allLessons.length - 1
        ? {
            slug: allLessons[currentIndex + 1].slug,
            title: allLessons[currentIndex + 1].title,
          }
        : null;
  }

  if (!hasAccess) {
    return <GatedFallback requiredTier={activeCourse?.tier} />;
  }

  return (
    <LessonLayout
      sidebar={
        activeCourse && (
          <LessonSidebar
            courseSlug={activeCourse.slug?.current ?? ""}
            courseTitle={activeCourse.title}
            modules={activeCourse.modules ?? null}
            currentLessonId={lesson._id}
            courseId={activeCourse?._id ?? "default-course"}
          />
        )
      }
      content={
        <LessonPlayer
          lesson={lesson}
          courseId={activeCourse?._id ?? "default-course"}
          totalLessons={allLessons.length}
          nextLesson={nextLesson}
        />
      }
    />
  );
}
