import { BatteryCharging, Building2, House, Wrench } from "lucide-react";

const services = [
  {
    title: "Residential Solar",
    description:
      "Custom rooftop systems designed to lower utility costs and increase home efficiency.",
    icon: House,
  },
  {
    title: "Commercial Solar",
    description:
      "Scalable energy systems for offices, retail spaces, and industrial facilities.",
    icon: Building2,
  },
  {
    title: "Energy Storage",
    description:
      "Battery backup solutions for energy independence and uninterrupted operations.",
    icon: BatteryCharging,
  },
  {
    title: "Maintenance & Monitoring",
    description:
      "Proactive monitoring and support to maximize output and protect performance.",
    icon: Wrench,
  },
];

export function ServicesSection() {
  return (
    <section className="bg-white py-20 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Our Services</h2>
          <p className="mt-3 text-slate-600">
            End-to-end solar services built around your energy goals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-emerald-500/10 p-3">
                  <Icon className="h-6 w-6 text-emerald-600" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
