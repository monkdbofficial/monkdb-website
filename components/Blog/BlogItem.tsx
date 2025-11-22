"use client";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { Video, FileText, Calendar, Clock } from "lucide-react";
import { useMemo, useState } from "react";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { thumbnail, title, description, slug, contentType, publishedAt, readTime, tags, youtubeUrl, googleDriveUrl } = blog;
  const [imageError, setImageError] = useState(false);

  // Use publishedAt if available, otherwise fall back to createdAt
  const dateToShow = (blog as any).publishedAt || (blog as any).createdAt || publishedAt;

  // Get uploaded video file URL
  const videoFile = (blog as any).videoFile;
  const documentFile = (blog as any).documentFile;

  // Generate thumbnail dynamically - memoized to prevent recalculation
  const imageSrc = useMemo(() => {
    // If manual thumbnail is provided, use it
    if (thumbnail) return thumbnail;

    // For YouTube videos, use YouTube's thumbnail API
    if (contentType === "youtube" && youtubeUrl) {
      const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
      if (videoIdMatch) {
        const videoId = videoIdMatch[1];
        return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      }
    }

    // For PDFs with Google Drive, try to get thumbnail
    if (contentType === "pdf" && googleDriveUrl) {
      const fileIdMatch = googleDriveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
      }
    }

    // For uploaded files, return null to show special preview
    if (videoFile || documentFile) {
      return null;
    }

    // Fallback
    return null;
  }, [thumbnail, contentType, youtubeUrl, googleDriveUrl, videoFile, documentFile]);

  // Check if using fallback
  const isFallback = !imageSrc || imageError;

  return (
    <div className="group rounded-xl bg-white shadow-solid-8 transition-all duration-300 hover:shadow-solid-9 dark:bg-blacksection">
        <Link href={`/blog/${slug}`} className="relative block aspect-[368/239] overflow-hidden rounded-t-xl">
          {isFallback ? (
            // Fallback: Show professional styled thumbnail or video preview
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Uploaded Video Preview */}
              {videoFile && contentType === "youtube" && (
                <div className="relative w-full h-full bg-black">
                  <video
                    className="w-full h-full object-cover"
                    src={videoFile}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      // Seek to 1 second to show a preview frame
                      const video = e.target as HTMLVideoElement;
                      video.currentTime = 1;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                      <Video className="h-3 w-3" />
                      Video
                    </span>
                  </div>
                </div>
              )}
              {/* Uploaded PDF or Google Drive PDF */}
              {(documentFile || (contentType === "pdf" && !videoFile)) && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20" />
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(59, 130, 246, 0.1) 10px, rgba(59, 130, 246, 0.1) 11px)',
                  }} />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <FileText className="h-16 w-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      PDF Document
                    </span>
                  </div>
                </>
              )}
              {/* YouTube fallback (if thumbnail fails) */}
              {contentType === "youtube" && !videoFile && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <Video className="h-16 w-16 text-red-600 dark:text-red-400" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                      Video
                    </span>
                  </div>
                </>
              )}
              {/* Article fallback */}
              {contentType !== "youtube" && contentType !== "pdf" && !videoFile && !documentFile && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <FileText className="h-16 w-16 text-green-600 dark:text-green-400" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                      Article
                    </span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              quality={85}
              onError={() => setImageError(true)}
            />
          )}
          {/* Content Type Badge */}
          <div className="absolute left-4 top-4">
            {contentType === "youtube" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                <Video className="h-3 w-3" />
                Video
              </span>
            )}
            {contentType === "pdf" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                <FileText className="h-3 w-3" />
                PDF
              </span>
            )}
          </div>
        </Link>

        <div className="p-6">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary dark:bg-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-black transition-colors duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
            <Link href={`/blog/${slug}`}>
              {title}
            </Link>
          </h3>

          {/* Description */}
          {description && (
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              {dateToShow && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {new Date(dateToShow).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
              {readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{readTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default BlogItem;
