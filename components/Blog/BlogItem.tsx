"use client";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { Video, FileText, Calendar, Clock } from "lucide-react";
import { useMemo } from "react";

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { thumbnail, title, description, slug, contentType, publishedAt, readTime, tags, youtubeUrl, googleDriveUrl } = blog;

  // Generate thumbnail dynamically - memoized to prevent recalculation
  const imageSrc = useMemo(() => {
    // If manual thumbnail is provided, use it
    if (thumbnail) return thumbnail;

    // For YouTube videos, use YouTube's thumbnail API
    if (contentType === "youtube" && youtubeUrl) {
      const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
      if (videoIdMatch) {
        const videoId = videoIdMatch[1];
        // Use maxresdefault for highest quality
        return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    // For Google Drive PDFs, use Google Drive thumbnail API
    if (contentType === "pdf" && googleDriveUrl) {
      const fileIdMatch = googleDriveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      }
    }

    // Fallback
    return null;
  }, [thumbnail, contentType, youtubeUrl, googleDriveUrl]);

  // Check if using fallback
  const isFallback = !imageSrc;

  return (
    <div className="group rounded-xl bg-white shadow-solid-8 transition-all duration-300 hover:shadow-solid-9 dark:bg-blacksection">
        <Link href={`/blog/${slug}`} className="relative block aspect-[368/239] overflow-hidden rounded-t-xl">
          {isFallback ? (
            // Fallback: Show professional icon instead of image
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-blue-500/20 dark:from-primary/10 dark:to-blue-500/10">
              {contentType === "youtube" ? (
                <Video className="h-20 w-20 text-red-600 dark:text-red-500" strokeWidth={1.5} />
              ) : contentType === "pdf" ? (
                <FileText className="h-20 w-20 text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
              ) : (
                <FileText className="h-20 w-20 text-primary dark:text-primary" strokeWidth={1.5} />
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
              {publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {new Date(publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
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
