"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, Search, Shield, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/#courses", label: "Courses" },
  { href: "/#paths", label: "Paths" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#community", label: "Community" },
  { href: "/#docs", label: "Docs" },
];

const courseCategories = [
  "Web Security",
  "Network Security",
  "Linux Security",
  "Red Team",
];

const learningPaths = [
  "Web Pentester",
  "Red Team Operator",
  "Bug Bounty Hunter",
  "Linux Hacker",
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-emerald-400/10 transition-all duration-200",
        isScrolled ? "bg-[#0B0F19]/90 backdrop-blur-xl" : "bg-[#0B0F19]",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-[#111827] shadow-[0_0_24px_rgba(0,255,156,0.1)] transition group-hover:border-emerald-400/50">
            <Shield className="h-5 w-5 text-[#22C55E]" />
          </span>
          <div className="leading-tight">
            <p className="text-sm text-zinc-400">Next</p>
            <p className="text-base font-semibold text-white">
              Cyber <span className="text-[#00FF9C]">Camp</span>
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <MegaMenu
            label="Courses"
            items={courseCategories}
            baseHref="/#courses"
          />
          <MegaMenu label="Paths" items={learningPaths} baseHref="/#paths" />
          {primaryLinks.slice(2).map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="text-zinc-300 hover:bg-emerald-400/10 hover:text-[#00FF9C]"
          >
            <Search className="h-4 w-4" />
          </Button>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-zinc-300 hover:bg-emerald-400/10 hover:text-[#00FF9C]"
              >
                Sign In
              </Button>
            </SignInButton>
            <Link href="/pricing">
              <Button className="bg-[#22C55E] font-semibold text-black hover:bg-[#00FF9C]">
                Get Started
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-emerald-400/30 bg-transparent text-zinc-100 hover:bg-emerald-400/10 hover:text-[#00FF9C]"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-1 ring-emerald-400/40",
                },
              }}
            />
          </SignedIn>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-300 hover:bg-emerald-400/10 hover:text-[#00FF9C] md:hidden"
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
          "overflow-hidden border-t border-emerald-400/10 bg-[#0B0F19]/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-[70vh]" : "max-h-0 border-transparent",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm text-zinc-200 transition hover:bg-emerald-400/10 hover:text-[#00FF9C]"
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-emerald-400/10" />

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-200 hover:bg-emerald-400/10 hover:text-[#00FF9C]"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard" className="block">
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-200 hover:bg-emerald-400/10 hover:text-[#00FF9C]"
              >
                Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-emerald-400/10 hover:text-[#00FF9C]"
    >
      {label}
    </Link>
  );
}

function MegaMenu({
  label,
  items,
  baseHref,
}: {
  label: string;
  items: string[];
  baseHref: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-md px-3 py-2 text-sm font-normal text-zinc-300 hover:bg-emerald-400/10 hover:text-[#00FF9C]"
        >
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 border-emerald-400/20 bg-[#111827] text-zinc-100"
      >
        {items.map((item) => (
          <DropdownMenuItem key={item} asChild>
            <Link
              href={baseHref}
              className="cursor-pointer focus:bg-emerald-400/10 focus:text-[#00FF9C]"
            >
              {item}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
