import { Headset, Lightbulb, MessageSquare, SunMedium } from "lucide-react";

const steps = [
  { title: "Consultation", icon: MessageSquare },
  { title: "Design", icon: Lightbulb },
  { title: "Installation", icon: SunMedium },
  { title: "Support", icon: Headset },
];

export function ProcessSection() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
          <p className="mt-3 text-slate-300">
            A clear, guided process from first call to long-term energy savings.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                {index < steps.length - 1 ? (
                  <span
                    className="absolute right-[-14px] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-emerald-400/60 md:block"
                    aria-hidden
                  />
                ) : null}
                <div className="inline-flex rounded-xl bg-emerald-500/20 p-3">
                  <Icon className="h-6 w-6 text-emerald-300" aria-hidden />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-emerald-300">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
