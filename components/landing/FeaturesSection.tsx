import {
  BookCopy,
  ChartNoAxesColumn,
  GraduationCap,
  Shield,
} from "lucide-react";

const features = [
  {
    title: "Hands-on Courses",
    description:
      "Build practical security intuition with modules modeled after real attack scenarios.",
    icon: Shield,
  },
  {
    title: "Structured Learning Paths",
    description:
      "Move from fundamentals to advanced exploitation with clear path progression.",
    icon: GraduationCap,
  },
  {
    title: "Track Your Progress",
    description:
      "Follow completed lessons, milestones, and momentum over every training cycle.",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Expert-Level Content",
    description:
      "Study tactics used by red teams, pentesters, and top-tier bug bounty hunters.",
    icon: BookCopy,
  },
];

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.26em] text-cyan-300/80">
          Platform Features
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Purpose-built for cybersecurity mastery
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-[#0d1531] to-[#090f23] p-6 shadow-[0_8px_30px_rgba(2,6,23,0.6)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
          >
            <feature.icon className="h-6 w-6 text-cyan-300" />
            <h3 className="mt-4 text-lg font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
