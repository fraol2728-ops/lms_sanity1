import type { Service } from "./services-data";
import { ServiceCard } from "./ServiceCard";

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="space-y-6">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
          Service Catalog
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Solutions engineered for secure growth
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
