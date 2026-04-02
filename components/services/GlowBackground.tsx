import { cn } from "@/lib/utils";

interface GlowBackgroundProps {
  className?: string;
}

export function GlowBackground({ className }: GlowBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full bg-cyan-400/30 blur-3xl",
        className,
      )}
    />
  );
}
