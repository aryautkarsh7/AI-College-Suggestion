import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CollegeAI — Find the right college for your future",
  description:
    "AI-powered guidance for studying in India and abroad. Get personalized college recommendations through natural conversation.",
  keywords: [
    "college",
    "university",
    "AI",
    "recommendations",
    "study abroad",
    "India",
    "education",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
