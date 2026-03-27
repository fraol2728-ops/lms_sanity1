import type { ALL_COURSES_QUERYResult } from "@/sanity.types";
import { RoadmapRow } from "./roadmap-row";

type CategoryValue =
  | string
  | {
      _id?: string | null;
      title?: string | null;
      slug?: { current?: string | null } | null;
    }
  | null
  | undefined;

type RoadmapCourse = ALL_COURSES_QUERYResult[number] & {
  category?: CategoryValue;
};

interface RoadmapSectionProps {
  courses: ALL_COURSES_QUERYResult;
}

const roadmapConfig = [
  { key: "red-team", title: "Red Team" },
  { key: "blue-team", title: "Blue Team" },
  { key: "web-security", title: "Web Security" },
  { key: "reverse-engineering", title: "Reverse Engineering" },
] as const;

function normalizeCategory(value: CategoryValue): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value.toLowerCase();
  }

  if (value.slug?.current) {
    return value.slug.current.toLowerCase();
  }

  if (value.title) {
    return value.title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  return null;
}

export function RoadmapSection({ courses }: RoadmapSectionProps) {
  const typedCourses = courses as RoadmapCourse[];

  const rows = roadmapConfig
    .map((row) => ({
      ...row,
      courses: typedCourses.filter(
        (course) => normalizeCategory(course.category) === row.key,
      ),
    }))
    .filter((row) => row.courses.length > 0);

  if (!rows.length) {
    return null;
  }

  return (
    <section className="space-y-16 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold md:text-4xl">Choose Your Path</h2>
          <p className="mt-2 text-muted-foreground">
            Structured cybersecurity learning paths to guide your journey.
          </p>
        </div>

        <div className="space-y-12">
          {rows.map((row) => (
            <RoadmapRow key={row.key} title={row.title} courses={row.courses} />
          ))}
        </div>
      </div>
    </section>
  );
}
