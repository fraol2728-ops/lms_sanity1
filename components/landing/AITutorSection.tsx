import { Sparkles } from "lucide-react";

export function AITutorSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="grid gap-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#111827] to-[#0e1627] p-8 md:grid-cols-2 md:items-center md:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
            AI Tutor
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Your 24/7 Offensive Security Copilot
          </h2>
          <p className="mt-4 text-zinc-300">
            Stuck on payload crafting or privilege escalation? Ask the AI tutor
            for step-by-step guidance while you stay in flow.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-[#0b1221] p-5">
          <div className="space-y-3">
            <div className="ml-auto w-[88%] rounded-xl bg-emerald-500/15 p-3 text-sm text-emerald-100">
              I found an IDOR vulnerability. How do I validate impact safely?
            </div>
            <div className="w-[92%] rounded-xl border border-zinc-700 bg-zinc-900/80 p-3 text-sm text-zinc-200">
              Start by testing horizontal and vertical access changes using a
              controlled account pair. Document responses and ensure no data
              corruption during verification.
            </div>
            <div className="ml-auto flex w-fit items-center gap-2 rounded-xl bg-emerald-500/15 px-3 py-2 text-xs text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              AI hints enabled
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
