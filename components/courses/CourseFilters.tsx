"use client";

import { cn } from "@/lib/utils";

export const COURSE_FILTERS = [
  "All",
  "Web Security",
  "Linux",
  "Network Security",
  "Bug Bounty",
  "Beginner",
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
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active
                ? "border-violet-400 bg-violet-500/20 text-violet-200 shadow-md shadow-violet-500/20"
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
