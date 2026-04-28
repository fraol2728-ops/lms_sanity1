"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";

export function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const footerLinks = {
    [t.footerPlatform]: [
      { label: t.navPricing, href: "/pricing" },
      { label: lang === "ar" ? "التوثيق" : "Documentation", href: "/docs" },
      { label: lang === "ar" ? "خارطة الطريق" : "Roadmap", href: "/programs" },
    ],
    [t.footerServices]: [
      {
        label: lang === "ar" ? "تطوير الويب" : "Web Development",
        href: "/services/web-development",
      },
      {
        label: lang === "ar" ? "هوية العلامة" : "Brand Identity",
        href: "/services/brand-identity",
      },
      {
        label: lang === "ar" ? "تصميم الواجهات" : "UI/UX Design",
        href: "/services/ui-ux-design",
      },
      {
        label: lang === "ar" ? "استشارات الأمن السيبراني" : "Cybersecurity",
        href: "/services/cybersecurity-consulting",
      },
    ],
    [t.footerResources]: [
      { label: lang === "ar" ? "الأدلة" : "Guides", href: "/docs" },
      { label: lang === "ar" ? "تواصل" : "Contact", href: "/get-in-touch" },
      { label: lang === "ar" ? "الدورات" : "Courses", href: "/courses" },
    ],
    [t.footerCommunity]: [
      {
        label: lang === "ar" ? "لوحة المتصدرين" : "Leaderboard",
        href: "/leaderboard",
      },
      {
        label: lang === "ar" ? "مسارات التعلم" : "Learning Paths",
        href: "/paths",
      },
      { label: t.navPrograms, href: "/programs" },
    ],
  };

  return (
    <footer className="border-t border-zinc-800 bg-[#0a0f1a]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 lg:grid-cols-4 lg:px-12">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-400">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-emerald-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-800 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {t.poweredBy} {t.allRightsReserved}
      </div>
    </footer>
  );
}
