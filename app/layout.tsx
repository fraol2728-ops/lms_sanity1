import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StructuredData } from "@/components/seo/StructuredData";
import { ThemeProvider } from "@/providers/theme-provider";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://xybersec.com"),
  title: {
    default: "Xybersec | Cybersecurity Learning Platform",
    template: "%s | Xybersec",
  },
  description:
    "Learn cybersecurity with structured roadmaps: Red Team, Blue Team, Web Pentesting, Malware Development, Reverse Engineering.",
  keywords: [
    "cybersecurity",
    "ethical hacking",
    "penetration testing",
    "red team",
    "blue team",
    "malware development",
    "reverse engineering",
  ],
  openGraph: {
    title: "Xybersec",
    description: "Cybersecurity learning platform",
    url: "https://xybersec.com",
    siteName: "Xybersec",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xybersec",
    description: "Cybersecurity learning platform",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
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
  name: "Xybersec",
  url: "https://xybersec.com",
  logo: "https://xybersec.com/logo.png",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <StructuredData data={organizationSchema} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
