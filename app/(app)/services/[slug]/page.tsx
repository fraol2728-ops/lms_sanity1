import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
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
  theme: string;
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
    theme: "border-emerald-300/25",
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
    theme: "border-emerald-300/25",
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
    theme: "border-yellow-300/30",
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
    theme: "border-yellow-300/30",
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
    theme: "border-sky-300/30",
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
    theme: "border-sky-300/30",
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
    theme: "border-rose-300/35",
  },
];

const processSteps = [
  "Discovery",
  "Planning",
  "Design",
  "Development",
  "Launch",
];

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

        <section id="packages" className="space-y-7 scroll-mt-24">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
              Pricing Packages
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Choose the right package for your growth stage
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative rounded-2xl bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(45,212,191,0.14)] ${plan.theme} ${
                  plan.popular
                    ? "md:scale-[1.03] border-transparent bg-gradient-to-br from-yellow-300/10 via-white/5 to-cyan-300/10 ring-1 ring-yellow-300/40"
                    : ""
                }`}
              >
                {plan.popular ? (
                  <div className="absolute -top-3 left-6 rounded-full border border-yellow-200/50 bg-yellow-300/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-yellow-100">
                    Most Popular
                  </div>
                ) : null}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-2xl font-bold text-cyan-100">
                    {plan.price}
                  </p>
                  <p className="text-sm leading-6 text-slate-300">
                    {plan.summary}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">
                    What you get
                  </p>
                  <ul className="mt-3 space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2 text-sm leading-6 text-slate-200"
                      >
                        <span className="text-cyan-200">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  <p className="text-sm text-cyan-100">
                    🎯 Best for: {plan.bestFor.join(", ")}
                  </p>
                  <p className="text-sm text-slate-300">👉 {plan.cta}</p>
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link href="/contact">
                    Choose Plan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Card>
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
