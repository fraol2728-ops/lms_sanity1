export const progressEventName = "lesson-progress-updated";

export function getProgressKey(courseId: string) {
  return `course-progress-${courseId}`;
}

export function getCompletedLessonIds(courseId: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue = window.localStorage.getItem(getProgressKey(courseId));
  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (value): value is string => typeof value === "string",
    );
  } catch {
    return [];
  }
}

export function saveCompletedLessonIds(courseId: string, lessonIds: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  const uniqueIds = Array.from(new Set(lessonIds));
  window.localStorage.setItem(
    getProgressKey(courseId),
    JSON.stringify(uniqueIds),
  );
  window.dispatchEvent(
    new CustomEvent(progressEventName, {
      detail: {
        courseId,
      },
    }),
  );
}

export function getAllCourseProgress() {
  if (typeof window === "undefined") {
    return [];
  }

  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith("course-progress-"))
    .map((key) => ({
      courseId: key.replace("course-progress-", ""),
      completedLessonIds: getCompletedLessonIds(
        key.replace("course-progress-", ""),
      ),
    }));
}
