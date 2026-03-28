import { buildMetadata, siteConfig } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata = buildMetadata({
  title: "Cybersecurity Course Ethiopia",
  description:
    "Join Xybersec for a cybersecurity course in Ethiopia covering ethical hacking, Linux, networking, blue team fundamentals, and practical career-ready labs.",
  path: "/cybersecurity-course-ethiopia",
  keywords: [
    "cybersecurity course Ethiopia",
    "cyber security training Ethiopia",
    "IT training Ethiopia",
  ],
});

export default function CybersecurityCourseEthiopiaPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is the cybersecurity course in Ethiopia for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The program is designed for beginners, IT students, aspiring SOC analysts, and future ethical hackers in Ethiopia who want structured hands-on training.",
        },
      },
      {
        "@type": "Question",
        name: "What topics are covered?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students learn Linux, networking, reconnaissance, web security, ethical hacking workflows, and practical cyber defense skills through guided lessons.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-20 text-white">
      <StructuredData data={faq} />
      <article className="space-y-8">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
            Ethiopia Cybersecurity Training
          </p>
          <h1 className="text-4xl font-bold">
            Cybersecurity Course in Ethiopia
          </h1>
          <p className="max-w-3xl text-zinc-300">
            Xybersec helps learners in Ethiopia build real
            cybersecurity skills with structured online training, guided
            practice, and career-focused learning paths created by{" "}
            {siteConfig.creator}.
          </p>
        </header>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            Why learners choose Xybersec
          </h2>
          <p className="text-zinc-300">
            Our curriculum combines cybersecurity foundations with practical
            ethical hacking, Linux administration, and networking knowledge so
            students can move from theory to execution without changing the
            existing learning experience.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Skills you can build</h2>
          <ul className="list-disc space-y-2 pl-6 text-zinc-300">
            <li>Linux command line and system fundamentals.</li>
            <li>Networking concepts relevant to security analysis.</li>
            <li>Ethical hacking workflows and attack surface mapping.</li>
            <li>Cyber defense habits for labs, workplaces, and self-study.</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
