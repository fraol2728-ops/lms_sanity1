"use client";

import { motion } from "framer-motion";
import { PathsGrid } from "@/components/paths/PathsGrid";

export function PathsPageClient() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden border-b border-cyan-500/10 bg-gradient-to-b from-cyan-500/15 via-slate-950 to-slate-950"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Cybersecurity Learning Paths
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
            Follow structured training paths designed to turn beginners into
            professional penetration testers.
          </p>
        </div>
      </motion.section>

      <PathsGrid />
    </div>
  );
}
