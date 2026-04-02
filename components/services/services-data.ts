import { ShieldCheck, Brush, LayoutTemplate, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServiceIconKey =
  | "web-development"
  | "brand-identity"
  | "ui-ux-design"
  | "cybersecurity-consulting";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon?: ServiceIconKey;
  highlight?: string;
}

export const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  "web-development": Code2,
  "brand-identity": Brush,
  "ui-ux-design": LayoutTemplate,
  "cybersecurity-consulting": ShieldCheck,
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Secure Web Development",
    shortDescription:
      "Full-stack web platforms engineered with security-first architecture and modern performance standards.",
    fullDescription:
      "We design and deliver production-grade web applications with a secure-by-default approach from day one. Our team applies modern App Router architecture, hardened API patterns, and robust authentication flows to ensure every release is resilient, scalable, and maintainable.",
    features: [
      "Threat-aware architecture and secure coding standards",
      "Role-based access control and hardened authentication",
      "Performance optimization with Core Web Vitals alignment",
      "Continuous monitoring and release hardening workflows",
    ],
    icon: "web-development",
    highlight: "Most Popular",
  },
  {
    slug: "brand-identity",
    title: "Brand Identity for Security Teams",
    shortDescription:
      "Distinct cybersecurity-centric visual systems that communicate trust, authority, and technical excellence.",
    fullDescription:
      "Your brand is a security signal. We craft cohesive brand identity systems tailored for cybersecurity companies, training organizations, and technology ventures. From visual strategy to implementation assets, we align every element with your positioning and audience confidence goals.",
    features: [
      "Positioning strategy and messaging alignment",
      "Logo systems, typography, and secure-tech color language",
      "Brand guidelines optimized for digital-first teams",
      "Marketing and product identity asset kits",
    ],
    icon: "brand-identity",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "High-conversion, accessibility-first interfaces for complex digital products and learning platforms.",
    fullDescription:
      "We design intuitive user experiences that reduce friction while preserving advanced functionality. Every screen is built around real workflows, accessibility principles, and measurable usability outcomes. The result is product design that feels premium and performs under real-world constraints.",
    features: [
      "Research-backed user journey and information architecture",
      "High-fidelity interface design with reusable design systems",
      "Accessibility and inclusive UX validation",
      "Prototype testing and iteration with actionable insights",
    ],
    icon: "ui-ux-design",
  },
  {
    slug: "cybersecurity-consulting",
    title: "Cybersecurity Consulting",
    shortDescription:
      "Strategic advisory and technical assessments to reduce risk, improve resilience, and strengthen governance.",
    fullDescription:
      "Our cybersecurity consulting engagements help organizations identify critical risks, prioritize mitigation actions, and improve operational readiness. We combine executive-level guidance with technical depth to build practical, compliant, and sustainable security programs.",
    features: [
      "Security posture assessments and risk prioritization",
      "Application and infrastructure security reviews",
      "Governance, policy, and compliance advisory",
      "Incident readiness planning and remediation roadmaps",
    ],
    icon: "cybersecurity-consulting",
    highlight: "Enterprise Ready",
  },
];

export const serviceProcessSteps = [
  "Discovery",
  "Design",
  "Development",
  "Testing",
  "Launch",
] as const;
