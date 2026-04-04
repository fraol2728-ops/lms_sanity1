import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { CTASection } from "@/components/home/CTASection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata, siteConfig } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { FEATURED_COURSES_QUERY } from "@/sanity/lib/queries";
import type { FEATURED_COURSES_QUERYResult } from "@/sanity.types";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Solaris Energy | Premium Solar Solutions",
    description:
      "Premium residential and commercial solar solutions designed for long-term savings, sustainability, and reliable clean energy.",
    path: "/",
    keywords: [
      "solar provider",
      "residential solar",
      "commercial solar",
      "solar installation",
      "clean energy",
    ],
  });
}

export default async function Home() {
  let posts: FEATURED_COURSES_QUERYResult = [];

  try {
    const result = (await sanityFetch({
      query: FEATURED_COURSES_QUERY,
    })) as { data: FEATURED_COURSES_QUERYResult };

    posts = result.data ?? [];
  } catch (error) {
    console.error("Failed to load featured homepage content", error);
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Solaris Energy",
    url: siteConfig.url,
    description:
      "Trusted solar provider delivering affordable clean energy systems for homes and businesses.",
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
    ],
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <StructuredData data={organizationSchema} />
      <StructuredData data={breadcrumbSchema} />
      <main aria-label="Solar provider homepage">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <BlogPreview posts={posts} />
        <CTASection />
      </main>
      <HomeFooter />
    </div>
  );
}
