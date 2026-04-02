import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { GlowBackground } from "@/components/services/GlowBackground";
import { PricingCard } from "@/components/services/PricingCard";
import { SectionWrapper } from "@/components/services/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Web Development Service",
  description:
    "Build modern, secure, and scalable websites with flexible plans designed for startups and growing businesses.",
  path: "/services/web-development",
  keywords: [
    "web development service",
    "secure website development",
    "XyberSec Academy",
  ],
});

interface WebPricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const pricingPlans: WebPricingPlan[] = [
  {
    name: "Starter",
    price: "9,999 ETB",
    description: "Perfect to get your business online fast",
    features: [
      "1–3 pages",
      "Responsive design",
      "Modern UI",
      "Contact form",
      "Basic SEO",
      "Fast performance",
    ],
    cta: "Start Now",
  },
  {
    name: "Economy",
    price: "25,000 ETB",
    description: "Best for growing businesses",
    features: [
      "Up to 8 pages",
      "Premium UI/UX",
      "CMS integration",
      "SEO-ready structure",
      "Performance optimization",
      "Security basics",
      "Analytics integration",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Business",
    price: "49,999+ ETB",
    description: "For serious businesses & startups",
    features: [
      "Unlimited pages",
      "Advanced UI/UX",
      "Authentication system",
      "API integrations",
      "Advanced security",
      "Ongoing support",
      "Priority delivery",
    ],
    cta: "Contact Us",
  },
];

interface AdvancedService {
  title: string;
  features: string[];
  priceNote: string;
}

const advancedServices: AdvancedService[] = [
  {
    title: "E-Commerce",
    features: ["Product system", "Payment integration", "Admin dashboard"],
    priceNote: "Starting from 45,000 ETB",
  },
  {
    title: "Custom Web App",
    features: [
      "Custom functionality",
      "Scalable architecture",
      "Advanced dashboards",
    ],
    priceNote: "Starting from 85,000 ETB",
  },
];

export default function WebDevelopmentServicePage() {
  return (
    <main className="min-h-screen bg-[#040910] text-white">
      <SectionWrapper className="relative overflow-hidden pb-14 pt-24 sm:pt-28">
        <GlowBackground className="left-1/2 top-8 size-80 -translate-x-1/2 bg-cyan-400/20" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/80">
            WEB DEVELOPMENT SERVICE
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Build Modern, Secure &amp; Scalable Websites
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            Launch faster with high-performance web experiences engineered for
            conversion and long-term growth.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="border-cyan-300/40 bg-cyan-300/20 text-cyan-50 hover:bg-cyan-300/30"
            >
              <Link href="/get-in-touch">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.08]"
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="pricing" className="relative pt-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-3 text-slate-300">
            Simple packages designed to help you decide quickly and confidently.
          </p>
        </div>

        <div className="relative grid items-stretch gap-6 md:grid-cols-3">
          <GlowBackground className="left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 opacity-70" />

          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              cta={plan.cta}
              popular={plan.popular}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Advanced Solutions
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {advancedServices.map((service) => (
            <Card
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <ul className="mt-4 space-y-2 text-slate-300">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-cyan-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-medium text-cyan-200">
                {service.priceNote}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-8">
        <div className="rounded-2xl border border-cyan-300/25 bg-gradient-to-r from-cyan-400/10 via-cyan-300/5 to-transparent p-8 text-center sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Have a custom project in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Tell us your idea and we&apos;ll design the right architecture,
            scope, and delivery plan.
          </p>
          <Button
            asChild
            className="mt-6 border-cyan-300/40 bg-cyan-300/20 text-cyan-50 hover:bg-cyan-300/30"
          >
            <Link href="/get-in-touch">
              Contact Us
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
