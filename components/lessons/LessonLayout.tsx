"use client";

import { motion } from "framer-motion";

const DESKTOP_SIDEBAR_WIDTH = "20rem";

export function LessonLayout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col gap-6 lg:gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block"
      >
        <div
          aria-hidden="true"
          className="shrink-0"
          style={{ width: DESKTOP_SIDEBAR_WIDTH }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:fixed lg:left-12 lg:top-32 lg:z-20 lg:w-80 xl:left-[max(3rem,calc((100vw-80rem)/2+3rem))]"
      >
        {sidebar}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-0 lg:pl-[calc(20rem+2rem)]"
      >
        {content}
      </motion.div>
    </div>
  );
}
