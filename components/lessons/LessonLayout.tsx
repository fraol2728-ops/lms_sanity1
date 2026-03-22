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
    <div className="relative flex flex-col gap-6 lg:block lg:min-h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:fixed lg:top-24 lg:left-1/2 lg:z-20 lg:w-80 lg:-translate-x-[calc(50%-10rem)]"
      >
        {sidebar}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:ml-[344px]"
      >
        {content}
      </motion.div>
    </div>
  );
}
