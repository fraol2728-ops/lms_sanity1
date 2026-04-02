import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Database,
  Gauge,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { ServiceDetails } from "@/components/services/ServiceDetails";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { services } from "@/components/services/services-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  if (slug === "web-development") {
    return <WebDevelopmentServicePage />;
  }

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

interface ServiceFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface PricingPlan {
  name: string;
  price: string;
  summary: string;
  features: string[];
  bestFor: string[];
  cta: string;
  popular?: boolean;
}

const webFeatures: ServiceFeature[] = [
  {
    title: "Fast Performance",
    description:
      "Optimized architecture and code splitting to keep load times consistently fast.",
    icon: Gauge,
  },
  {
    title: "Security-First Architecture",
    description:
      "Secure defaults across routing, forms, and integrations to reduce risk from day one.",
    icon: ShieldCheck,
  },
  {
    title: "Fully Responsive Design",
    description:
      "Pixel-perfect experiences across mobile, tablet, laptop, and large-screen devices.",
    icon: Smartphone,
  },
  {
    title: "UX-Optimized UI",
    description:
      "High-converting interfaces built with clear hierarchy and frictionless user journeys.",
    icon: Sparkles,
  },
  {
    title: "CMS Integration",
    description:
      "Flexible content management setup so your team can update content without developer support.",
    icon: Database,
  },
  {
    title: "SEO Optimization",
    description:
      "Search-ready structure with metadata and performance best practices for visibility.",
    icon: Search,
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic Landing Page",
    price: "10,000 ETB",
    summary:
      "A simple and effective one-page website to introduce your business.",
    features: [
      "1 modern scrolling page (Home section)",
      "Clean UI design (professional look)",
      "Fully responsive (mobile, tablet, desktop)",
      "Call, WhatsApp & email contact buttons",
      "Smooth scrolling and basic animations",
      "Fast loading performance",
      "Basic SEO setup (title, description)",
    ],
    bestFor: ["Personal brands", "Freelancers", "Single services"],
    cta: "Perfect for getting online quickly with a clean look.",
  },
  {
    name: "Starter Website",
    price: "15,000 ETB",
    summary: "A small multi-page website to clearly present your business.",
    features: [
      "Up to 3 pages (Home, About, Contact)",
      "Modern and structured layout",
      "Mobile & tablet optimized",
      "Contact form + WhatsApp chat",
      "Google Maps integration",
      "Social media links",
      "Basic image optimization",
      "Secure deployment (HTTPS)",
    ],
    bestFor: ["Small businesses", "Startups", "Local services"],
    cta: "A solid starting point for your business online.",
  },
  {
    name: "Standard Business Website",
    price: "25,000 ETB",
    summary:
      "A professional website designed to build trust and attract customers.",
    features: [
      "Up to 6 pages (custom structure)",
      "Custom UI/UX design (unique look)",
      "Blog or news section (dynamic content)",
      "Mobile-first optimization",
      "Speed optimization (fast loading)",
      "Basic SEO (Google-friendly structure)",
      "Social media integration",
      "Contact forms + WhatsApp integration",
      "Clean animations for better user experience",
    ],
    bestFor: ["Growing businesses", "Companies", "Brands"],
    cta: "A strong online presence that makes your business look professional.",
    popular: true,
  },
  {
    name: "Business Pro Website",
    price: "35,000 ETB",
    summary:
      "A powerful website with more control, flexibility, and advanced features.",
    features: [
      "Up to 10 pages",
      "Advanced UI/UX design (premium feel)",
      "Content Management System (CMS)",
      "You can update text and images easily",
      "Blog system with categories",
      "Google Analytics (track visitors)",
      "Advanced performance optimization",
      "Image & media optimization",
      "SEO-ready structure",
      "Enhanced security setup",
    ],
    bestFor: ["Expanding businesses", "Active brands"],
    cta: "More control, more features, and long-term growth.",
  },
  {
    name: "E-Commerce Starter",
    price: "45,000 ETB",
    summary: "Start selling your products online with a simple store.",
    features: [
      "Up to 20 products",
      "Product pages with images & details",
      "Shopping cart system",
      "Checkout page",
      "Payment integration (Telebirr / Chapa basic)",
      "Order management system",
      "Simple admin dashboard",
      "Mobile-friendly shopping experience",
    ],
    bestFor: ["Small online shops", "Instagram sellers"],
    cta: "Turn your products into an online business.",
  },
  {
    name: "E-Commerce Pro",
    price: "65,000 ETB",
    summary: "A complete online store with advanced business features.",
    features: [
      "Unlimited products",
      "Advanced product management",
      "Customer accounts (login/signup)",
      "Order tracking system",
      "Discount & coupon system",
      "Email notifications (orders, updates)",
      "Full admin dashboard",
      "Inventory management",
      "Advanced UI/UX shopping experience",
    ],
    bestFor: ["Serious e-commerce brands"],
    cta: "Everything you need to run and scale your online store.",
  },
  {
    name: "Custom Web App / System",
    price: "Starting from 85,000 ETB",
    summary:
      "A fully custom platform built specifically for your business idea.",
    features: [
      "Custom design & development (no templates)",
      "Frontend + backend system",
      "User authentication (login/signup)",
      "Role-based dashboards (admin/users)",
      "API integrations (payments, third-party tools)",
      "Advanced features based on your needs",
      "Scalable architecture for future growth",
      "High performance & security",
    ],
    bestFor: [
      "E-learning platforms",
      "Booking systems",
      "SaaS platforms",
      "Custom business tools",
    ],
    cta: "A complete digital system built exactly for your needs.",
  },
];

const processSteps = [
  "Discovery",
  "Planning",
  "Design",
  "Development",
  "Launch",
];

function PricingCard({ plan }: { plan: PricingPlan }) {
  const displayedFeatures = plan.features.slice(0, 5);

  return (
    <Card
      className={`relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,255,0.08)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] md:p-8 ${
        plan.popular
          ? "scale-105 border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(0,255,255,0.3)]"
          : ""
      }`}
    >
      {plan.popular ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-black">
          Most Popular
        </div>
      ) : null}

      <div className="space-y-5">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white">{plan.name}</h3>
          <p className="text-3xl font-bold text-white md:text-4xl">
            <span className="text-cyan-400">{plan.price}</span>
          </p>
          <p className="text-sm leading-6 text-slate-300">{plan.summary}</p>
        </div>

        <div className="border-t border-white/10" />

        <ul className="space-y-2">
          {displayedFeatures.map((feature, index) => (
            <li
              key={feature}
              className={`flex items-start gap-2 text-sm ${
                index < 2 ? "text-white" : "text-gray-300"
              }`}
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="my-4 border-t border-white/10" />

        <div className="space-y-2">
          <p className="text-sm text-cyan-100">
            Best for: {plan.bestFor.join(", ")}
          </p>
          <p className="text-sm text-slate-300">{plan.cta}</p>
        </div>

        <Button
          asChild
          className={`mt-4 w-full rounded-lg transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-black hover:scale-105 hover:from-cyan-400 hover:to-blue-400"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Link href="/contact">
            Choose Plan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function WebDevelopmentServicePage() {
  return (
    <main className="min-h-screen bg-[#050b16] text-white">
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6 lg:px-10">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-6 py-16 text-center sm:px-10">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text sm:text-6xl">
              Secure &amp; Modern Web Development
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              We build fast, scalable, and cybersecurity-focused websites
              tailored for your business.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="border-cyan-300/40 bg-cyan-300/15 text-cyan-50 hover:bg-cyan-300/25"
              >
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="#packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Built to perform, scale, and convert
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {webFeatures.map((feature) => (
              <Card
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-cyan-200/40 hover:shadow-[0_0_24px_rgba(56,189,248,0.15)]"
              >
                <feature.icon className="h-5 w-5 text-cyan-200" />
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="packages"
          className="relative space-y-7 scroll-mt-24 overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 blur-3xl" />
          <div className="relative text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
              Pricing Packages
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Choose the right package for your growth stage
            </h2>
          </div>
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-center text-3xl font-semibold text-white">
            Our process
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-xl border border-white/10 bg-[#0b1220]/80 p-4 text-center transition-all duration-300 hover:border-cyan-200/35"
              >
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                  {index + 1}
                </div>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-fuchsia-300/25 bg-gradient-to-r from-[#24103a] via-[#1b1432] to-[#101426] px-6 py-14 text-center sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let&apos;s build your next website
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200/90">
            Secure, scalable, and built for growth.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="border-fuchsia-300/50 bg-fuchsia-300/20 text-white hover:bg-fuchsia-300/30"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
