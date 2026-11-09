import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import Terminal from "@/components/Terminal";
import AmbientBackground from "@/components/AmbientBackground";
import CustomCursor from "@/components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";
import LiveTelemetryPill from "@/components/LiveTelemetryPill";
import LiveTelemetryDot from "@/components/LiveTelemetryDot";
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
      <body className={`${inter.className} overflow-x-hidden min-h-screen relative`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Ambient Cyber-Physical Liquid Background (Dynamic Client Component with SSR: false) */}
          <AmbientBackground />
          <CustomCursor />
          <CommandPalette />
          <NavBar />
          {children}
          <Suspense
            fallback={
              <aside
                aria-label="Live System Telemetry"
                data-testid="live-telemetry-pill"
                className="fixed bottom-4 right-4 z-50 w-52 h-10 rounded-full bg-[#1e2128]/80 backdrop-blur-md border border-white/5 flex items-center justify-center gap-2 px-3.5 select-none pointer-events-auto shadow-none transition-all"
              >
                <LiveTelemetryDot />
                <span className="font-mono text-[10px] font-semibold tracking-tight text-[#f8fafc] truncate">
                  System: Online | Connecting...
                </span>
              </aside>
            }
          >
            <LiveTelemetryPill />
          </Suspense>
          <Terminal />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
