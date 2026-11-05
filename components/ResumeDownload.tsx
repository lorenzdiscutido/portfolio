"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";
import { useMounted } from "@/lib/useMounted";

export default function ResumeDownload() {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <span className="px-6 py-2 rounded-lg bg-surface border border-[#2d313a] text-muted text-sm font-medium inline-block">
        Resume PDF
      </span>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF />}
      fileName="Jose_Lorenzo_Discutido_Resume.pdf"
      className="px-6 py-2 rounded-lg bg-surface border border-[#2d313a] hover:border-orange text-primary transition-colors text-sm font-medium inline-block"
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download Resume")}
    </PDFDownloadLink>
  );
}
