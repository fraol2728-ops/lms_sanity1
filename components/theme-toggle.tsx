"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { type ThemeOption, themeOptions } from "@/lib/theme";
import { cn } from "@/lib/utils";

const iconMap = {
  light: Sun,
  dark: Moon,
  system: Laptop,
} as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleQuickThemeToggle = (event: KeyboardEvent) => {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== "j"
      ) {
        return;
      }

      event.preventDefault();

      const cycleOrder: ThemeOption[] = ["light", "dark", "system"];
      const currentTheme = (theme as ThemeOption) ?? "system";
      const currentIndex = cycleOrder.indexOf(currentTheme);
      const nextTheme = cycleOrder[(currentIndex + 1) % cycleOrder.length];
      setTheme(nextTheme);
    };

    window.addEventListener("keydown", handleQuickThemeToggle);
    return () => window.removeEventListener("keydown", handleQuickThemeToggle);
  }, [setTheme, theme]);

  const activeTheme = useMemo(
    () => (theme as ThemeOption) ?? "system",
    [theme],
  );

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn(
          "h-10 w-[216px] rounded-xl border border-border/80 bg-background/80",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-1 rounded-xl border border-border/70 bg-background/90 p-1 shadow-[0_0_20px_rgb(var(--primary)/0.16)] backdrop-blur",
        className,
      )}
    >
      {themeOptions.map((option) => {
        const Icon = iconMap[option.value];
        const isActive = activeTheme === option.value;
        const isCurrentSystem = option.value === "system" && resolvedTheme;

        return (
          <motion.button
            key={option.value}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setTheme(option.value)}
            className={cn(
              "relative z-10 inline-flex h-8 min-w-[66px] items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "text-foreground"
                : "text-foreground/70 hover:text-foreground",
            )}
            aria-pressed={isActive}
            aria-label={`Set ${option.label.toLowerCase()} theme`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{option.label}</span>
            {isCurrentSystem ? (
              <span className="sr-only">
                Current system mode: {resolvedTheme}
              </span>
            ) : null}
            <AnimatePresence>
              {isActive ? (
                <motion.span
                  layoutId="theme-active-bg"
                  className="absolute inset-0 -z-10 rounded-lg border border-primary/30 bg-primary/12"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    mass: 0.45,
                  }}
                />
              ) : null}
            </AnimatePresence>
            <AnimatePresence>
              {isActive ? (
                <motion.span
                  layoutId="theme-active-underline"
                  className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-primary"
                  transition={{ duration: 0.22 }}
                />
              ) : null}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
