"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEffect } from "react";
import type { AchievementDefinition } from "@/components/achievements/achievement-data";
import { Button } from "@/components/ui/button";

interface AchievementPopupProps {
  achievement: AchievementDefinition | null;
  open: boolean;
  onClose: () => void;
}

export function AchievementPopup({
  achievement,
  open,
  onClose,
}: AchievementPopupProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = window.setTimeout(() => {
      onClose();
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && achievement ? (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.97 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-50 w-[min(92vw,380px)] rounded-3xl border border-cyan-400/40 bg-[linear-gradient(160deg,rgba(7,17,31,0.98),rgba(10,31,54,0.94))] p-5 text-white shadow-[0_0_40px_rgba(34,211,238,0.28)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_44%)]" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
              <achievement.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
                Achievement Unlocked
              </p>
              <h4 className="mt-2 text-lg font-semibold">
                {achievement.title}
              </h4>
              <p className="mt-2 text-sm text-zinc-300">
                {achievement.description}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" /> Badge added to your
                dashboard
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
