"use client";

import dynamic from "next/dynamic";

const LiquidBackground = dynamic(
  () => import("@/components/LiquidBackground"),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-1] overflow-hidden bg-base pointer-events-none select-none"
      >
        <div className="absolute inset-0 bg-dot-pattern opacity-70" />
      </div>
    ),
  }
);

export default function AmbientBackground() {
  return <LiquidBackground />;
}
