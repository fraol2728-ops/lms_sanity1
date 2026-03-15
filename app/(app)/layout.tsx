import { SanityLive } from "@/sanity/lib/live";
import { ClientClerkProvider } from "@/components/providers/clerk-provider";
import { TutorWidget } from "@/components/tutor";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientClerkProvider>
      <div>{children}</div>
      <SanityLive />
      <TutorWidget />
    </ClientClerkProvider>
  );
}

export default AppLayout;
