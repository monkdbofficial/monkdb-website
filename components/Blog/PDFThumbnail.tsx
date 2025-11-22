"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFThumbnailProps {
  pdfUrl: string;
  onError?: () => void;
}

const PDFThumbnail = ({ pdfUrl, onError }: PDFThumbnailProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
      <Document
        file={pdfUrl}
        onLoadSuccess={() => setLoading(false)}
        onLoadError={() => {
          setLoading(false);
          onError?.();
        }}
        loading={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={400}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="pdf-thumbnail"
        />
      </Document>
    </div>
  );
};

export default PDFThumbnail;
