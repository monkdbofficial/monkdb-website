"use client";

import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
  pdfPath: string;
}

/**
 * PDFViewer - A modern PDF viewer component using react-pdf-viewer
 *
 * Features:
 * - Full-featured PDF viewing with zoom, navigation
 * - Search functionality
 * - Print and download support
 * - Dark mode compatible
 * - Responsive design
 */
const PDFViewer: React.FC<PDFViewerProps> = ({ pdfPath }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="pdf-viewer-container h-[600px] w-full overflow-hidden rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-blacksection md:h-[700px] lg:h-[800px]">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="h-full w-full">
          <Viewer
            fileUrl={pdfPath}
            plugins={[defaultLayoutPluginInstance]}
            theme={{
              theme: typeof window !== 'undefined' &&
                     document.documentElement.classList.contains('dark')
                     ? 'dark'
                     : 'light',
            }}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PDFViewer;
