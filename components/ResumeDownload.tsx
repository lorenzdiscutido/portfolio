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
    "px-5 py-2 rounded-lg bg-slate-100 dark:bg-[#1e2128] border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange text-slate-900 dark:text-white transition-colors text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60";

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
          <span className="inline-block w-3.5 h-3.5 border-2 border-orange border-t-transparent rounded-full animate-spin" />
          <span>{label ? "[ generating... ]" : "Generating PDF..."}</span>
        </>
      ) : error ? (
        <span className="text-red-500 dark:text-red-400">Retry Resume PDF</span>
      ) : (
        <span>{displayLabel}</span>
      )}
    </button>
  );
}
