"use client";

import { motion } from "framer-motion";

export function LessonLayout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 lg:flex-row lg:gap-6 xl:gap-8">
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="min-h-0 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:w-80 lg:shrink-0"
      >
        {sidebar}
      </motion.aside>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        className="glass-scroll min-h-0 flex-1 overflow-y-auto rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-4 lg:h-[calc(100vh-8rem)] lg:p-6"
      >
        {content}
      </motion.section>
    </div>
  );
}
