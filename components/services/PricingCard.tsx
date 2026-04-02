import { Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  popular,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]",
        popular &&
          "z-10 scale-[1.03] border-cyan-300/40 bg-gradient-to-b from-cyan-400/10 to-transparent shadow-[0_0_36px_rgba(34,211,238,0.25)] sm:scale-105",
      )}
    >
      {popular ? (
        <Badge className="w-fit border border-cyan-300/40 bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300/15">
          Most Popular
        </Badge>
      ) : null}

      <div className="mt-5 space-y-2">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="text-3xl font-bold tracking-tight text-cyan-100">
          {price}
        </p>
        <p className="text-sm text-slate-300">{description}</p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {features.slice(0, 6).map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-slate-200"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-cyan-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        className={cn(
          "mt-8 w-full border border-white/15 bg-white/5 text-white hover:bg-white/10",
          popular &&
            "border-cyan-300/40 bg-cyan-300/20 text-cyan-50 hover:bg-cyan-300/30",
        )}
      >
        <Link href="/get-in-touch">{cta}</Link>
      </Button>
    </article>
  );
}
