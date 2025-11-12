"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, DocumentProps, PDFDocumentProxy } from "react-pdf";
import { pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
} from "lucide-react";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfPath: string;
}

interface FlipBookRef {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
}

interface FlipEvent {
  data: number;
}

/**
 * PDFViewer - A component for displaying PDF documents with page flip animation
 *
 * Features:
 * - Page flip animation with sound effects
 * - Fullscreen mode
 * - Navigation controls
 * - Responsive design
 */
const PDFViewer: React.FC<PDFViewerProps> = ({ pdfPath }) => {
  // State management
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Refs
  const bookRef = useRef<FlipBookRef | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio("/sounds/page-turn.mp3");

    return () => {
      // Cleanup audio resources
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  /**
   * Handles successful PDF document loading
   */
  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: PDFDocumentProxy): void => {
      setNumPages(numPages);
      setLoading(false);
    },
    [],
  );

  /**
   * Handles PDF document loading errors
   */
  const onDocumentLoadError = useCallback((error: Error): void => {
    console.error("Error loading PDF document:", error);
    setLoading(false);
  }, []);

  /**
   * Plays page turn sound effect if not muted
   */
  const playPageTurnSound = useCallback(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Failed to play page turn sound:", error);
      });
    }
  }, [isMuted]);

  /**
   * Handles page flip events
   */
  const onFlip = useCallback(
    (e: FlipEvent) => {
      setCurrentPage(e.data + 1);
      playPageTurnSound();
    },
    [playPageTurnSound],
  );

  /**
   * Navigate to previous page
   */
  const handlePrevPage = useCallback(() => {
    if (bookRef.current?.pageFlip()) {
      bookRef.current.pageFlip().flipPrev();
    }
  }, []);

  /**
   * Navigate to next page
   */
  const handleNextPage = useCallback(() => {
    if (bookRef.current?.pageFlip()) {
      bookRef.current.pageFlip().flipNext();
    }
  }, []);

  /**
   * Toggle fullscreen mode
   */
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error enabling fullscreen mode: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  /**
   * Toggle sound mute state
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prevState) => !prevState);
  }, []);

  // Monitor fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Handle window resize in fullscreen mode
  useEffect(() => {
    const handleResize = () => {
      if (isFullscreen) {
        // Force re-render to adjust dimensions
        setIsFullscreen((prev) => prev);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen]);

  // Calculate dimensions based on screen size
  const getViewerDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (isFullscreen) {
      return {
        pageWidth: Math.min(width / 2.2, 800),
        pageHeight: height - 120,
      };
    }

    // Responsive dimensions for different screen sizes
    if (width <= 640) {
      return {
        pageWidth: Math.min(width * 0.85, 400),
        pageHeight: Math.min(height * 0.6, 600),
      };
    } else if (width <= 1024) {
      return {
        pageWidth: Math.min(width / 2.2, 500),
        pageHeight: Math.min(height * 0.7, 700),
      };
    }

    // Desktop default with adjusted ratio
    return {
      pageWidth: Math.min(width / 2.5, 600),
      pageHeight: Math.min((width / 2.5) * 1.414, 800), // Using A4 ratio
    };
  };

  const { pageWidth, pageHeight } = getViewerDimensions();

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      const { pageWidth, pageHeight } = getViewerDimensions();
      // Update dimensions state if needed
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`pdf-viewer ${
        isFullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-white p-4 dark:bg-blacksection"
          : "flex w-full items-center justify-center p-4"
      }`}
      data-testid="pdf-viewer-container"
    >
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-blacksection/80">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-blacksection">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="text-base font-medium text-gray-700 dark:text-gray-200">
              Loading PDF document...
            </span>
          </div>
        </div>
      )}

      <Document
        file={pdfPath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex h-[50vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <span className="text-base font-medium text-gray-700 dark:text-gray-200">
                Loading PDF...
              </span>
            </div>
          </div>
        }
        className={`flex justify-center ${isFullscreen ? "h-full w-full" : "w-full"}`}
      >
        <HTMLFlipBook
          width={pageWidth}
          height={pageHeight}
          size="stretch"
          minWidth={350}
          maxWidth={1800}
          minHeight={500}
          maxHeight={2000}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="book-content"
          ref={bookRef}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          startZIndex={0}
          autoSize={true}
          style={{
            gap: 0,
            padding: 0,
            margin: "0 auto",
            perspective: "1500px", // Add 3D perspective
          }}
          startPage={0}
          showPageCorners={true}
          disableFlipByClick={false}
          swipeDistance={30}
          clickEventForward={true}
          usePortrait={true}
          pageBackground="#ffffff"
          animationDuration={500}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={`page-${index + 1}`}
              className="page"
              style={{
                background: "white",
                boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                borderRadius: "4px",
                transform: "translateZ(0)",
              }}
            >
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-lg"
                width={pageWidth}
                loading={
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-full w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
                  </div>
                }
              />
            </div>
          ))}
        </HTMLFlipBook>
      </Document>

      {numPages > 0 && (
        <div className="pdf-controls">
          <button
            onClick={handlePrevPage}
            className="control-button"
            aria-label="Previous page"
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          <div className="flex items-center gap-1 md:gap-2">
            <span className="page-number">{currentPage}</span>
            <span className="text-gray-500 dark:text-gray-400">/</span>
            <span className="page-number text-gray-500">{numPages}</span>
          </div>

          {/* Show sound control only on larger screens */}
          <button
            onClick={toggleMute}
            className="control-button hidden md:inline-flex"
            aria-label={
              isMuted ? "Unmute page turn sound" : "Mute page turn sound"
            }
          >
            {isMuted ? <VolumeX /> : <Volume2 />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="control-button"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize /> : <Maximize />}
          </button>

          <button
            onClick={handleNextPage}
            className="control-button"
            aria-label="Next page"
            disabled={currentPage === numPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
