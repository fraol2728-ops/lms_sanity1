const stats = [
  { label: "Installations", value: "1,000+" },
  { label: "Years Experience", value: "10+" },
  { label: "Customer Satisfaction", value: "98%" },
  { label: "Support Availability", value: "24/7" },
];

export function StatsSection() {
  return (
    <section className="bg-white py-20 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-emerald-600">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-600">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
