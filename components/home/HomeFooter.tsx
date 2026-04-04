import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/programs" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/courses" },
  { label: "Contact", href: "/get-in-touch" },
];

export function HomeFooter() {
  return (
    <footer className="bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xl font-semibold text-white">Solaris Energy</p>
          <p className="mt-3 max-w-sm text-sm text-slate-400">
            Trusted solar partner for homes and businesses focused on long-term
            energy savings.
          </p>
          <p className="mt-4 text-sm text-slate-400">hello@solarisenergy.com</p>
          <p className="text-sm text-slate-400">+1 (555) 014-7788</p>
        </div>

        <div className="md:justify-self-end">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm transition hover:text-emerald-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex gap-4">
            <Link
              href="/"
              aria-label="Facebook"
              className="hover:text-emerald-300"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              aria-label="Instagram"
              className="hover:text-emerald-300"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              aria-label="LinkedIn"
              className="hover:text-emerald-300"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
