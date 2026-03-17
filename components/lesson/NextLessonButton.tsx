"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface NextLesson {
  slug: string;
  title: string;
}

interface NextLessonButtonProps {
  nextLesson: NextLesson | null;
}

export function NextLessonButton({ nextLesson }: NextLessonButtonProps) {
  const router = useRouter();

  if (!nextLesson) {
    return null;
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
      <Button
        onClick={() => router.push(`/lessons/${nextLesson.slug}`)}
        className="rounded-xl bg-cyan-400 text-[#031019] shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-300"
      >
        Next Lesson
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}
