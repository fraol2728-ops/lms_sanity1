"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ChevronRight,
  Command,
  Menu,
  Search,
  Shield,
  TerminalSquare,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/community", label: "Community" },
  { href: "/ai", label: "AI Lab", isNew: true },
];

const commandPaletteLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/community", label: "Community" },
  { href: "/ai", label: "AI Lab", isNew: true },
  { href: "/notes", label: "Notes" },
];

const courseMegaMenu = [
  {
    category: "Web Security",
    courses: [
      {
        title: "Web Hacking Fundamentals",
        description: "Understand HTTP attack surface, inputs, and web recon.",
      },
      {
        title: "SQL Injection",
        description: "Exploit SQL flaws and learn modern mitigation patterns.",
      },
      {
        title: "Authentication Attacks",
        description: "Break weak auth flows and hardened session handling.",
      },
    ],
  },
  {
    category: "Network Security",
    courses: [
      {
        title: "Network Pentesting",
        description:
          "Enumerate internal systems and validate exploitable paths.",
      },
      {
        title: "Enumeration Techniques",
        description:
          "Map targets quickly with practical service discovery tactics.",
      },
    ],
  },
  {
    category: "Linux Exploitation",
    courses: [
      {
        title: "Linux Privilege Escalation",
        description:
          "Abuse misconfigurations to gain root-level access safely.",
      },
      {
        title: "Linux Fundamentals",
        description:
          "Build shell confidence with systems and permissions basics.",
      },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleCommandToggle = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleCommandToggle);
    return () => window.removeEventListener("keydown", handleCommandToggle);
  }, []);

  useEffect(() => {
    if (!commandOpen) {
      setQuery("");
    }
  }, [commandOpen]);

  const filteredLinks = useMemo(
    () =>
      commandPaletteLinks.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          isScrolled
            ? "border-cyan-400/20 bg-[#050816]/90 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 sm:gap-3"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-[#0b1229] shadow-[0_0_25px_rgba(34,211,238,0.22)] transition group-hover:border-cyan-300/70">
              <Shield className="h-5 w-5 text-cyan-300" />
            </span>
            <div className="leading-tight">
              {/* <p className="hidden text-xs uppercase tracking-[0.24em] text-zinc-500 sm:block">
                Next
              </p> */}
              <p className="whitespace-nowrap text-sm font-semibold text-zinc-500 sm:text-base">
                Cyber <span className="text-cyan-300">Camp</span>
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <CoursesMegaMenu isScrolled={isScrolled} />
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                isScrolled={isScrolled}
                isActive={pathname === link.href}
                isNew={link.isNew}
              />
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="inline-flex h-10 min-w-44 items-center justify-between rounded-lg border border-cyan-400/20 bg-[#0d1430]/70 px-3 text-sm text-zinc-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
            >
              <span className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </span>
              <span className="inline-flex items-center gap-1 rounded border border-cyan-400/20 px-1.5 py-0.5 text-xs text-zinc-400">
                <Command className="h-3 w-3" />K
              </span>
            </button>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className={cn(
                    "hover:bg-cyan-400/10 hover:text-cyan-200",
                    isScrolled ? "text-zinc-200" : "text-zinc-700",
                  )}
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className={cn(
                    "border-cyan-400/30 bg-transparent hover:bg-cyan-400/10 hover:text-cyan-200",
                    isScrolled ? "text-zinc-100" : "text-zinc-800",
                  )}
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-1 ring-cyan-400/40",
                  },
                }}
              />
            </SignedIn>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-300 hover:bg-cyan-400/10 hover:text-cyan-200 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </nav>

        <div
          className={cn(
            "overflow-hidden border-t border-cyan-400/10 bg-[#060b1d]/95 backdrop-blur-xl transition-all duration-300 md:hidden",
            mobileOpen ? "max-h-[80vh]" : "max-h-0 border-transparent",
          )}
        >
          <div className="space-y-1 px-4 py-4">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="mb-2 flex w-full items-center gap-2 rounded-md border border-cyan-400/20 px-3 py-2 text-sm text-zinc-200"
            >
              <Search className="h-4 w-4" /> Search (⌘/Ctrl + K)
            </button>

            <MobileNavLink href="/" label="Home" isActive={pathname === "/"} />
            <MobileNavLink
              href="/courses"
              label="Courses"
              isActive={
                pathname === "/courses" || pathname.startsWith("/courses/")
              }
            />
            {navLinks.slice(1).map((link) => (
              <MobileNavLink
                key={link.label}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
                isNew={link.isNew}
              />
            ))}

            <div className="my-2 h-px bg-cyan-400/10" />

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-200 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-200 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  Dashboard
                </Button>
              </Link>
              <div className="px-3 py-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      <CommandPalette
        open={commandOpen}
        query={query}
        setQuery={setQuery}
        setOpen={setCommandOpen}
        filteredLinks={filteredLinks}
      />
    </>
  );
}

function NavLink({
  href,
  label,
  isScrolled,
  isActive,
  isNew,
}: {
  href: string;
  label: string;
  isScrolled: boolean;
  isActive?: boolean;
  isNew?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-cyan-400/10 hover:text-cyan-200",
        isActive
          ? "bg-cyan-400/12 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
          : isScrolled
            ? "text-zinc-300"
            : "text-zinc-600",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{label}</span>
      {isNew ? (
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          New
        </span>
      ) : null}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  isActive,
  isNew,
}: {
  href: string;
  label: string;
  isActive?: boolean;
  isNew?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-cyan-400/10 hover:text-cyan-200",
        isActive ? "bg-cyan-400/12 text-cyan-200" : "text-zinc-200",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{label}</span>
      {isNew ? (
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          New
        </span>
      ) : null}
    </Link>
  );
}

function CoursesMegaMenu({ isScrolled }: { isScrolled: boolean }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-cyan-400/10 hover:text-cyan-200",
          isScrolled ? "text-zinc-300" : "text-zinc-600",
        )}
      >
        Courses
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,820px)] -translate-x-1/2 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="rounded-2xl border border-cyan-400/20 bg-[#060c22]/95 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-3">
            {courseMegaMenu.map((section) => (
              <div key={section.category}>
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-cyan-300/80">
                  {section.category}
                </p>
                <div className="space-y-3">
                  {section.courses.map((course) => (
                    <Link
                      key={course.title}
                      href="/#courses"
                      className="block rounded-xl border border-cyan-400/15 bg-[#0d1430]/70 p-3 transition hover:border-cyan-300/40 hover:bg-[#111b3f]"
                    >
                      <p className="text-sm font-semibold text-white">
                        {course.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-400">
                        {course.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandPalette({
  open,
  query,
  setQuery,
  setOpen,
  filteredLinks,
}: {
  open: boolean;
  query: string;
  setQuery: (value: string) => void;
  setOpen: (value: boolean) => void;
  filteredLinks: { href: string; label: string }[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="w-full max-w-xl rounded-2xl border border-cyan-400/30 bg-[#070d24] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-[#0b1430] px-3 py-2">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search navigation"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl border border-cyan-400/10 bg-[#0a1128] px-4 py-3 text-sm text-zinc-200 transition hover:border-cyan-300/30 hover:bg-[#0d1736] hover:text-cyan-200"
              >
                <span className="inline-flex items-center gap-3">
                  <TerminalSquare className="h-4 w-4 text-cyan-300" />
                  {link.label}
                </span>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-cyan-400/20 px-4 py-6 text-center text-sm text-zinc-400">
              No navigation results for{" "}
              <span className="text-cyan-300">{query}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
