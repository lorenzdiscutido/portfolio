"use client";

import React, { useState } from "react";
import { useMounted } from "@/lib/useMounted";

interface ResumeDownloadProps {
  className?: string;
  label?: string;
}

export default function ResumeDownload({ className, label }: ResumeDownloadProps) {
  const mounted = useMounted();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);
  const displayLabel = label || "Download Resume";

  const defaultClasses =
    "whitespace-nowrap px-5 py-2 min-h-[44px] rounded-full bg-[#0052FF] text-[#f8fafc] hover:bg-[#0052FF]/90 transition-all text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052FF] shadow-none hover:scale-[1.02] active:scale-[0.98]";

  if (!mounted) {
    return (
      <span className={className || defaultClasses}>
        {displayLabel}
      </span>
    );
  }

  const handleDownload = async () => {
    if (generating) return;
    setGenerating(true);
    setError(false);
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
      setError(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={generating}
      className={className || defaultClasses}
      aria-label="Download Resume PDF"
    >
      {generating ? (
        <>
          <span className="inline-block w-3.5 h-3.5 border-2 border-[#f8fafc] border-t-transparent rounded-full animate-spin mr-1" />
          <span className="text-[#f8fafc] font-mono text-xs">generating...</span>
        </>
      ) : error ? (
        <span className="text-[#FF7A00] font-mono text-xs">Failed - Retry</span>
      ) : (
        <span className="transition-colors">
          {displayLabel}
        </span>
      )}
    </button>
  );
}
