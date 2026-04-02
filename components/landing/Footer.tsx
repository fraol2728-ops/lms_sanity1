import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "Roadmap", href: "/programs" },
  ],
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Brand Identity", href: "/services/brand-identity" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    {
      label: "Cybersecurity",
      href: "/services/cybersecurity-consulting",
    },
  ],
  Resources: [
    { label: "Guides", href: "/docs" },
    { label: "Contact", href: "/get-in-touch" },
    { label: "Courses", href: "/courses" },
  ],
  Community: [
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Learning Paths", href: "/paths" },
    { label: "Programs", href: "/programs" },
  ],
};

export function Footer() {
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
        © {new Date().getFullYear()} Powered By Fraol Belachew. All rights
        reserved.
      </div>
    </footer>
  );
}
