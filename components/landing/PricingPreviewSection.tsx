import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: ["Intro courses", "Basic challenges", "Community access"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    features: ["All Free content", "Advanced labs", "AI tutor assistance"],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Elite",
    price: "$79",
    features: ["All Pro features", "Mentor reviews", "Career prep pathway"],
    cta: "Go Elite",
    featured: false,
  },
];

export function PricingPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
        Flexible Plans for Every Hacker
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border p-6 ${
              tier.featured
                ? "border-emerald-400/50 bg-emerald-500/10"
                : "border-zinc-700 bg-[#111827]/80"
            }`}
          >
            <p className="text-lg font-semibold text-white">{tier.name}</p>
            <p className="mt-2 text-3xl font-extrabold text-white">
              {tier.price}
              <span className="text-sm font-medium text-zinc-400">/mo</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-300" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="mt-6 block">
              <Button
                className={`w-full ${
                  tier.featured
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                }`}
              >
                {tier.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
