"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  LayoutDashboard,
  Medal,
  Menu,
  NotebookPen,
  Route,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Learning Paths", href: "/dashboard", icon: Route },
  { label: "Achievements", href: "/dashboard", icon: Award },
  { label: "Leaderboard", href: "/leaderboard", icon: Medal },
  { label: "Notes", href: "/notes", icon: NotebookPen },
  { label: "Settings", href: "/dashboard", icon: Settings },
];

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-20 z-40 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-[#08131f] text-cyan-300 lg:hidden"
        onClick={() => setOpen((state) => !state)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
        />
      )}

      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed left-0 top-0 z-40 h-screen w-72 border-r border-cyan-500/20 bg-[#060b14]/95 p-6 backdrop-blur-xl transition-transform lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400/80">
            Next XyberSec
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Command Center
          </h2>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm text-zinc-300 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
