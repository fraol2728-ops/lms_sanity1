export const themeOptions = [
  {
    value: "light",
    label: "Light",
    shortcutLabel: "L",
  },
  {
    value: "dark",
    label: "Dark",
    shortcutLabel: "D",
  },
  {
    value: "system",
    label: "System",
    shortcutLabel: "S",
  },
] as const;

export type ThemeOption = (typeof themeOptions)[number]["value"];

export const glowTokenClass =
  "shadow-[0_0_24px_rgb(var(--primary)/0.28)] dark:shadow-[0_0_30px_rgb(var(--primary)/0.34)]";

export const heroGradientTokenClass =
  "bg-[radial-gradient(circle_at_18%_16%,rgb(var(--primary)/0.24),transparent_34%),radial-gradient(circle_at_82%_22%,rgb(var(--secondary)/0.22),transparent_38%),linear-gradient(180deg,rgb(var(--background)/0.65),rgb(var(--background)))]";
