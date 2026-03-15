import { ArrowUpRight } from "lucide-react";

const paths = [
  {
    title: "Web Pentester",
    description:
      "Hunt vulnerabilities in modern web apps and validate impact with offensive workflows.",
    courses: 6,
  },
  {
    title: "Red Team Operator",
    description:
      "Simulate adversaries with lateral movement, privilege escalation, and persistence labs.",
    courses: 8,
  },
  {
    title: "Bug Bounty Hunter",
    description:
      "Build a repeatable recon and exploit pipeline to find and report high-value issues.",
    courses: 5,
  },
];

export function LearningPathsSection() {
  return (
    <section id="paths" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">
        Learning Paths
      </h2>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Choose a role-based roadmap and follow expert-designed modules from
        first exploit to professional readiness.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {paths.map((path) => (
          <article
            key={path.title}
            className="group rounded-2xl border border-cyan-400/20 bg-[#0b132b]/85 p-6 transition-all duration-300 hover:border-cyan-300/45 hover:shadow-[0_0_30px_rgba(14,165,233,0.18)]"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">{path.title}</h3>
              <ArrowUpRight className="h-5 w-5 text-zinc-500 transition group-hover:text-cyan-200" />
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {path.description}
            </p>
            <p className="mt-6 text-sm font-medium text-cyan-300">
              {path.courses} courses
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
