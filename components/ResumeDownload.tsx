"use client";

import React, { useState } from "react";
import { useMounted } from "@/lib/useMounted";

export default function ResumeDownload() {
  const mounted = useMounted();
  const [generating, setGenerating] = useState(false);

  if (!mounted) {
    return (
      <span className="px-6 py-2 rounded-lg bg-slate-100 dark:bg-[#1e2128] border border-black/10 dark:border-white/10 text-slate-400 text-sm font-medium inline-block">
        Download Resume
      </span>
    );
  }

  const handleDownload = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { default: ResumePDF } = await import("@/components/ResumePDF");
      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Jose_Lorenzo_Discutido_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={generating}
      className="px-6 py-2 rounded-lg bg-slate-100 dark:bg-[#1e2128] border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange text-slate-900 dark:text-white transition-colors text-sm font-medium inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
      aria-label="Download Resume PDF"
    >
      {generating ? (
        <>
          <span className="inline-block w-3.5 h-3.5 border-2 border-orange border-t-transparent rounded-full animate-spin" />
          <span>Generating PDF...</span>
        </>
      ) : (
        <span>Download Resume</span>
      )}
    </button>
  );
}
