import { buildMetadata } from "@/lib/seo";
import { PathsPageClient } from "./PathsPageClient";

export const metadata = buildMetadata({
  title: "Learning Paths",
  description:
    "Follow Dev Fraol Academy learning paths for cybersecurity, ethical hacking, Linux, and networking training in Ethiopia.",
  path: "/paths",
  keywords: ["learn Linux Ethiopia", "ethical hacking Ethiopia"],
});

export default function PathsPage() {
  return <PathsPageClient />;
}
