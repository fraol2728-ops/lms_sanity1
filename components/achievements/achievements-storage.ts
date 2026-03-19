import {
  type AchievementRecord,
  achievementDefinitions,
  achievementEventName,
  achievementsStorageKey,
} from "@/components/achievements/achievement-data";

export interface AchievementComputationInput {
  courseProgress: Array<{
    courseId: string;
    totalLessons: number;
    completedLessonIds: string[];
  }>;
}

function isAchievementRecord(value: unknown): value is AchievementRecord {
  return (
    !!value &&
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "string" &&
    "unlockedAt" in value &&
    typeof value.unlockedAt === "string"
  );
}

export function getStoredAchievements(): AchievementRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(achievementsStorageKey);
  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isAchievementRecord);
  } catch {
    return [];
  }
}

export function saveAchievements(records: AchievementRecord[]) {
  if (typeof window === "undefined") {
    return;
  }

  const dedupedRecords = Array.from(
    new Map(records.map((record) => [record.id, record])).values(),
  );

  window.localStorage.setItem(
    achievementsStorageKey,
    JSON.stringify(dedupedRecords),
  );
  window.dispatchEvent(
    new CustomEvent(achievementEventName, {
      detail: {
        achievements: dedupedRecords,
      },
    }),
  );
}

export function getAchievementIdsFromProgress({
  courseProgress,
}: AchievementComputationInput) {
  const totalCompletedLessons = courseProgress.reduce(
    (sum, course) => sum + course.completedLessonIds.length,
    0,
  );

  const completedCourse = courseProgress.some(
    (course) =>
      course.totalLessons > 0 &&
      course.completedLessonIds.length >= course.totalLessons,
  );

  const unlockedIds: string[] = [];

  if (totalCompletedLessons >= 1) {
    unlockedIds.push("first-lesson-completed");
  }

  if (totalCompletedLessons >= 5) {
    unlockedIds.push("complete-5-lessons");
  }

  if (completedCourse) {
    unlockedIds.push("complete-a-course");
  }

  return achievementDefinitions
    .filter((achievement) => unlockedIds.includes(achievement.id))
    .map((achievement) => achievement.id);
}

export function syncAchievementsFromProgress(
  input: AchievementComputationInput,
): AchievementRecord[] {
  const existingAchievements = getStoredAchievements();
  const existingIds = new Set(existingAchievements.map((record) => record.id));
  const computedIds = getAchievementIdsFromProgress(input);
  const newRecords = computedIds
    .filter((id) => !existingIds.has(id))
    .map((id) => ({ id, unlockedAt: new Date().toISOString() }));

  if (newRecords.length === 0) {
    return [];
  }

  saveAchievements([...existingAchievements, ...newRecords]);
  return newRecords;
}
