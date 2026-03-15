import type { NextConfig } from "next";

const serverActionAllowedOrigins = [
  "localhost:3000",
  "127.0.0.1:3000",
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.NEXT_SERVER_ACTIONS_ALLOWED_ORIGINS,
]
  .flatMap((origin) => (origin ? origin.split(",") : []))
  .map((origin) => origin.trim())
  .map((origin) => origin.replace(/^https?:\/\//, ""))
  .filter(Boolean);

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins: [...new Set(serverActionAllowedOrigins)],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
