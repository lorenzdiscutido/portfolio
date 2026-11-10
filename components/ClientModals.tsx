"use client";

import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
});

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function ClientModals() {
  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <Terminal />
    </>
  );
}
