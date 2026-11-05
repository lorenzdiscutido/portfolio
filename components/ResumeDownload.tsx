"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";
import { useMounted } from "@/lib/useMounted";

export default function ResumeDownload() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <span className="px-6 py-2 rounded-lg bg-slate-100 dark:bg-[#1e2128] border border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400 text-sm font-medium inline-block">
        Resume PDF
      </span>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF />}
      fileName="Jose_Lorenzo_Discutido_Resume.pdf"
      className="px-6 py-2 rounded-lg bg-slate-100 dark:bg-[#1e2128] border border-black/10 dark:border-white/10 hover:border-orange dark:hover:border-orange text-slate-900 dark:text-white transition-colors text-sm font-medium inline-block"
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download Resume")}
    </PDFDownloadLink>
  );
}
