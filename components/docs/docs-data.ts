export const docsSections = [
  {
    id: "getting-started",
    label: "Getting Started",
    eyebrow: "Overview",
    title: "Boot up your cyber training workspace",
    description:
      "Next Cyber Camp gives learners a focused, developer-style control panel for onboarding, exploration, and daily practice. The docs experience is designed to help teams ship structured cybersecurity learning journeys without overwhelming new recruits.",
    bullets: [
      "Launch guided learner onboarding in minutes.",
      "Organize security lessons, labs, and milestones by path.",
      "Keep documentation readable for beginners and operators alike.",
    ],
    code: `// app/(app)/docs/page.tsx\nexport default function DocsPage() {\n  return <DocsLayout />;\n}`,
    note: "Use the docs hub as a central reference for learners, instructors, and internal enablement teams.",
  },
  {
    id: "installation",
    label: "Installation",
    eyebrow: "Setup",
    title: "Prepare the learning platform interface",
    description:
      "The UI ships with a dark, distraction-free reading surface and reusable components powered by Next.js App Router, Tailwind CSS, and shadcn/ui. This page intentionally keeps everything front-end only so backend integrations can be layered in later.",
    bullets: [
      "Keep the interface modular with isolated docs components.",
      "Reuse motion patterns for navigation, search, and content transitions.",
      "Maintain a polished experience across desktop and mobile breakpoints.",
    ],
    code: `npm install\nnpm run dev\n# open /docs to review the documentation UI`,
    note: "Backend search, analytics, and content persistence are intentionally deferred until the UI contract is finalized.",
  },
  {
    id: "courses",
    label: "Courses",
    eyebrow: "Catalog",
    title: "Structure curriculum like a product manual",
    description:
      "Present courses as clearly segmented docs chapters. Learners should be able to move from platform orientation into hands-on modules with the same confidence they expect from modern developer documentation.",
    bullets: [
      "Break courses into mission-ready sections and prerequisites.",
      "Surface examples, command snippets, and policy notes inline.",
      "Guide users toward the next lesson without visual clutter.",
    ],
    code: `<CourseCard\n  title="Network Defense Fundamentals"\n  level="Beginner"\n  modules={8}\n/>`,
    note: "Treat every course module as a documented workflow: concise, skimmable, and action-oriented.",
  },
  {
    id: "progress-tracking",
    label: "Progress Tracking",
    eyebrow: "Insights",
    title: "Show momentum with clear progress cues",
    description:
      "Learners stay engaged when milestones are visible. The docs layout demonstrates how to combine narrative guidance with compact status components so progress feels immediate and measurable.",
    bullets: [
      "Pair explanatory copy with progress summaries.",
      "Use supportive callouts for checkpoint rules and completion criteria.",
      "Keep metrics legible on small screens with stacked cards and restrained widths.",
    ],
    code: `const progress = {\n  completedLessons: 18,\n  activePath: "Blue Team Foundations",\n  streak: 6,\n};`,
    note: "Readable status surfaces are more effective than dense dashboards when users need to act quickly.",
  },
  {
    id: "achievements",
    label: "Achievements",
    eyebrow: "Recognition",
    title: "Celebrate milestones without distracting from learning",
    description:
      "Achievement callouts should feel premium, not noisy. Use soft borders, subtle gradients, and sparse iconography to reward learners while preserving the calm tone of a documentation-first experience.",
    bullets: [
      "Promote mastery badges near relevant milestones.",
      "Tie reward messaging to concrete learner outcomes.",
      "Keep recognition components accessible in both compact and expanded layouts.",
    ],
    code: `awardBadge({\n  label: "Threat Hunter I",\n  unlocked: true,\n  earnedAt: "Week 2",\n});`,
    note: "Achievement language should reinforce progression and capability, not just gamification.",
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    eyebrow: "Competition",
    title: "Encourage healthy competition with transparent rules",
    description:
      "Leaderboards work best when expectations are explicit. Use accompanying docs content to explain scoring, tie-breakers, and fairness rules so learners understand how they advance.",
    bullets: [
      "Document the ranking logic in plain language.",
      "Use notes to clarify security challenge scoring windows.",
      "Keep the interface motivational while avoiding excessive visual noise.",
    ],
    code: `rankingScore = challengePoints + streakBonus + collaborationCredits;`,
    note: "A leaderboard should motivate consistent effort, not create ambiguity around how points are earned.",
  },
] as const;

export type DocsSection = (typeof docsSections)[number];
