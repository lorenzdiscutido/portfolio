"use client";

import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";

export default function ResumeDownload() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
