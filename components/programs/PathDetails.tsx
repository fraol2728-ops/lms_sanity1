"use client";

import { motion } from "framer-motion";
import type { CareerPath } from "./types";

interface PathDetailsProps {
  path: CareerPath;
}

export default function PathDetails({ path }: PathDetailsProps) {
  return (
    <motion.section
      key={path.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-[#11111c] p-5 shadow-xl shadow-black/40 sm:p-7"
    >
      <div className="mb-5 border-b border-white/10 pb-4">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
          Active Path
        </p>
        <h3 className="mt-2 font-mono text-2xl font-semibold text-white">
          {path.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-300">{path.phases.length} phases</p>
      </div>

      <ul className="space-y-3">
        {path.phases.map((phase, index) => (
          <li
            key={phase.id}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <p className="text-xs uppercase tracking-wide text-zinc-400">
              Phase {index + 1}
            </p>
            <p className="mt-1 font-medium text-white">{phase.title}</p>
            {phase.description ? (
              <p className="mt-1.5 text-sm text-zinc-300">{phase.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
