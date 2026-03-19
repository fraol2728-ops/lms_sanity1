"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { AchievementCard } from "@/components/achievements/AchievementCard";
import {
  type AchievementRecord,
  achievementDefinitions,
  achievementEventName,
} from "@/components/achievements/achievement-data";
import { getStoredAchievements } from "@/components/achievements/achievements-storage";

export function AchievementsList() {
  const [records, setRecords] = useState<AchievementRecord[]>([]);

  useEffect(() => {
    const syncAchievements = () => {
      setRecords(getStoredAchievements());
    };

    syncAchievements();
    window.addEventListener("storage", syncAchievements);
    window.addEventListener(achievementEventName, syncAchievements);

    return () => {
      window.removeEventListener("storage", syncAchievements);
      window.removeEventListener(achievementEventName, syncAchievements);
    };
  }, []);

  const recordsById = useMemo(
    () => new Map(records.map((record) => [record.id, record])),
    [records],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {achievementDefinitions.map((achievement, index) => {
        const record = recordsById.get(achievement.id);
        return (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            unlocked={!!record}
            unlockedAt={record?.unlockedAt}
            index={index}
          />
        );
      })}
    </motion.div>
  );
}
