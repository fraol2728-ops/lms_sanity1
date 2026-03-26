import { Header } from "@/components/Header";
import { ClientClerkProvider } from "@/components/providers/clerk-provider";
import { TutorWidget } from "@/components/tutor";
import { SanityLive } from "@/sanity/lib/live";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientClerkProvider>
      <Header />
      <div className="pt-20">{children}</div>
      <SanityLive />
      <TutorWidget />
    </ClientClerkProvider>
  );
}

export default AppLayout;
