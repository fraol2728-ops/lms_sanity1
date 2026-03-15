import { Header } from "@/components/Header";
import {
  AITutorSection,
  CTASection,
  FeaturedCoursesSection,
  FeaturesSection,
  Footer,
  HeroSection,
  LearningPathsSection,
  PricingPreviewSection,
  StatsSection,
} from "@/components/landing";
import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_COURSES_QUERY, STATS_QUERY } from "@/sanity/lib/queries";
import type {
  FEATURED_COURSES_QUERYResult,
  STATS_QUERYResult,
} from "@/sanity.types";

export default async function Home() {
  const [{ data: courses }, { data: stats }] = (await Promise.all([
    sanityFetch({ query: FEATURED_COURSES_QUERY }),
    sanityFetch({ query: STATS_QUERY }),
  ])) as [{ data: FEATURED_COURSES_QUERYResult }, { data: STATS_QUERYResult }];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Header />
      <main>
        <HeroSection />
        <StatsSection
          stats={{
            courseCount: stats?.courseCount ?? 0,
            lessonCount: stats?.lessonCount ?? 0,
          }}
        />
        <FeaturedCoursesSection courses={courses ?? []} />
        <LearningPathsSection />
        <FeaturesSection />
        <AITutorSection />
        <PricingPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
