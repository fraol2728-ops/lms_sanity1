const steps = [
  {
    title: "Choose a learning path",
    description:
      "Select your role-based journey from web pentesting, red team operations, or bug bounty training.",
  },
  {
    title: "Complete structured lessons",
    description:
      "Progress through sequenced modules designed to sharpen your practical cybersecurity skills.",
  },
  {
    title: "Become a cybersecurity professional",
    description:
      "Apply your training in real scenarios and build confidence for career-ready security work.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.26em] text-cyan-300/80">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Your training workflow in three clear steps
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-2xl border border-cyan-400/20 bg-[#0a1128]/80 p-6"
          >
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
              {index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
