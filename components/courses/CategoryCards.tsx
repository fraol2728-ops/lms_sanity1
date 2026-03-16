"use client";

import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryItem {
  id: string;
  title: string;
}

interface CategoryCardsProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categoryIcons = ["🕸", "🐧", "🌐", "🎯", "🛡️", "⚡", "🔐", "🧠"];

export function CategoryCards({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryCardsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {categories.map((category, index) => {
        const isActive = selectedCategory === category.title;

        return (
          <motion.button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.title)}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "rounded-2xl border p-5 text-left transition-all duration-300",
              "bg-zinc-900/70 backdrop-blur-sm",
              isActive
                ? "border-violet-400/70 shadow-lg shadow-violet-500/25"
                : "border-zinc-800 hover:scale-[1.01] hover:border-violet-500/60 hover:bg-violet-500/10 hover:shadow-[0_0_26px_rgba(139,92,246,0.28)]",
            )}
          >
            <div className="text-2xl" aria-hidden="true">
              {categoryIcons[index % categoryIcons.length] ?? "🛡️"}
            </div>
            <h3 className="mt-3 text-base font-semibold text-zinc-100">
              {category.title}
            </h3>
          </motion.button>
        );
      })}

      {categories.length === 0 && (
        <div className="col-span-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 text-sm text-zinc-400">
          <div className="inline-flex items-center gap-2">
            <Shield className="h-4 w-4" />
            No categories available yet.
          </div>
        </div>
      )}
    </motion.section>
  );
}
