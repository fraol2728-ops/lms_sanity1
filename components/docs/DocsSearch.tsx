"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function DocsSearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-full"
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <Input
        type="search"
        placeholder="Search documentation..."
        aria-label="Search documentation"
        className="h-12 rounded-2xl border-white/10 bg-white/5 pl-11 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-cyan-400/40"
      />
    </motion.div>
  );
}
