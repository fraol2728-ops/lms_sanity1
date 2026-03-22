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
    <div className="relative flex flex-col gap-6 lg:grid lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start lg:gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:sticky lg:top-24 lg:self-start"
      >
        {sidebar}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-0"
      >
        {content}
      </motion.div>
    </div>
  );
}
