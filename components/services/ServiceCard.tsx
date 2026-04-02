import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Service } from "./services-data";
import { serviceIcons } from "./services-data";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon ? serviceIcons[service.icon] : null;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1326]/90 via-[#0f172a]/80 to-[#0b1220]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-300/40 hover:shadow-[0_0_60px_-30px_rgba(34,211,238,0.8)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/5 to-fuchsia-400/10" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-3">
            {Icon ? (
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
                <Icon className="h-5 w-5" />
              </div>
            ) : null}
            <h3 className="text-xl font-semibold text-white">{service.title}</h3>
          </div>
          {service.highlight ? (
            <Badge className="border-cyan-200/30 bg-cyan-300/10 text-cyan-100">
              {service.highlight}
            </Badge>
          ) : null}
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-300">
          {service.shortDescription}
        </p>

        <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200 transition-colors group-hover:text-cyan-100">
          Explore service
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
