"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CourseSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CourseSearch({ value, onChange }: CourseSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search courses..."
        className="h-11 rounded-xl border-zinc-800 bg-zinc-900/70 pl-10 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-violet-500/60"
        aria-label="Search courses"
      />
    </div>
  );
}
