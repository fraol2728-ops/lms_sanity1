import { serviceProcessSteps } from "./services-data";

export function ServiceProcess() {
  return (
    <section className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6 sm:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Process</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">How we execute</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {serviceProcessSteps.map((step, index) => (
          <div
            key={step}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1220]/80 p-4"
          >
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200/70">
              Step {index + 1}
            </div>
            <div className="mt-2 text-base font-semibold text-white">{step}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
