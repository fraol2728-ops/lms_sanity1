import type { Metadata } from "next";

function normalizeSiteUrl(url?: string) {
  const fallbackUrl = "https://devfraol.com.et";

  if (!url) {
    return fallbackUrl;
  }

  const normalized = url.startsWith("http") ? url : `https://${url}`;
  const sanitized = normalized.replace(/\/+$/, "");

  try {
    const parsed = new URL(sanitized);
    const legacyHosts = new Set(["xybersec.com", "www.xybersec.com"]);

    if (legacyHosts.has(parsed.hostname)) {
      return fallbackUrl;
    }
  } catch {
    return fallbackUrl;
  }

  return sanitized;
}

export const siteConfig = {
  name: "Xybersec Academy by DevFraol",
  shortName: "Xybersec Academy",
  creator: "DevFraol",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL),
  locale: "en_US",
  description:
    "Xybersec Academy by DevFraol helps learners master cybersecurity and technology with structured paths, hands-on labs, and practical roadmaps.",
  keywords: [
    "xybersec",
    "xybersec academy",
    "xyber sec",
    "cybersecurity",
    "ethical hacking",
    "penetration testing",
    "red team",
    "blue team",
    "network security",
    "security training ethiopia",
    "web pentesting",
    "devfraol",
    "devfraol academy",
    "online learning platform",
  ],
  socialImage: "/og.png",
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
