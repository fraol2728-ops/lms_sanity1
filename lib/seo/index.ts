import type { Metadata } from "next";

export const siteConfig = {
  name: "Xybersec",
  shortName: "Xybersec",
  creator: "Xybersec",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://xybersec.com",
  locale: "en_US",
  description:
    "Learn cybersecurity with structured roadmaps: Red Team, Blue Team, Web Pentesting, Malware Development, Reverse Engineering.",
  keywords: [
    "cybersecurity",
    "ethical hacking",
    "penetration testing",
    "red team",
    "blue team",
    "web pentesting",
    "malware development",
    "reverse engineering",
    "cybersecurity learning platform",
  ],
  socialImage: "/logo.png",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = siteConfig.socialImage,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: image,
          alt: `${siteConfig.name} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function createJsonLd<T>(data: T) {
  return JSON.stringify(data, null, 2);
}
