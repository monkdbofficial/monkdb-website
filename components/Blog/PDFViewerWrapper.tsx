"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("@/components/Blog/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  ),
});

interface PDFViewerWrapperProps {
  pdfPath: string;
}

const PDFViewerWrapper: React.FC<PDFViewerWrapperProps> = ({ pdfPath }) => {
  return <PDFViewer pdfPath={pdfPath} />;
};

export default PDFViewerWrapper;
