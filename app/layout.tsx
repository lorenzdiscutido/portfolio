import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Terminal from "@/components/Terminal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jose Lorenzo Discutido | Systems Engineer",
  description: "Portfolio of Jose Lorenzo Discutido, Digital Data & Systems Engineer and AI/IoT Data Officer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Terminal />
      </body>
    </html>
  );
}
