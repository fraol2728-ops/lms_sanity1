"use client";

import {
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const contactCards = [
  {
    title: "Email",
    description: "devfraol@gmail.com",
    href: "mailto:devfraol@gmail.com",
    cta: "Send Email",
    icon: Mail,
  },
  {
    title: "WhatsApp",
    description: "Quick replies for project questions and estimates.",
    href: "https://wa.me/0935366719",
    cta: "Chat on WhatsApp",
    icon: MessageCircle,
  },
  {
    title: "Phone",
    description: "+251 935366719",
    href: "tel:+251935366719",
    cta: "Call Now",
    icon: Phone,
  },
];

const socialLinks = [
  {
    label: "Telegram",
    href: "https://t.me/devfraol",
    icon: Send,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devfraol",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: Instagram,
  },
];

function formatPlanLabel(plan: string) {
  return plan
    .split("-")
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export default function GetInTouchPage() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan") ?? "custom";
  const selectedPlanLabel = formatPlanLabel(selectedPlan);

  return (
    <main className="min-h-screen bg-[#050b16] text-white">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6 lg:px-10">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-6 py-14 text-center sm:px-10">
          <h1 className="text-4xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text sm:text-6xl">
            Let&apos;s Build Your Project
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Tell us about your goals and we&apos;ll tailor the right solution
            for your business with secure, scalable delivery.
          </p>
          <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-5 py-2 text-sm font-medium text-cyan-100">
            You selected:{" "}
            <span className="font-semibold">{selectedPlanLabel}</span>
          </div>
        </section>

        <section className="space-y-5">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
              Contact Options
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Pick your preferred way to connect
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {contactCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <card.icon className="h-5 w-5 text-cyan-200" />
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}

            <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105">
              <p className="inline-flex rounded-full border border-fuchsia-300/35 bg-fuchsia-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-fuchsia-100">
                Socials
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">Socials</h3>
              <p className="mt-2 text-sm text-slate-300">
                Follow and message us on your favorite platform.
              </p>
              <ul className="mt-5 flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-100 transition-all hover:border-cyan-200/40 hover:bg-white/10"
                    >
                      <social.icon className="h-4 w-4 text-cyan-200" />
                      {social.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
