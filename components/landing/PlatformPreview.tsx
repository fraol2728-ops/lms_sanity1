"use client";

import { motion } from "framer-motion";
import { Play, Terminal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./animations";

const TERMINAL_COLUMNS = [
  {
    label: "Threat hunting",
    prompt: "analyst@nextcc:~$",
    commands: [
      "ssh lab@siem-gateway",
      "sudo systemctl status elasticsearch",
      "journalctl -u wazuh-manager -n 25",
      "sudo tcpdump -ni eth0 port 443",
      "nmap -sV -Pn 10.10.24.18",
    ],
  },
  {
    label: "Red team ops",
    prompt: "operator@nextcc:~$",
    commands: [
      "tmux attach -t engagement-alpha",
      "ffuf -u https://target.tld/FUZZ -w wordlist.txt",
      "sqlmap -u https://target.tld/login --batch",
      "hydra -L users.txt -P rockyou.txt ssh://10.10.24.22",
      "msfconsole -q -x 'use exploit/multi/handler'",
    ],
  },
] as const;

const PREVIEW_VIDEO = {
  title: "Platform walkthrough",
  description:
    "A guided walkthrough of the learning platform using your provided YouTube demo.",
  embedUrl: "https://www.youtube-nocookie.com/embed/B6dZWe7eOpA?rel=0",
};

function useAutoTyping(
  commands: readonly string[],
  typingSpeed = 52,
  pause = 1400,
) {
  const [commandIndex, setCommandIndex] = useState(0);
  const [typedValue, setTypedValue] = useState("");

  useEffect(() => {
    const currentCommand = commands[commandIndex] ?? "";

    if (typedValue.length < currentCommand.length) {
      const timeoutId = window.setTimeout(() => {
        setTypedValue(currentCommand.slice(0, typedValue.length + 1));
      }, typingSpeed);

      return () => window.clearTimeout(timeoutId);
    }

    const timeoutId = window.setTimeout(() => {
      setTypedValue("");
      setCommandIndex((currentIndex) => (currentIndex + 1) % commands.length);
    }, pause);

    return () => window.clearTimeout(timeoutId);
  }, [commandIndex, commands, pause, typedValue, typingSpeed]);

  return typedValue;
}

function TerminalPanel({
  label,
  prompt,
  commands,
  lang,
}: {
  label: string;
  prompt: string;
  commands: readonly string[];
  lang: "en" | "ar";
}) {
  const typedCommand = useAutoTyping(commands);
  const history = useMemo(() => {
    const activeIndex = commands.findIndex((command) =>
      command.startsWith(typedCommand),
    );
    const safeIndex = activeIndex >= 0 ? activeIndex : 0;

    return commands.slice(Math.max(0, safeIndex - 2), safeIndex);
  }, [commands, typedCommand]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#081127]/85 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_45%),linear-gradient(180deg,rgba(8,17,39,0.95),rgba(5,10,24,1))]" />
      <div className="relative border-b border-cyan-400/15 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-100/80">
              <Terminal className="h-4 w-4" />
              {label}
            </div>
          </div>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-200/80">
            {lang === "ar" ? "طرفية لينكس" : "Linux terminal"}
          </span>
        </div>
      </div>

      <div className="relative space-y-3 px-5 py-6 font-mono text-sm leading-7 text-cyan-100/85 sm:text-[15px]">
        {history.map((command) => (
          <div
            key={command}
            className="flex flex-wrap gap-x-3 text-cyan-100/55"
          >
            <span className="text-cyan-300">{prompt}</span>
            <span>{command}</span>
          </div>
        ))}

        <div className="flex min-h-14 flex-wrap gap-x-3 text-cyan-50">
          <span className="text-cyan-300">{prompt}</span>
          <span>
            {typedCommand}
            <motion.span
              className="ml-0.5 inline-block h-5 w-2 bg-cyan-300 align-middle"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </span>
        </div>

        <div className="grid gap-3 border-t border-cyan-400/10 pt-4 text-xs text-cyan-100/45 sm:grid-cols-2 sm:text-sm">
          <div>Ubuntu 24.04 LTS · zsh · secured workspace</div>
          <div className={cn(lang === "ar" ? "sm:text-left" : "sm:text-right")}>
            {lang === "ar"
              ? "محاكاة أوامر مباشرة · تدوير تلقائي"
              : "Live command simulation · auto rotating"}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlatformPreview() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <>
      <AnimatedSection className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
            {t.aboutTitle}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {lang === "ar"
              ? "سير عمل لينكس مصمم لعمليات الأمن السيبراني"
              : "Linux workflow built for cyber ops"}
          </h2>
          {/* <p className="mt-4 text-base text-zinc-300 sm:text-lg">
            Replace the old dashboard cards with a more immersive lab feel: two
            animated {lang === "ar" ? "طرفية لينكس" : "Linux terminal"}s running rotating commands side by side.
          </p> */}
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {TERMINAL_COLUMNS.map((terminal, index) => (
            <motion.div
              key={terminal.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
                delay: index * 0.12,
              }}
            >
              <TerminalPanel {...terminal} lang={lang} />
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
            {lang === "ar" ? "معاينة" : "Preview"}
          </p>
          {/* <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Watch the platform in action
          </h2>
          <p className="mt-4 text-base text-zinc-300 sm:text-lg">
            A full-width 16:9 video area sits directly below the terminal demo
            for walkthroughs, onboarding, or course promotion.
          </p> */}
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#081127]/80 shadow-[0_0_45px_rgba(34,211,238,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-400/15 px-6 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
                {PREVIEW_VIDEO.title}
              </p>
              <p className="mt-2 text-sm text-zinc-300 sm:text-base">
                {PREVIEW_VIDEO.description}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              <Play className="h-4 w-4" />
              {/* 16:9 Full Width */}
            </div>
          </div>

          <div className="relative aspect-video w-full bg-black">
            <iframe
              className="h-full w-full"
              src={PREVIEW_VIDEO.embedUrl}
              title={PREVIEW_VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
