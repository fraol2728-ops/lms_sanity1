import { buildMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata = buildMetadata({
  title: "Ethical Hacking Addis Ababa",
  description:
    "Explore ethical hacking training in Addis Ababa with Dev Fraol Academy, including recon, web testing, Linux skills, and structured cybersecurity practice for Ethiopian learners.",
  path: "/ethical-hacking-addis-ababa",
  keywords: [
    "ethical hacking Ethiopia",
    "ethical hacking Addis Ababa",
    "fraol hacking course",
  ],
});

export default function EthicalHackingAddisAbabaPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://devfraolacademy.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ethical Hacking Addis Ababa",
        item: "https://devfraolacademy.com/ethical-hacking-addis-ababa",
      },
    ],
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-20 text-white">
      <StructuredData data={breadcrumb} />
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">
            Ethical Hacking Training in Addis Ababa
          </h1>
          <p className="max-w-3xl text-zinc-300">
            If you are looking for ethical hacking training in Addis Ababa, Dev
            Fraol Academy provides a focused path into reconnaissance, web
            security, Linux usage, and practical offensive security workflows.
          </p>
        </header>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            Practical learning for Ethiopian students
          </h2>
          <p className="text-zinc-300">
            The training experience is built for self-paced learners and
            aspiring professionals who want clearer guidance than scattered
            tutorials, while staying aligned with real cybersecurity tasks.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">
            What makes the program different
          </h2>
          <p className="text-zinc-300">
            Students can combine course-based learning, academy content, and
            AI-assisted support to reinforce concepts in penetration testing,
            networking, and system hardening.
          </p>
        </section>
      </article>
    </main>
  );
}
