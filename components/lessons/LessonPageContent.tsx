"use client";

import { GatedFallback } from "@/components/courses/GatedFallback";
import { hasTierAccess, useUserTier } from "@/lib/hooks/use-user-tier";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";
import { LessonLayout } from "./LessonLayout";
import { LessonNavigation } from "./LessonNavigation";
import { LessonPlayer } from "./LessonPlayer";
import { LessonSidebar } from "./LessonSidebar";

interface LessonPageContentProps {
  lesson: NonNullable<LESSON_BY_ID_QUERYResult>;
  userId: string | null;
}

export function LessonPageContent({ lesson, userId }: LessonPageContentProps) {
  const userTier = useUserTier();
  const courses = lesson.courses ?? [];
  const accessibleCourse = courses.find((course) =>
    hasTierAccess(userTier, course.tier),
  );
  const hasAccess = !!accessibleCourse;
  const activeCourse = accessibleCourse ?? courses[0];

  const isCompleted = userId
    ? (lesson.completedBy?.includes(userId) ?? false)
    : false;

  const modules = activeCourse?.modules;
  let prevLesson: { slug: string; title: string } | null = null;
  let nextLesson: { slug: string; title: string } | null = null;
  const completedLessonIds: string[] = [];

  if (modules) {
    const allLessons: Array<{ id: string; slug: string; title: string }> = [];

    for (const module of modules) {
      for (const nestedLesson of module.lessons ?? []) {
        allLessons.push({
          id: nestedLesson._id,
          slug: nestedLesson.slug?.current ?? "",
          title: nestedLesson.title ?? "Untitled Lesson",
        });

        if (userId && nestedLesson.completedBy?.includes(userId)) {
          completedLessonIds.push(nestedLesson._id);
        }
      }
    }

    const currentIndex = allLessons.findIndex((item) => item.id === lesson._id);
    prevLesson =
      currentIndex > 0
        ? {
            slug: allLessons[currentIndex - 1].slug,
            title: allLessons[currentIndex - 1].title,
          }
        : null;
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
            completedLessonIds={completedLessonIds}
          />
        )
      }
      content={
        <>
          <LessonPlayer
            lesson={lesson}
            userId={userId}
            isCompleted={isCompleted}
          />
          <LessonNavigation prevLesson={prevLesson} nextLesson={nextLesson} />
        </>
      }
    />
  );
}
