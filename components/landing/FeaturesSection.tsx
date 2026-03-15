import { Binary, Bot, FlaskConical, Route } from "lucide-react";

const features = [
  {
    title: "Structured Learning",
    description:
      "Progressive modules that build fundamentals before advanced attack chains.",
    icon: Route,
  },
  {
    title: "Real-World Techniques",
    description:
      "Learn workflows used by red teams, pentesters, and bug bounty experts.",
    icon: Binary,
  },
  {
    title: "AI Cyber Tutor",
    description:
      "Get instant explanations, hints, and challenge walk-throughs as you learn.",
    icon: Bot,
  },
  {
    title: "Practical Lessons",
    description:
      "Hands-on exercises designed for retention and immediate application.",
    icon: FlaskConical,
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">
        Why Next Cyber Camp
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-zinc-700 bg-[#111827]/80 p-6 transition-colors hover:border-emerald-400/50"
          >
            <feature.icon className="h-6 w-6 text-emerald-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
