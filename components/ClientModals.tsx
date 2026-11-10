"use client";

import dynamic from "next/dynamic";
import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";

const Terminal = dynamic(() => import("@/components/Terminal"), {
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
