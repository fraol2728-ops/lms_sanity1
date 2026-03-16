import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Cyber Camp | Learn to Code",
  description:
    "Master coding the modern way with expertly crafted courses, modules, and hands-on lessons.",
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
