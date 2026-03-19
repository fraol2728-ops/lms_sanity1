import { Award, BookCheck, Flame, type LucideIcon } from "lucide-react";

export const achievementsStorageKey = "achievements";
export const achievementEventName = "achievements-updated";

export interface AchievementDefinition {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

export interface AchievementRecord {
  id: string;
  unlockedAt: string;
}

export const achievementDefinitions: AchievementDefinition[] = [
  {
    id: "first-lesson-completed",
    title: "First Lesson Completed",
    icon: BookCheck,
    description: "Complete your first lesson and begin your operator track.",
  },
  {
    id: "complete-5-lessons",
    title: "Complete 5 Lessons",
    icon: Flame,
    description:
      "Finish five lessons to prove your consistency under pressure.",
  },
  {
    id: "complete-a-course",
    title: "Complete a Course",
    icon: Award,
    description: "Clear every lesson in a course to secure the mission badge.",
  },
];
