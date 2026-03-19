"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { client, writeClient } from "@/sanity/lib/client";

interface UserProgressRecord {
  _id: string;
  completedLessons?: string[];
  progress?: number;
}

interface UserProgressResponse {
  userId: string | null;
  courseId: string;
  completedLessons: string[];
  progress: number;
}

interface SaveLessonProgressResponse extends UserProgressResponse {
  success: boolean;
}

interface LessonMutationMetadata {
  lessonSlug: string | null;
  courseSlug: string | null;
  totalLessons: number;
  lessonCompletedBy: string[];
  courseCompletedBy: string[];
}

function getUserProgressDocumentId(userId: string, courseId: string) {
  return `userProgress.${userId}.${courseId}`;
}

async function resolveAuthenticatedUserId(requestedUserId?: string) {
  const user = await currentUser();
  const authenticatedUserId = user?.id ?? null;

  if (!authenticatedUserId) {
    return null;
  }

  if (requestedUserId && requestedUserId !== authenticatedUserId) {
    throw new Error("Authenticated user does not match requested user ID.");
  }

  return authenticatedUserId;
}

async function getLessonMutationMetadata(
  courseId: string,
  lessonId?: string,
): Promise<LessonMutationMetadata> {
  return client.fetch(
    `{
      "lessonSlug": *[_type == "lesson" && _id == $lessonId][0].slug.current,
      "courseSlug": *[_type == "course" && _id == $courseId][0].slug.current,
      "totalLessons": count(*[_type == "course" && _id == $courseId][0].modules[]->lessons[]),
      "lessonCompletedBy": *[_type == "lesson" && _id == $lessonId][0].completedBy,
      "courseCompletedBy": *[_type == "course" && _id == $courseId][0].completedBy
    }`,
    { courseId, lessonId },
  );
}

export async function getUserProgress(
  userId: string,
  courseId: string,
): Promise<UserProgressResponse> {
  const authenticatedUserId = await resolveAuthenticatedUserId(userId);

  if (!authenticatedUserId) {
    return {
      userId: null,
      courseId,
      completedLessons: [],
      progress: 0,
    };
  }

  const documentId = getUserProgressDocumentId(authenticatedUserId, courseId);
  const userProgress = (await client.fetch(
    `*[_type == "userProgress" && _id == $documentId][0]{
      _id,
      completedLessons,
      progress
    }`,
    { documentId },
  )) as UserProgressRecord | null;

  return {
    userId: authenticatedUserId,
    courseId,
    completedLessons: userProgress?.completedLessons ?? [],
    progress: userProgress?.progress ?? 0,
  };
}

export async function saveLessonProgress(
  userId: string,
  courseId: string,
  lessonId: string,
): Promise<SaveLessonProgressResponse> {
  const authenticatedUserId = await resolveAuthenticatedUserId(userId);

  if (!authenticatedUserId) {
    return {
      success: false,
      userId: null,
      courseId,
      completedLessons: [],
      progress: 0,
    };
  }

  const documentId = getUserProgressDocumentId(authenticatedUserId, courseId);
  const [existingProgress, metadata] = (await Promise.all([
    client.fetch(
      `*[_type == "userProgress" && _id == $documentId][0]{
        _id,
        completedLessons,
        progress
      }`,
      { documentId },
    ),
    getLessonMutationMetadata(courseId, lessonId),
  ])) as [UserProgressRecord | null, LessonMutationMetadata];

  const completedLessons = Array.from(
    new Set([...(existingProgress?.completedLessons ?? []), lessonId]),
  );
  const safeTotalLessons = Math.max(metadata.totalLessons ?? 0, 0);
  const progress =
    safeTotalLessons > 0
      ? Math.round((completedLessons.length / safeTotalLessons) * 100)
      : 0;

  await writeClient.createOrReplace({
    _id: documentId,
    _type: "userProgress",
    userId: authenticatedUserId,
    courseId,
    completedLessons,
    progress,
  });

  if (!metadata.lessonCompletedBy.includes(authenticatedUserId)) {
    await writeClient
      .patch(lessonId)
      .set({
        completedBy: [...metadata.lessonCompletedBy, authenticatedUserId],
      })
      .commit();
  }

  const nextCourseCompletedBy =
    progress === 100
      ? Array.from(
          new Set([...(metadata.courseCompletedBy ?? []), authenticatedUserId]),
        )
      : (metadata.courseCompletedBy ?? []).filter(
          (id) => id !== authenticatedUserId,
        );

  await writeClient
    .patch(courseId)
    .set({
      completedBy: nextCourseCompletedBy,
    })
    .commit();

  if (metadata.lessonSlug) {
    revalidatePath(`/lessons/${metadata.lessonSlug}`);
  }

  if (metadata.courseSlug) {
    revalidatePath(`/courses/${metadata.courseSlug}`);
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/courses");

  return {
    success: true,
    userId: authenticatedUserId,
    courseId,
    completedLessons,
    progress,
  };
}

export async function toggleLessonCompletion(
  lessonId: string,
  lessonSlug: string,
  markComplete: boolean,
): Promise<{ success: boolean; isCompleted: boolean }> {
  const authenticatedUserId = await resolveAuthenticatedUserId();

  if (!authenticatedUserId) {
    return { success: false, isCompleted: false };
  }

  try {
    if (markComplete) {
      const currentCompletedBy = (await client.fetch(
        `*[_type == "lesson" && _id == $lessonId][0].completedBy`,
        { lessonId },
      )) as string[] | null;
      const nextCompletedBy = Array.from(
        new Set([...(currentCompletedBy ?? []), authenticatedUserId]),
      );

      await writeClient
        .patch(lessonId)
        .set({ completedBy: nextCompletedBy })
        .commit();
    } else {
      await writeClient
        .patch(lessonId)
        .unset([`completedBy[@ == "${authenticatedUserId}"]`])
        .commit();
    }

    revalidatePath(`/lessons/${lessonSlug}`);
    revalidatePath("/dashboard");

    return { success: true, isCompleted: markComplete };
  } catch (error) {
    console.error("Failed to toggle lesson completion:", error);
    return { success: false, isCompleted: !markComplete };
  }
}
