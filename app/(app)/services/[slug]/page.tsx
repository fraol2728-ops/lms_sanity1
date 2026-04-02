import type { Metadata } from "next";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { ServiceDetails } from "@/components/services/ServiceDetails";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { services } from "@/components/services/services-data";
import { buildMetadata } from "@/lib/seo";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found",
      description: "The requested service could not be found.",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    keywords: [
      service.title,
      "cybersecurity services",
      "secure product delivery",
    ],
  });
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#050b16] text-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-3xl font-semibold">Service not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050b16] text-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-10">
        <ServiceHero
          title={service.title}
          description={service.shortDescription}
        />
        <ServiceDetails
          fullDescription={service.fullDescription}
          features={service.features}
        />
        <ServiceProcess />
        <ServiceCTA />
      </div>
    </main>
  );
}
