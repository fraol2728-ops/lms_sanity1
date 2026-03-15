"use client";

import { MonitorPlay, Shield, TerminalSquare } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./animations";

const previews = [
  {
    title: "Dashboard",
    icon: MonitorPlay,
    className: "lg:col-span-2 lg:row-span-2",
    accent: "from-blue-500/30 to-cyan-500/10",
  },
  {
    title: "Course page",
    icon: Shield,
    className: "",
    accent: "from-cyan-500/25 to-blue-500/10",
  },
  {
    title: "Lesson player",
    icon: TerminalSquare,
    className: "",
    accent: "from-indigo-500/25 to-cyan-500/10",
  },
];

export function PlatformPreview() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          Platform Preview
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Built like a modern cybersecurity SaaS workspace
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {previews.map((preview, index) => (
          <motion.div
            key={preview.title}
            className={`relative min-h-52 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#0a1227]/70 p-5 shadow-[0_0_40px_rgba(34,211,238,0.08)] ${preview.className}`}
            initial={{ opacity: 0, x: index === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.1 }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${preview.accent} opacity-70`}
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <preview.icon className="h-8 w-8 text-cyan-200" />
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">
                  Preview
                </p>
                <h3 className="text-xl font-semibold text-white">{preview.title}</h3>
                <div className="space-y-2 rounded-xl border border-cyan-300/20 bg-[#020617]/60 p-3">
                  <div className="h-2 w-2/3 rounded bg-cyan-200/60" />
                  <div className="h-2 w-1/2 rounded bg-cyan-200/40" />
                  <div className="h-20 rounded-lg bg-gradient-to-br from-cyan-400/25 to-blue-600/25" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
