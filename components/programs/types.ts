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
  objective: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  accent: string;
  categoryKeywords: string[];
  phases: PathPhase[];
}
