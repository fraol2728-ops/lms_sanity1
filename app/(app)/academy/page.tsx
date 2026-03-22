import { Compass, MapPin, School, Sparkles } from "lucide-react";
import { AcademyGrid } from "@/components/academy";
import type { AcademyCourseCardData } from "@/components/academy/types";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";

const ACADEMY_COURSES_QUERY = `*[_type == "academyCourse"] | order(title asc) {
  title,
  "slug": slug.current,
  description,
  thumbnail{
    asset->{url}
  },
  duration,
  level,
  location
}`;

export const metadata = buildMetadata({
  title: "Academy Training Addis Ababa",
  description:
    "Explore Dev Fraol Academy physical programs for in-person cybersecurity and IT training in Addis Ababa, Ethiopia.",
  path: "/academy",
  keywords: ["networking course Addis Ababa", "IT training Ethiopia"],
});

async function getAcademyCourses(): Promise<AcademyCourseCardData[]> {
  const { data } = await sanityFetch({
    query: ACADEMY_COURSES_QUERY,
  });

  return (data ?? []) as AcademyCourseCardData[];
}

export default async function AcademyPage() {
  const courses = await getAcademyCourses();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Academy",
        item: `${siteConfig.url}/academy`,
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#040816] text-white">
      <StructuredData data={breadcrumbSchema} />
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-[120px]" />
        <div className="absolute bottom-[-18%] right-[-8%] h-[520px] w-[520px] rounded-full bg-fuchsia-500/12 blur-[140px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="rounded-[2rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(8,20,38,0.96),rgba(6,11,24,0.9))] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:p-10 lg:p-14">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-100">
              <School className="h-4 w-4" /> Physical academy programs
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Cyber education built for the classroom, lab, and live range.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              The Academy section is tailored for in-person cybersecurity
              learning experiences—intensive cohorts, guided onsite labs, and
              lesson-driven physical training programs.
            </p>
            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              <InfoChip icon={Compass} label="Structured modules" />
              <InfoChip icon={MapPin} label="Location-based delivery" />
              <InfoChip icon={Sparkles} label="Cyber + education aesthetic" />
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                Course directory
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                In-person academy tracks
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Explore physical courses with location details, cohort formats,
              and lesson-based pathways powered directly by Sanity CMS.
            </p>
          </div>

          {courses.length ? (
            <AcademyGrid courses={courses} />
          ) : (
            <div className="rounded-[1.75rem] border border-white/10 bg-[#07111f]/85 p-8 text-slate-300">
              Academy courses have not been published in Sanity yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function InfoChip({
  icon: Icon,
  label,
}: {
  icon: typeof Compass;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-cyan-200" />
        <span>{label}</span>
      </div>
    </div>
  );
}
