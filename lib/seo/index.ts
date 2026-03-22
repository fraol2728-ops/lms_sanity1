import type { Metadata } from "next";

export const siteConfig = {
  name: "Dev Fraol Academy",
  shortName: "Dev Fraol Academy",
  creator: "Fraol Belachew",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://devfraolacademy.com",
  locale: "en_US",
  description:
    "Dev Fraol Academy is an Ethiopian cybersecurity LMS founded by Fraol Belachew, offering ethical hacking, Linux, networking, and cyber security training online and in Addis Ababa.",
  keywords: [
    "fraol academy",
    "devfraol academy",
    "fraol belachew",
    "fraol hacking course",
    "fraol course",
    "cybersecurity course Ethiopia",
    "ethical hacking Ethiopia",
    "networking course Addis Ababa",
    "learn Linux Ethiopia",
    "cyber security training Ethiopia",
    "IT training Ethiopia",
    "online tech courses Ethiopia",
  ],
  socialImage: "/icon.svg",
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
