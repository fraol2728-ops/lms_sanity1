import { DocsContent } from "./DocsContent";
import { DocsSearch } from "./DocsSearch";
import { DocsSidebar } from "./DocsSidebar";

export function DocsLayout() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
            Documentation
          </p>
          <p className="text-sm leading-6 text-zinc-400 sm:text-base">
            A modern, developer-centric knowledge surface for onboarding,
            platform guidance, and learner enablement.
          </p>
        </div>

        <DocsSearch />

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start xl:grid-cols-[300px_minmax(0,1fr)]">
          <DocsSidebar />
          <div className="min-w-0">
            <DocsContent />
          </div>
        </div>
      </div>
    </main>
  );
}
