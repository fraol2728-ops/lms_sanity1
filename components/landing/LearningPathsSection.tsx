import { ArrowUpRight } from "lucide-react";

const paths = [
  {
    title: "Web Pentester",
    description:
      "Find and exploit modern web vulnerabilities with repeatable methodology.",
    courses: 4,
  },
  {
    title: "Red Team Operator",
    description:
      "Simulate adversary behavior across initial access, persistence, and lateral movement.",
    courses: 6,
  },
  {
    title: "Linux Hacker",
    description:
      "Own Linux environments through privilege escalation and system exploitation.",
    courses: 3,
  },
  {
    title: "Bug Bounty Hunter",
    description:
      "Build your hunting workflow and ship high-value reports faster.",
    courses: 5,
  },
];

export function LearningPathsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">
        Learning Paths
      </h2>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Follow expert-curated tracks from zero to advanced offensive security.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {paths.map((path) => (
          <article
            key={path.title}
            className="group rounded-2xl border border-zinc-700 bg-[#111827]/80 p-6 transition-all duration-300 hover:border-emerald-400/50 hover:bg-[#131d2f]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {path.description}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-emerald-300" />
            </div>
            <p className="mt-5 text-sm text-emerald-300">
              {path.courses} courses
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
