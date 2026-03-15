"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLesson {
  slug: string;
  title: string;
}

interface LessonNavigationProps {
  prevLesson: NavLesson | null;
  nextLesson: NavLesson | null;
}

export function LessonNavigation({
  prevLesson,
  nextLesson,
}: LessonNavigationProps) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-6">
      {prevLesson ? (
        <Link href={`/lessons/${prevLesson.slug}`}>
          <Button
            variant="outline"
            className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous Lesson
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextLesson ? (
        <Link href={`/lessons/${nextLesson.slug}`}>
          <Button className="bg-cyan-500 text-[#061018] hover:bg-cyan-400">
            Next Lesson <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
