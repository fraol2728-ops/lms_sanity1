import type { Metadata } from "next";
import Link from "next/link";
import {
  type CatalogCourse,
  CoursesGrid,
} from "@/components/courses/CoursesGrid";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import {
  COURSES_CATEGORIES_QUERY,
  DASHBOARD_COURSES_QUERY,
} from "@/sanity/lib/queries";
import type { DASHBOARD_COURSES_QUERYResult } from "@/sanity.types";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title:
      "Cybersecurity Courses in Ethiopia | Learn Ethical Hacking Free - Xybersec",
    description:
      "Join Xybersec to learn cybersecurity in Ethiopia. مجانية ethical hacking courses, red team, blue team, and penetration testing training for beginners.",
    path: "/programs",
    keywords: [
      "cybersecurity course in Ethiopia",
      "ethical hacking Ethiopia",
      "free cybersecurity course Ethiopia",
      "learn hacking Addis Ababa",
    ],
  });
}

interface CategoryResult {
  _id: string;
  title: string | null;
}

const inferDifficulty = (
  tier: string | null | undefined,
): CatalogCourse["difficulty"] => {
  if (tier === "ultra") return "Advanced";
  if (tier === "pro") return "Intermediate";
  return "Beginner";
};

export default async function ProgramsPage() {
  const [{ data: coursesData }, { data: categoriesData }] = (await Promise.all([
    sanityFetch({
      query: DASHBOARD_COURSES_QUERY,
    }) as Promise<{ data: DASHBOARD_COURSES_QUERYResult }>,
    sanityFetch({
      query: COURSES_CATEGORIES_QUERY,
    }) as Promise<{ data: CategoryResult[] }>,
  ])) as [{ data: DASHBOARD_COURSES_QUERYResult }, { data: CategoryResult[] }];

  const categories = categoriesData
    .filter((category) => Boolean(category.title))
    .map((category) => ({
      id: category._id,
      title: category.title ?? "General",
    }));

  const courses: CatalogCourse[] = coursesData
    .filter((course) => Boolean(course.slug?.current))
    .map((course) => {
      const lessonCount = course.lessonCount ?? 0;
      const estimatedHours = Math.max(1, Math.ceil(lessonCount / 4));

      return {
        id: course._id,
        slug: course.slug?.current ?? "",
        title: course.title ?? "Untitled Program",
        instructor: course.category?.title
          ? `${course.category.title} Team`
          : "Xybersec Instructor",
        difficulty: inferDifficulty(course.tier),
        category: course.category?.title ?? "General",
        lessonCount,
        durationLabel: `${estimatedHours} ${estimatedHours === 1 ? "Hour" : "Hours"}`,
        thumbnailUrl: course.thumbnail?.asset?.url,
      };
    });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Xybersec programs",
    itemListElement: courses.map((course, index) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      url: `${siteConfig.url}/programs/${course.slug}`,
      educationalLevel: course.difficulty,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Programs",
        item: `${siteConfig.url}/programs`,
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Xybersec",
    areaServed: "Ethiopia",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ET",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this course available in Ethiopia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Xybersec programs are available for learners across Ethiopia, including Addis Ababa and other regions through online access.",
        },
      },
      {
        "@type": "Question",
        name: "Is Xybersec free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Xybersec includes free cybersecurity course content in Ethiopia, with beginner-friendly lessons that help you start ethical hacking and cyber defense training.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need experience?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No previous experience is required. Beginner roadmaps guide Ethiopian learners from fundamentals to advanced penetration testing and blue team skills.",
        },
      },
      {
        "@type": "Question",
        name: "Is ethical hacking legal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ethical hacking is legal when performed with permission and within applicable laws. Xybersec teaches responsible, authorized security testing practices.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <StructuredData data={itemListSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <section className="mb-10 rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-600/20 via-fuchsia-500/10 to-cyan-500/5 p-10 text-center shadow-xl shadow-violet-950/30">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Learn Cybersecurity in Ethiopia 🇪🇹
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-zinc-200/90">
            Start your journey in ethical hacking, penetration testing, and
            cyber defense with structured roadmaps designed for Ethiopian
            learners.
          </p>
          <p className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-zinc-300 sm:text-base">
            Xybersec is a cybersecurity learning platform designed for students
            in Ethiopia who want to learn ethical hacking, penetration testing,
            and cyber defense skills from beginner to advanced.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              href="/"
              className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-400/20"
            >
              Go to Homepage
            </Link>
            <Link
              href="#roadmaps"
              className="rounded-full border border-violet-400/40 bg-violet-400/10 px-4 py-2 text-violet-100 transition hover:bg-violet-400/20"
            >
              Browse Roadmaps
            </Link>
          </div>
        </section>

        <section
          id="roadmaps"
          className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8"
        >
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Cybersecurity Roadmaps for Ethiopia
          </h2>
          <p className="mt-3 max-w-4xl text-zinc-300">
            Choose a path and learn hacking in Addis Ababa or from anywhere in
            Ethiopia with practical, step-by-step course progression.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <h3 className="text-lg font-semibold text-violet-200">
                Red Teaming in Ethiopia
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Learn offensive security, exploitation, and hacking techniques
                used by professionals to simulate real-world attacks.
              </p>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <h3 className="text-lg font-semibold text-cyan-200">
                Blue Team Operations Ethiopia
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Build cyber defense skills, monitoring workflows, and incident
                response techniques for organizations in Ethiopia.
              </p>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
              <h3 className="text-lg font-semibold text-fuchsia-200">
                Penetration Testing Ethiopia
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Practice penetration testing from scoping to reporting using
                guided labs and ethical hacking methodologies.
              </p>
            </article>
          </div>
        </section>

        <CoursesGrid
          courses={courses}
          categories={categories}
          hrefBase="/programs"
          emptyMessage="No programs match your search or selected filter."
        />

        <section className="mt-12 space-y-6">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Cybersecurity Courses in Ethiopia
            </h2>
            <p className="mt-4 text-zinc-300">
              If you are searching for a cybersecurity course in Ethiopia,
              Xybersec gives you structured lessons that blend theory and
              practical labs. Our programs cover core topics including ethical
              hacking Ethiopia learners need to understand modern attacks and
              defenses.
            </p>
            <p className="mt-3 text-zinc-300">
              You can progress from beginner networking and Linux fundamentals
              into advanced penetration testing and red team strategies. Every
              pathway is designed to help students in Ethiopia build real skills
              for internships, job readiness, and long-term cybersecurity
              careers.
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Free Ethical Hacking Training in Addis Ababa
            </h2>
            <p className="mt-4 text-zinc-300">
              Looking for free cybersecurity course Ethiopia resources? Xybersec
              provides accessible learning materials for students who want to
              start with ethical hacking fundamentals before moving to advanced
              modules.
            </p>
            <p className="mt-3 text-zinc-300">
              Whether you want to learn hacking Addis Ababa communities discuss
              or study remotely from other cities, our roadmaps make it easier
              to stay consistent. You can focus on vulnerability assessment, web
              security, and practical defense concepts at your own pace.
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How to Start Cybersecurity in Ethiopia
            </h2>
            <p className="mt-4 text-zinc-300">
              Start by choosing one track and following it end-to-end. A
              beginner should build foundations in networking, operating
              systems, and security basics, then move into ethical hacking
              tools, penetration testing workflow, and reporting best practices.
            </p>
            <p className="mt-3 text-zinc-300">
              Join the Xybersec learning path, complete projects, and revisit
              lessons often. Consistent practice is the fastest way to turn a
              cybersecurity course in Ethiopia into practical capability you can
              apply in real environments.
            </p>
          </article>
        </section>

        <section className="mt-12 rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-600/10 via-zinc-900/40 to-zinc-900/40 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-5">
            <article>
              <h3 className="text-lg font-medium">
                Is this course available in Ethiopia?
              </h3>
              <p className="mt-1 text-zinc-300">
                Yes. Xybersec is available across Ethiopia and supports learners
                in Addis Ababa and beyond.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium">Is Xybersec free?</h3>
              <p className="mt-1 text-zinc-300">
                Xybersec includes free cybersecurity course Ethiopia content for
                beginners, with optional advanced paths.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium">Do I need experience?</h3>
              <p className="mt-1 text-zinc-300">
                No experience is needed. Start with beginner lessons and
                progress into ethical hacking and penetration testing step by
                step.
              </p>
            </article>
            <article>
              <h3 className="text-lg font-medium">Is ethical hacking legal?</h3>
              <p className="mt-1 text-zinc-300">
                Yes, when done with proper authorization and legal permission.
                Xybersec teaches responsible ethical hacking practices.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
