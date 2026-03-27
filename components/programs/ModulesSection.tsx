"use client";

import { motion } from "framer-motion";
import { ModuleCard } from "./ModuleCard";

type ModuleData = {
  id: string;
  title: string;
  description: string | null;
  lessons: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
};

interface ModulesSectionProps {
  modules: ModuleData[];
}

export function ModulesSection({ modules }: ModulesSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
          Learning Journey
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Modules & Lessons
        </h2>
      </div>

      <div className="space-y-4">
        {modules.length ? (
          modules.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-slate-300">
            Modules are being added to this program.
          </div>
        )}
      </div>
    </motion.section>
  );
}
