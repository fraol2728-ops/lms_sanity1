import { ChevronRight } from "lucide-react";
import { docsSections } from "./docs-data";

export function DocsSidebar() {
  return (
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-hidden">
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
            {docsSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-center justify-between rounded-2xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  <div>
                    <p className="font-medium">{section.label}</p>
                    <p className="mt-1 text-xs text-zinc-500 group-hover:text-zinc-400">
                      {section.eyebrow}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 -translate-x-1 text-zinc-600 transition group-hover:translate-x-0 group-hover:text-cyan-200" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
