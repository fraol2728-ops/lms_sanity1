"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Web Security", icon: "🕸" },
  { name: "Linux", icon: "🐧" },
  { name: "Network Security", icon: "🌐" },
  { name: "Bug Bounty", icon: "🎯" },
] as const;

interface CategoryCardsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryCards({
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
      {categories.map((category) => {
        const isActive = selectedCategory === category.name;

        return (
          <motion.button
            key={category.name}
            type="button"
            onClick={() => onSelectCategory(category.name)}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "rounded-2xl border p-5 text-left transition-all duration-300",
              "bg-zinc-900/70 backdrop-blur-sm",
              isActive
                ? "border-violet-400/70 shadow-lg shadow-violet-500/25"
                : "border-zinc-800 hover:border-violet-500/50 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20",
            )}
          >
            <div className="text-2xl" aria-hidden="true">
              {category.icon}
            </div>
            <h3 className="mt-3 text-base font-semibold text-zinc-100">
              {category.name}
            </h3>
          </motion.button>
        );
      })}
    </motion.section>
  );
}
