"use client";

import { motion } from "framer-motion";
import { BookOpenText, Info, TerminalSquare } from "lucide-react";
import { docsSections } from "./docs-data";

export function DocsContent() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-cyan-200 uppercase">
              <BookOpenText className="h-3.5 w-3.5" />
              Developer docs
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Next XyberSec documentation
            </h1>
            <p className="max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">
              Build learner confidence with a polished, documentation-first
              experience that explains onboarding, platform flows, and product
              behavior in a format inspired by the best developer platforms.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:max-w-sm lg:grid-cols-1 xl:grid-cols-3">
            {[
              ["Sections", "6"],
              ["Theme", "Dark UI"],
              ["Mode", "UI Only"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {label}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {docsSections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
            className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 shadow-[0_20px_80px_-60px_rgba(34,211,238,0.65)] backdrop-blur sm:p-8"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                  {section.eyebrow}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {section.title}
                </h2>
              </div>

              <p className="max-w-3xl text-base leading-7 text-zinc-300">
                {section.description}
              </p>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      What to emphasize
                    </h3>
                    <ul className="mt-3 space-y-3 text-sm leading-6 text-zinc-300">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-amber-300/15 bg-amber-300/8 p-4">
                    <div className="flex items-start gap-3">
                      <Info className="mt-0.5 h-4 w-4 text-amber-200" />
                      <div>
                        <p className="text-sm font-medium text-amber-100">
                          Note
                        </p>
                        <p className="mt-1 text-sm leading-6 text-amber-50/80">
                          {section.note}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    <TerminalSquare className="h-4 w-4 text-cyan-300" />
                    Example snippet
                  </h3>
                  <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#020817] p-4 text-sm leading-6 text-cyan-100">
                    <code>{section.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
