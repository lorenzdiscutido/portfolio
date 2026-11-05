import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import Terminal from "@/components/Terminal";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jose Lorenzo Discutido | Systems Engineer",
    template: "%s | Jose Lorenzo Discutido",
  },
  description:
    "Portfolio of Jose Lorenzo Discutido, Digital Data & Systems Engineer and AI/IoT Data Officer.",
  openGraph: {
    type: "website",
    title: "Jose Lorenzo Discutido | Systems Engineer",
    description:
      "Portfolio of Jose Lorenzo Discutido, Digital Data & Systems Engineer and AI/IoT Data Officer.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Ambient Cyber-Physical Background */}
          <div className="fixed inset-0 z-[-1] bg-base bg-dot-pattern pointer-events-none">
            {/* Ambient Blue Glow (Top Left) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue/10 blur-[120px]" />
            {/* Ambient Orange Glow (Bottom Right) */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange/10 blur-[120px]" />
          </div>
          <NavBar />
          {children}
          <Terminal />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
