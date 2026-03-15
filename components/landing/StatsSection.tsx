import { BookOpen, GraduationCap, LibraryBig, Users } from "lucide-react";

interface StatsSectionProps {
  stats: {
    courseCount: number;
    lessonCount: number;
  };
}

export function StatsSection({ stats }: StatsSectionProps) {
  const items = [
    { label: "Courses", value: stats.courseCount, icon: BookOpen },
    { label: "Lessons", value: stats.lessonCount, icon: LibraryBig },
    { label: "Learning Paths", value: 12, icon: GraduationCap },
    { label: "Community", value: "18K+", icon: Users },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-emerald-500/20 bg-[#111827]/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
          >
            <item.icon className="mb-4 h-5 w-5 text-emerald-300" />
            <p className="text-3xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-zinc-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
