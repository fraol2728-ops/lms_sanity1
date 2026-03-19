import type { TypedObject } from "@portabletext/types";

export interface AcademyCourseCardData {
  title: string;
  slug: string;
  description?: string | null;
  thumbnail?: {
    asset?: {
      url?: string | null;
    } | null;
  } | null;
  duration?: string | null;
  level?: string | null;
  location?: string | null;
}

export interface AcademyLessonNavItem {
  title: string;
  slug: string;
}

export interface AcademyCourseDetailData {
  title: string;
  slug: string;
  description?: string | null;
  duration?: string | null;
  level?: string | null;
  location?: string | null;
  lessons: AcademyLessonNavItem[];
}

export interface AcademyResource {
  label: string;
  href?: string | null;
}

export interface AcademyLessonDetailData {
  title: string;
  slug: string;
  content?: TypedObject[] | null;
  resources: AcademyResource[];
  tasks: string[];
  course: AcademyCourseDetailData;
}
