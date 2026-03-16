"use client";

import { cn } from "@/lib/utils";

export const COURSE_FILTERS = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export type CourseFilter = (typeof COURSE_FILTERS)[number];

interface CourseFiltersProps {
  selected: CourseFilter;
  onSelect: (filter: CourseFilter) => void;
}

export function CourseFilters({ selected, onSelect }: CourseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COURSE_FILTERS.map((filter) => {
        const active = selected === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onSelect(filter)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              active
                ? "border-cyan-300 bg-cyan-500/20 text-cyan-100 shadow-md shadow-cyan-500/25"
                : "border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:border-zinc-500 hover:text-white",
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
