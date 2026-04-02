import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { services } from "@/components/services/services-data";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore secure web, design, and cybersecurity consulting services tailored for modern digital products.",
  path: "/services",
  keywords: [
    "secure web development",
    "cybersecurity consulting",
    "ui ux services",
  ],
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050b16] text-white">
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-10">
        <section className="relative overflow-hidden rounded-3xl border border-cyan-300/25 bg-gradient-to-br from-[#101a30] via-[#0b1220] to-[#0a0f1a] p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.2),_transparent_45%)]" />
          <div className="relative z-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
              Xybersec Services
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              We design and build secure digital experiences
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="border-cyan-300/40 bg-cyan-300/15 text-cyan-50 hover:bg-cyan-300/25"
              >
                <Link href="/contact">Book a free discovery call</Link>
              </Button>
            </div>
          </div>
        </section>

        <ServicesGrid services={services} />

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-10">
          <h2 className="text-2xl font-semibold text-white">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-slate-300">
            Tell us your goals and we&apos;ll shape a secure delivery roadmap.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/contact">Talk with our team</Link>
            </Button>
          </div>
        </section>

        <ServiceCTA />
      </div>
    </main>
  );
}
