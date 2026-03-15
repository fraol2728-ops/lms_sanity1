import {
  CTASection,
  FeaturedCoursesSection,
  FeaturesSection,
  Footer,
  HeroSection,
  HowItWorksSection,
  LearningPathsSection,
} from "@/components/landing";
import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_COURSES_QUERY } from "@/sanity/lib/queries";
import type { FEATURED_COURSES_QUERYResult } from "@/sanity.types";

export default async function Home() {
  const { data: courses } = (await sanityFetch({
    query: FEATURED_COURSES_QUERY,
  })) as { data: FEATURED_COURSES_QUERYResult };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <main>
        <HeroSection />
        <FeaturesSection />
        <LearningPathsSection />
        <FeaturedCoursesSection courses={courses ?? []} />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
