export interface AcademyLesson {
  slug: string;
  title: string;
  description: string;
  duration: string;
  notes: string[];
  resources: string[];
  tasks: string[];
}

export interface AcademyModule {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  lessons: AcademyLesson[];
}

export interface AcademyCourse {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  location: string;
  cohort: string;
  format: string;
  modules: AcademyModule[];
}

export const academyCourses: AcademyCourse[] = [
  {
    slug: "red-team-bootcamp",
    title: "Red Team Bootcamp",
    description:
      "An immersive physical training program focused on offensive security drills, operator workflows, and live collaborative breach simulations.",
    duration: "5-day on-site intensive",
    level: "Intermediate to Advanced",
    location: "Austin Cyber Range, Texas",
    cohort: "24 seats per cohort",
    format: "In-person lab + instructor-led workshops",
    modules: [
      {
        slug: "mission-planning",
        title: "Module 01 · Mission Planning",
        summary:
          "Build an operator mindset, define objectives, and structure safe engagement plans for physical academy exercises.",
        duration: "Half day",
        lessons: [
          {
            slug: "engagement-briefing",
            title: "Engagement Briefing",
            description:
              "Set scope, rules of engagement, and reporting expectations before entering the live training environment.",
            duration: "45 min",
            notes: [
              "Translate training objectives into measurable red team outcomes.",
              "Map attack paths, escalation thresholds, and exercise communication roles.",
              "Prepare field notebooks for evidence capture and rapid debriefs.",
            ],
            resources: [
              "Mission briefing template",
              "Rules of engagement checklist",
              "Operator field note worksheet",
            ],
            tasks: [
              "Draft a one-page exercise brief for your assigned scenario.",
              "Define success metrics for reconnaissance, access, and reporting.",
            ],
          },
          {
            slug: "range-safety-and-comms",
            title: "Range Safety & Comms",
            description:
              "Learn movement protocols, team communication patterns, and escalation etiquette inside the physical cyber range.",
            duration: "35 min",
            notes: [
              "Use structured callouts during drills to reduce confusion.",
              "Synchronize team roles across recon, exploit, and documentation functions.",
              "Maintain safety boundaries around hardware stations and live network pods.",
            ],
            resources: [
              "Comms shorthand reference",
              "Range floor map",
              "Incident escalation matrix",
            ],
            tasks: [
              "Create a team communication matrix for a four-person squad.",
              "Walk through a mock escalation using the onsite safety protocol.",
            ],
          },
        ],
      },
      {
        slug: "initial-access",
        title: "Module 02 · Initial Access Lab",
        summary:
          "Practice reconnaissance and entry workflows against realistic enterprise lab targets with instructor guidance.",
        duration: "2 days",
        lessons: [
          {
            slug: "physical-recon-playbook",
            title: "Physical Recon Playbook",
            description:
              "Combine onsite observation, badge flow analysis, and digital recon to support a controlled offensive operation.",
            duration: "60 min",
            notes: [
              "Observe personnel flow, device posture, and environmental indicators.",
              "Pair physical observations with asset enumeration hypotheses.",
              "Document recon findings as assumptions to validate in the lab.",
            ],
            resources: [
              "Recon observation board",
              "Target profiling worksheet",
              "Sample recon report",
            ],
            tasks: [
              "Build a recon package for a mock office scenario.",
              "Present two likely initial access vectors supported by evidence.",
            ],
          },
          {
            slug: "operator-execution-lab",
            title: "Operator Execution Lab",
            description:
              "Execute guided access chains in a supervised lab, then compare techniques during instructor-led hotwash sessions.",
            duration: "90 min",
            notes: [
              "Move from recon to exploitation with tight logging discipline.",
              "Record decision points that affected timing or stealth.",
              "Compare alternative access paths after each run.",
            ],
            resources: [
              "Execution timeline template",
              "Hotwash reflection prompts",
              "Technique comparison sheet",
            ],
            tasks: [
              "Complete one initial access chain and log every decision point.",
              "Recommend one operational improvement during the hotwash.",
            ],
          },
        ],
      },
      {
        slug: "capstone-day",
        title: "Module 03 · Capstone Operation",
        summary:
          "Work through a full-team capstone blending planning, execution, and debriefing in a final academy scenario.",
        duration: "2.5 days",
        lessons: [
          {
            slug: "team-capstone",
            title: "Team Capstone",
            description:
              "A collaborative onsite operation where squads execute a full scenario and deliver a professional findings brief.",
            duration: "Half day",
            notes: [
              "Coordinate responsibilities across multiple moving parts in real time.",
              "Capture evidence that supports a concise executive narrative.",
              "Focus on tradeoffs between speed, stealth, and reliability.",
            ],
            resources: [
              "Executive briefing deck outline",
              "Evidence tagging checklist",
              "Post-operation review template",
            ],
            tasks: [
              "Deliver a five-minute operation summary to instructors.",
              "Submit a prioritized remediation narrative from the red team perspective.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "blue-team-field-lab",
    title: "Blue Team Field Lab",
    description:
      "A hands-on defensive academy for SOC analysts and incident responders who want practical, physical classroom-based drills.",
    duration: "4-day in-person lab series",
    level: "Beginner to Intermediate",
    location: "Denver Security Operations Hub, Colorado",
    cohort: "30 seats per cohort",
    format: "Workshop + tabletop + guided response simulations",
    modules: [
      {
        slug: "soc-foundations",
        title: "Module 01 · SOC Foundations",
        summary:
          "Establish shared workflows for detection, triage, and physical classroom coordination.",
        duration: "1 day",
        lessons: [
          {
            slug: "analyst-workstation-setup",
            title: "Analyst Workstation Setup",
            description:
              "Prepare your workspace, dashboards, and communication channels for responsive onsite blue team drills.",
            duration: "40 min",
            notes: [
              "Organize panels for alert flow, context, and escalation history.",
              "Align naming conventions and shift handoff expectations.",
              "Create quick reference notes for common alert types.",
            ],
            resources: [
              "SOC workstation checklist",
              "Shift handoff template",
              "Alert labeling guide",
            ],
            tasks: [
              "Configure a triage-ready workstation layout.",
              "Document a shift handoff note for the next analyst.",
            ],
          },
        ],
      },
      {
        slug: "incident-response-drills",
        title: "Module 02 · Incident Response Drills",
        summary:
          "Respond to escalating scenarios through guided, team-based exercises with live coaching.",
        duration: "2 days",
        lessons: [
          {
            slug: "triage-under-pressure",
            title: "Triage Under Pressure",
            description:
              "Practice alert prioritization and concise communication while the scenario evolves in real time.",
            duration: "55 min",
            notes: [
              "Sort signals from noise using repeatable investigation steps.",
              "Escalate clearly with evidence and confidence levels.",
              "Keep a running timeline for later incident reconstruction.",
            ],
            resources: [
              "Incident timeline worksheet",
              "Triage decision tree",
              "Escalation note examples",
            ],
            tasks: [
              "Process a queue of simulated alerts and justify your prioritization.",
              "Write a concise escalation note for one high-severity event.",
            ],
          },
          {
            slug: "tabletop-debrief",
            title: "Tabletop Debrief",
            description:
              "Turn live response observations into better process design through a structured post-incident discussion.",
            duration: "45 min",
            notes: [
              "Highlight workflow bottlenecks that slowed containment.",
              "Separate tool limitations from analyst decision issues.",
              "Assign concrete follow-up actions for future drills.",
            ],
            resources: [
              "Debrief facilitation sheet",
              "Lessons learned matrix",
              "Follow-up action tracker",
            ],
            tasks: [
              "Capture three lessons learned from the scenario.",
              "Propose one workflow change that improves mean time to triage.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ot-security-residency",
    title: "OT Security Residency",
    description:
      "A specialized academy experience for protecting industrial and operational environments through physical classroom instruction and lab exercises.",
    duration: "3-day residency",
    level: "Advanced",
    location: "Phoenix Industrial Lab, Arizona",
    cohort: "18 seats per cohort",
    format: "Residency workshop + equipment walkthroughs",
    modules: [
      {
        slug: "ot-systems-context",
        title: "Module 01 · OT Systems Context",
        summary:
          "Understand the constraints, safety expectations, and communication rhythms of operational technology environments.",
        duration: "1 day",
        lessons: [
          {
            slug: "site-context-mapping",
            title: "Site Context Mapping",
            description:
              "Map physical zones, process dependencies, and human roles before evaluating defensive controls.",
            duration: "50 min",
            notes: [
              "Identify the people, equipment, and process impacts tied to each zone.",
              "Document where security control changes require operational approval.",
              "Build a context map that supports both engineers and security staff.",
            ],
            resources: [
              "Facility context canvas",
              "Stakeholder interview prompts",
              "Zone dependency worksheet",
            ],
            tasks: [
              "Create a context map for the sample facility floor plan.",
              "List the operational constraints that would shape monitoring changes.",
            ],
          },
        ],
      },
      {
        slug: "defensive-controls",
        title: "Module 02 · Defensive Controls Workshop",
        summary:
          "Analyze practical segmentation, monitoring, and response workflows for industrial systems.",
        duration: "2 days",
        lessons: [
          {
            slug: "segmentation-design-review",
            title: "Segmentation Design Review",
            description:
              "Evaluate a realistic plant network layout and propose safer segmentation strategies without disrupting process uptime.",
            duration: "70 min",
            notes: [
              "Balance resilience, access needs, and response visibility.",
              "Identify where segmentation changes would create operational friction.",
              "Present layered controls instead of single-point fixes.",
            ],
            resources: [
              "Plant network blueprint",
              "Segmentation review rubric",
              "Control layering worksheet",
            ],
            tasks: [
              "Recommend a revised zone architecture for the sample plant.",
              "Explain how your design reduces risk while preserving uptime.",
            ],
          },
        ],
      },
    ],
  },
];

export function getAcademyCourses() {
  return academyCourses;
}

export function getAcademyCourseBySlug(slug: string) {
  return academyCourses.find((course) => course.slug === slug);
}

export function getAcademyLesson(courseSlug: string, lessonSlug: string) {
  const course = getAcademyCourseBySlug(courseSlug);

  if (!course) {
    return null;
  }

  for (const module of course.modules) {
    const lesson = module.lessons.find((item) => item.slug === lessonSlug);

    if (lesson) {
      return {
        course,
        module,
        lesson,
      };
    }
  }

  return null;
}
