import { CheckCircle2 } from "lucide-react";

interface ServiceDetailsProps {
  fullDescription: string;
  features: string[];
}

export function ServiceDetails({ fullDescription, features }: ServiceDetailsProps) {
  return (
    <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <h2 className="text-2xl font-semibold text-white">What we deliver</h2>
        <p className="mt-4 leading-7 text-slate-300">{fullDescription}</p>
      </div>

      <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.03] p-5">
        <h3 className="text-lg font-semibold text-cyan-100">Core features</h3>
        <ul className="mt-4 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm leading-6 text-slate-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
