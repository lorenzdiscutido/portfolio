import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ClientModals from "@/components/ClientModals";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jose Lorenzo Discutido | Data and Systems Engineer",
    template: "%s | Jose Lorenzo Discutido",
  },
  description:
    "Portfolio of Jose Lorenzo Discutido, a Data and Systems Engineer specializing in AI, IoT, and enterprise cloud infrastructure.",
  keywords: [
    "Systems Engineer",
    "Data Engineer",
    "IoT",
    "Next.js",
    "Python",
    "Streamlit",
    "Hardware Integration",
    "Philippines",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jose Lorenzo Discutido | Data and Systems Engineer",
    description:
      "Portfolio showcasing end-to-end data pipelines, IoT hardware integrations, and distributed database architectures.",
    siteName: "Jose Lorenzo Discutido Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jose Lorenzo Discutido | Data and Systems Engineer",
    description:
      "Portfolio showcasing end-to-end data pipelines, IoT hardware integrations, and distributed database architectures.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden min-h-screen relative text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Global Electric Blue Scroll Progress Indicator */}
          <ScrollProgressBar />
          {/* Ambient Cyber-Physical Liquid Background (Dynamic Client Component with SSR: false) */}
          <AmbientBackground />
          <ClientModals />
          <NavBar />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
