"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { docsSections } from "./docs-data";

export function DocsSidebar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    docsSections[0]?.id ?? "",
  );

  const observerSections = useMemo(
    () => docsSections.map((section) => section.id),
    [],
  );

  useEffect(() => {
    const elements = observerSections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [observerSections]);

  const nav = (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_60px_-40px_rgba(34,211,238,0.55)] backdrop-blur">
      <div className="border-b border-white/10 px-2 pb-4">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
          Docs navigation
        </p>
        <h2 className="mt-2 text-lg font-semibold text-white">
          Explore topics
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Browse the core workflows that shape the learner experience inside
          Next Cyber Camp.
        </p>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto pr-1">
        <ul className="space-y-1.5">
          {docsSections.map((section) => {
            const isActive = section.id === activeSection;

            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between rounded-2xl px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-cyan-400/12 text-white ring-1 ring-cyan-300/20"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                >
                  <div>
                    <p className="font-medium">{section.label}</p>
                    <p className="mt-1 text-xs text-zinc-500 group-hover:text-zinc-400">
                      {section.eyebrow}
                    </p>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 transition ${
                      isActive
                        ? "translate-x-0 text-cyan-200"
                        : "-translate-x-1 text-zinc-600 group-hover:translate-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-100"
        >
          <Menu className="h-4 w-4" />
          Browse sections
        </button>
      </div>

      <div className="hidden lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)] lg:overflow-hidden">
        {nav}
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close docs sidebar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[86vw] max-w-sm p-4 lg:hidden"
            >
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0b1220] text-zinc-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="h-[calc(100%-3.25rem)]">{nav}</div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
