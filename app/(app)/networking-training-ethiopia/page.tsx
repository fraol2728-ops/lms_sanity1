import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Networking Training Ethiopia",
  description:
    "Learn networking in Ethiopia with Dev Fraol Academy through structured online lessons that connect network fundamentals to cybersecurity, Linux, and ethical hacking practice.",
  path: "/networking-training-ethiopia",
  keywords: [
    "networking training Ethiopia",
    "networking course Addis Ababa",
    "learn Linux Ethiopia",
  ],
});

export default function NetworkingTrainingEthiopiaPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-20 text-white">
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">
            Networking Training in Ethiopia
          </h1>
          <p className="max-w-3xl text-zinc-300">
            Dev Fraol Academy offers networking-focused training for Ethiopian
            learners who want to understand routing, protocols, troubleshooting,
            and how networks connect directly to cybersecurity operations.
          </p>
        </header>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            Built for modern IT and cyber careers
          </h2>
          <p className="text-zinc-300">
            Strong network knowledge supports penetration testing, blue team
            analysis, Linux administration, and cloud security. This page
            targets learners searching for networking training in Ethiopia and
            Addis Ababa.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">What you will learn</h2>
          <p className="text-zinc-300">
            Topics include TCP/IP, service discovery, lab troubleshooting,
            foundational packet analysis, and the networking mindset required
            for ethical hacking and cyber security training in Ethiopia.
          </p>
        </section>
      </article>
    </main>
  );
}
