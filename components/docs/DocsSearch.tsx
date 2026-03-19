import { Search } from "lucide-react";

export function DocsSearch() {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <div className="flex h-12 items-center rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-zinc-400 shadow-[0_12px_40px_-28px_rgba(34,211,238,0.35)]">
        Search documentation...
      </div>
    </div>
  );
}
