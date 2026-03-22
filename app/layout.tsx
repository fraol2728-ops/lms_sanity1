import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildMetadata, siteConfig } from "@/lib/seo";
import "./globals.css";

const defaultTitle = `${siteConfig.name} | Cybersecurity LMS in Ethiopia`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  category: "education",
  ...buildMetadata({
    title: defaultTitle,
    description: siteConfig.description,
    path: "/",
    keywords: siteConfig.keywords,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.ico"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: ["Fraol Academy", "DevFraol Academy"],
  description: siteConfig.description,
  url: siteConfig.url,
  founder: siteConfig.creator,
  areaServed: ["Ethiopia", "Addis Ababa"],
  knowsAbout: siteConfig.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StructuredData data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
