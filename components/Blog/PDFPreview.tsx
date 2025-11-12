"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export const PDFPreview = ({ pdfPath }: { pdfPath: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full bg-gray-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}

      <Document
        file={pdfPath}
        loading={null}
        onLoadSuccess={() => setIsLoading(false)}
        error={
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Failed to load PDF
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={400}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};
