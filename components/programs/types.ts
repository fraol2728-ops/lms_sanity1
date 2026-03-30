export interface ProgramCourse {
  id: string;
  slug: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  lessonCount: number;
  durationLabel: string;
  description?: string;
}

export interface PathPhase {
  id: string;
  title: string;
  description?: string;
  lessonsCount: number;
}

export interface CareerPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  thumbnailUrl?: string;
  lessonCount: number;
  phases: PathPhase[];
}
