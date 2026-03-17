import type { Metadata } from "next";
import "./globals.css";

const siteName = "Next Cyber Camp";
const siteUrl = "https://nextcybercamp.com";
const defaultTitle = `${siteName} | Cybersecurity LMS`;
const defaultDescription =
  "Next Cyber Camp is a hands-on cybersecurity LMS with structured courses, guided learning paths, and practical labs for aspiring ethical hackers.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "cybersecurity LMS",
    "ethical hacking courses",
    "penetration testing training",
    "cybersecurity learning paths",
    "Next Cyber Camp",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Next Cyber Camp logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/icon.svg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
