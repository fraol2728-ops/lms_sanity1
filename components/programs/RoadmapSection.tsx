"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { PathCard } from "./PathCard";
import type { CareerPath, ProgramCourse } from "./types";

const PathDetails = dynamic(() => import("./PathDetails"), {
  loading: () => (
    <div className="rounded-3xl border border-white/10 bg-[#11111c] p-7 text-sm text-zinc-400">
      Loading roadmap details...
    </div>
  ),
});

const CAREER_PATHS: CareerPath[] = [
  {
    id: "red-team",
    title: "Red Team",
    description:
      "Master offensive operations, adversary simulation, and exploit chains.",
    difficulty: "Advanced",
    icon: "🎯",
    accent: "bg-red-500",
    categoryKeywords: [
      "red",
      "offensive",
      "penetration",
      "ethical hacking",
      "web",
    ],
    phases: [
      {
        id: "rt-fund",
        title: "Fundamentals",
        objective: "Build security mindset and attack lifecycle basics.",
      },
      {
        id: "rt-net",
        title: "Networking",
        objective: "Understand packet flows, protocols, and pivoting routes.",
      },
      {
        id: "rt-linux",
        title: "Linux",
        objective: "Operate confidently in Linux systems and shell automation.",
      },
      {
        id: "rt-enum",
        title: "Enumeration",
        objective: "Enumerate targets with precision and stealth.",
      },
      {
        id: "rt-exploit",
        title: "Exploitation",
        objective: "Use exploit techniques for real-world vulnerabilities.",
      },
      {
        id: "rt-privesc",
        title: "Privilege Escalation",
        objective: "Escalate and maintain access ethically in labs.",
      },
    ],
  },
  {
    id: "blue-team",
    title: "Blue Team",
    description:
      "Detect, respond, and harden infrastructures against active threats.",
    difficulty: "Intermediate",
    icon: "🛡️",
    accent: "bg-blue-500",
    categoryKeywords: ["blue", "defense", "soc", "monitor", "incident"],
    phases: [
      {
        id: "bt-fund",
        title: "Security Fundamentals",
        objective: "Understand defensive security principles and controls.",
      },
      {
        id: "bt-telemetry",
        title: "Log & Telemetry",
        objective: "Collect and normalize endpoint and network signals.",
      },
      {
        id: "bt-siem",
        title: "SIEM Operations",
        objective: "Build detections and triage alerts effectively.",
      },
      {
        id: "bt-incident",
        title: "Incident Response",
        objective: "Contain, eradicate, and recover from incidents.",
      },
      {
        id: "bt-hardening",
        title: "System Hardening",
        objective: "Reduce attack surface in cloud and on-prem systems.",
      },
      {
        id: "bt-threat",
        title: "Threat Hunting",
        objective: "Proactively identify adversary behavior patterns.",
      },
    ],
  },
  {
    id: "web-pentesting",
    title: "Web Penetration Testing",
    description:
      "Exploit modern web applications from recon to secure reporting.",
    difficulty: "Intermediate",
    icon: "🌐",
    accent: "bg-purple-500",
    categoryKeywords: ["web", "application", "api", "pentest"],
    phases: [
      {
        id: "wp-http",
        title: "HTTP & Browser Basics",
        objective: "Understand request/response behavior and attack vectors.",
      },
      {
        id: "wp-auth",
        title: "Auth & Session Attacks",
        objective: "Assess identity, session, and authorization logic.",
      },
      {
        id: "wp-injection",
        title: "Injection",
        objective: "Test for SQLi, command injection, and template flaws.",
      },
      {
        id: "wp-broken",
        title: "Broken Access Control",
        objective: "Find privilege bypasses and object-level flaws.",
      },
      {
        id: "wp-api",
        title: "API Security",
        objective: "Evaluate token, rate-limit, and business logic abuse.",
      },
      {
        id: "wp-report",
        title: "Reporting",
        objective: "Create clear, reproducible remediation-focused reports.",
      },
    ],
  },
  {
    id: "reverse-engineering",
    title: "Reverse Engineering",
    description:
      "Analyze binaries, understand internals, and dissect malicious behavior.",
    difficulty: "Advanced",
    icon: "🧬",
    accent: "bg-fuchsia-500",
    categoryKeywords: ["reverse", "binary", "malware", "assembly"],
    phases: [
      {
        id: "re-arch",
        title: "Computer Architecture",
        objective: "Map memory, CPU execution, and low-level operations.",
      },
      {
        id: "re-asm",
        title: "Assembly Language",
        objective: "Read and reason about assembly control flow.",
      },
      {
        id: "re-static",
        title: "Static Analysis",
        objective: "Extract functionality without executing unknown binaries.",
      },
      {
        id: "re-dynamic",
        title: "Dynamic Analysis",
        objective: "Trace behavior with debuggers and runtime hooks.",
      },
      {
        id: "re-unpack",
        title: "Unpacking Techniques",
        objective: "Bypass obfuscation and packed binary protections.",
      },
      {
        id: "re-report",
        title: "Analysis Reporting",
        objective: "Communicate findings and indicators of compromise.",
      },
    ],
  },
  {
    id: "malware-development",
    title: "Malware Development",
    description:
      "Study adversary tradecraft to better defend against malware campaigns.",
    difficulty: "Advanced",
    icon: "🧪",
    accent: "bg-cyan-500",
    categoryKeywords: ["malware", "payload", "reverse", "windows", "linux"],
    phases: [
      {
        id: "md-opsec",
        title: "Offensive OPSEC",
        objective: "Understand safe research workflow and legal boundaries.",
      },
      {
        id: "md-loaders",
        title: "Payload & Loaders",
        objective: "Analyze staged payload concepts in lab settings.",
      },
      {
        id: "md-evasion",
        title: "Evasion Strategies",
        objective: "Study evasive techniques to improve detections.",
      },
      {
        id: "md-c2",
        title: "C2 Concepts",
        objective:
          "Learn command-and-control architecture and traffic patterns.",
      },
      {
        id: "md-persistence",
        title: "Persistence",
        objective: "Understand long-term foothold mechanisms.",
      },
      {
        id: "md-detection",
        title: "Detection Engineering",
        objective: "Translate tradecraft into robust detections.",
      },
    ],
  },
];

interface RoadmapSectionProps {
  courses: ProgramCourse[];
}

export function RoadmapSection({ courses }: RoadmapSectionProps) {
  const [selectedPathId, setSelectedPathId] = useState(CAREER_PATHS[0].id);

  const selectedPath = useMemo(
    () =>
      CAREER_PATHS.find((path) => path.id === selectedPathId) ??
      CAREER_PATHS[0],
    [selectedPathId],
  );

  return (
    <section id="roadmaps" className="space-y-6">
      <div>
        <h2 className="font-mono text-2xl font-semibold text-white sm:text-3xl">
          Choose your cybersecurity career path
        </h2>
        <p className="mt-2 max-w-4xl text-zinc-300">
          Progress through structured phases with practical lessons mapped to
          each specialization.
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
        {CAREER_PATHS.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
          >
            <PathCard
              path={path}
              isSelected={selectedPath.id === path.id}
              onSelect={setSelectedPathId}
            />
          </motion.div>
        ))}
      </div>

      <PathDetails path={selectedPath} courses={courses} />
    </section>
  );
}
