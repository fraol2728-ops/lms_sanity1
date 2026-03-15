"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const badges = [
  "First Course Completed",
  "SQL Injection Master",
  "Linux Explorer",
];

export function Achievements() {
  return (
    <section>
      <h3 className="mb-4 text-xl font-semibold text-white">Achievements</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            className="rounded-xl border border-cyan-500/20 bg-[#07101c] p-4"
          >
            <div className="mb-3 inline-flex rounded-lg bg-cyan-500/15 p-2 text-cyan-300">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium text-zinc-100">{badge}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
